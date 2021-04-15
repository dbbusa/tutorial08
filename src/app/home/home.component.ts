import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Route, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../models/MustMatch';
// @ts-ignore

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  // tslint:disable-next-line:variable-name
  constructor(private _authService: AuthService, private _router: Router, private formBuilder: FormBuilder) {
    this.signupForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,10}$')]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
    if (this._authService.isLoggedIn() === true){
      this._router.navigate(['/video']);
    }
  }
  // tslint:disable-next-line:typedef
  get f() { return this.signupForm.controls; }
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }else{
      this._authService.signup(this.signupForm.value).subscribe(res => {
        console.log(res);
        this.signupForm.reset();
        this._router.navigate(['/signin']);
      });
    }
    console.log(this.signupForm.value);
  }
}
