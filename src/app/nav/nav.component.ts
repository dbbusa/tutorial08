import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(public _authService: AuthService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  logout() {
    this._authService.logout();
  }
}
