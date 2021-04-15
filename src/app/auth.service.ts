import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Route, Router} from '@angular/router';
import {User} from './models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {IVideo} from './models/videos';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'https://video-post.herokuapp.com/api/';
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient, private _router: Router) {
  }

  // tslint:disable-next-line:typedef
  signup(user: User): Observable<any> {
    return this._http.post<any>(this.url + 'register', user);
  }

  // tslint:disable-next-line:typedef
  login(user: User) {
    return this._http.post<any>(this.url + 'login', user).subscribe((res: any) => {
      console.log(res);
      localStorage.setItem('access-token', res.token);
      this._router.navigate(['/video']);
    });
  }

  // post video
  postVideo(video: IVideo): Observable<IVideo> {
    return this._http.post<IVideo>(this.url + 'video', video);
  }

  // update video
  updateVideo(video: IVideo): Observable<IVideo> {
    return this._http.patch<IVideo>(this.url + 'video/' + video._id, video);
  }

  // delete video
  // tslint:disable-next-line:variable-name
  deleteVideo(_id: any): Observable<any> {
    return this._http.delete(this.url + 'video/' + _id);
  }

  isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access-token');
    return (authToken) !== null ? true : false;
  }
  // tslint:disable-next-line:typedef
  logout(){
    if (localStorage.removeItem('access-token') == null){
      this._router.navigate(['/signin']);
    }
  }

  getVideo(): Observable<any>{
    return this._http.get(this.url + 'video');
  }
  // tslint:disable-next-line:typedef
  getAccessToken(){
    return localStorage.getItem('access-token');
  }
}
