import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {VideoComponent} from './video/video.component';
import {SigninComponent} from './signin/signin.component';
import {ErrorNotFoundComponent} from './error-not-found/error-not-found.component';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './footer/footer.component';
import {NavComponent} from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {OrderModule} from 'ngx-order-pipe';
import {AuthInterceptor} from './authconfig.interceptor';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    ErrorNotFoundComponent,
    SigninComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    OrderModule,
  ],
  providers: [AuthGuard, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
