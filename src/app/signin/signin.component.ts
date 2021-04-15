import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../models/MustMatch';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  submitted = false;

  // tslint:disable-next-line:variable-name
  constructor(private _authService: AuthService, private _router: Router, private formBuilder: FormBuilder) {
    this.signinForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }


  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,10}$')]],
    });
    if (this._authService.isLoggedIn() === true){
      this._router.navigate(['/video']);
    }
  }
  // tslint:disable-next-line:typedef
  get f() { return this.signinForm.controls; }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
    if (this.signinForm.invalid) {
      return;
    }else {
      console.log(this.signinForm.value);
      this._authService.login(this.signinForm.value);
    }
  }
}
