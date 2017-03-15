import { Job, IAppState } from './../model';
import { Observable } from 'rxjs';
import { id, trace } from './../util';
import { jobs, user } from './../selectors';
import { NgRedux } from '@angular-redux/store';
import { AngularFire } from 'angularfire2';
import { Actions } from './../actions';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login-page', // <my-app></my-app>
  template: `
    <div class="ui vertical orange inverted center aligned segment" style="height:100%">
        <div class="ui container">
            <br>
            <br>
            <br>
            <h1 class="ui inverted header">
                Sign in
            </h1>
            <button class="ui labeled icon red button" (click)="login()">
              <i class="google icon"></i>
              Google
            </button>
        </div>
    </div>
  `,
  styleUrls: [],
})
export class LoginPageComponent {
    constructor(private af: AngularFire, private router: Router) {}

    login() {
        this.af.auth.login();
    }
}
