import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ErrorNotFoundComponent} from './error-not-found/error-not-found.component';
import {SigninComponent} from './signin/signin.component';
import {VideoComponent} from './video/video.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full'},
  { path: 'signup', component: HomeComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'video', component: VideoComponent, canActivate: [AuthGuard]},
  { path: '**', component: ErrorNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
