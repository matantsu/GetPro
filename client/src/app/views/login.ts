import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Job, Bid } from './../model';
import { trace } from './../util';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'login',
  template: `
    <div class="ui vertical teal inverted center aligned segment" style="height:100%">
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
export class LoginComponent {
    constructor(private af: AngularFire, private router: Router) {}

    login() {
        this.af.auth.login();
    }
}
