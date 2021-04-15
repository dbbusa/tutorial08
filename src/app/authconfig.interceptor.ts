import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // tslint:disable-next-line:variable-name
  constructor(private _authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this._authService.isLoading.next(true);
    const authToken = this._authService.getAccessToken();
    console.log(authToken + '- hello');
    if (authToken != null) {
      req = req.clone({
        setHeaders: {
          Authorization: authToken
        }
      });
    }
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('response');
          this._authService.isLoading.next(false);
        }

        return event;
      })
    );
  }

}
