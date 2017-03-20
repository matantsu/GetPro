import { ToastService } from './../toast';
import { State, STATE } from './../state';
import { user } from './../selectors';
import { Observable } from 'rxjs';
import { id } from './../util';
import { NgRedux } from '@angular-redux/store';
import { AngularFire } from 'angularfire2';
import { StoreState, Bid, User } from './../model';
import { Actions } from './../actions';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import 'semantic-ui-css/semantic.min.js';
import 'semantic-ui-css/semantic.min.css';

@Component({
  selector: 'my-app',
  template: `
    <div style="display:flex; flex-direction: column; height:100%">
      <div class="vertical segment">
          <div class="ui secondary teal inverted menu">
            <div class="ui container">
              <h2 class="item" routerLink="/home">
                GetPro
              </h2>
              <div class="item">
                client
              </div>
              <div class="right menu" *ngIf="user$ | async">
                <div class="ui item" routerLink="/edit">
                  <img class="ui avatar image" [src]="(user$ | async).photoURL">
                  &nbsp;
                  <span>{{(user$ | async).displayName}}</span>
                </div>
                <a class="ui icon item" (click)="actions.logout()">
                  <i class="ui large icon sign out"></i>
                </a>
              </div>
            </div>
          </div>
      </div>
      <div class="vertical segment">
        <div class="ui container">
          <toast [toast]="toast" *ngFor="let toast of toaster.toasts"></toast>
        </div>
      </div>
      <div style="flex:1">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: [],
})
export class AppComponent {
  user$: Observable<User>;
  constructor(@Inject(STATE) state$: Observable<State>, public actions: Actions, private router: Router, public toaster: ToastService) {
      this.user$ = state$.map(s => s.user);
      this.user$.subscribe(u => u ?
        (this.router.isActive('sign-in', false) ? this.router.navigateByUrl('home') : null) :
        this.router.navigateByUrl('sign-in'));
  }
}
