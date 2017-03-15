import { Observable } from 'rxjs';
import { id } from './../util';
import { user } from './../selectors';
import { Router } from '@angular/router';
import { Actions } from './../actions';
import { AngularFire } from 'angularfire2';
import { NgRedux } from '@angular-redux/store';
import { Job, IAppState, User } from './../model';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'edit-user',
  template: `
    <div style="height:100%" >
      <div class="ui vertical segment">
        <div class="ui container">
          <h1 class="ui header">
              Edit user
          </h1>
          <div class="ui input">
            <input #phoneInput [ngModel]="(user$ | async)?.phone" type="text" placeholder="phone">
          </div>
          <div class="ui input">
              <input #addressInput [ngModel]="(user$ | async)?.address" type="text" placeholder="address">
          </div>
          
        </div>
      </div>
      <div class="ui vertical segment">
        <div class="ui container">
          <div class="ui button" (click)="update(phoneInput.value,addressInput.value)">update</div>
          <div class="ui button" [ngClass]="{disabled: !((user$ | async)?.phone && (user$ | async)?.address)}" (click)="post()">post</div>
        </div>
      </div>
    </div>
    
  `,
  styleUrls: [],
})
export class EditUserComponent {
  user$: Observable<User>;
  constructor(private ngRedux: NgRedux<IAppState>, private actions: Actions , private af: AngularFire, private router: Router) {
    this.user$ = user(af);
  }

  update(phone, address) {
    this.actions.editUser({phone: phone, address: address});
  }

  post() {
    this.router.navigateByUrl('/post');
  }
}
