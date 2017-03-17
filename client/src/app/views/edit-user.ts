import { Observable } from 'rxjs';
import { id } from './../util';
import { user } from './../selectors';
import { Router } from '@angular/router';
import { Actions } from './../actions';
import { AngularFire } from 'angularfire2';
import { NgRedux } from '@angular-redux/store';
import { Job, StoreState, User } from './../model';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'edit-user',
  template: `
    <div style="height:100%" >
      <div class="ui vertical huge segment">
        <div class="ui container">
          <h2 class="ui dividing disabled header">
              My profile
          </h2>
          <br>
          <div class="ui huge form">
            <img style="margin: auto" class="ui circular small image" [src]="(user$ | async).photoURL">
            <br>
            <div class="field">
              <input #nameInput [ngModel]="(user$ | async).displayName" type="text" placeholder="Name">
            </div>
            <div class="field">
              <input #phoneInput [ngModel]="(user$ | async).phone" type="tel" placeholder="Phone">
            </div>
          </div>
        </div>
      </div>
      <div class="ui vertical segment">
        <div class="ui container">
          <button class="ui big teal left labled icon circular button" 
                  [ngClass]="{disabled: 
                      !nameInput.value || 
                      !phoneInput.value || 
                      (nameInput.value == (user$ | async).displayName && 
                      phoneInput.value == (user$ | async).phone)}" 
                  type="submit"
                  (click)="update(nameInput.value,phoneInput.value)">
                <i class="i checkmark icon"></i>
                Update
          </button>
        </div>
      </div>
    </div>
    
  `,
  styleUrls: [],
})
export class EditUserComponent {
  user$: Observable<User>;
  constructor(private ngRedux: NgRedux<StoreState>, private actions: Actions , private af: AngularFire, private router: Router) {
    this.user$ = user(af);
  }

  update(name, phone) {
    this.actions.editUser({displayName: name, phone: phone});
  }

  post() {
    this.router.navigateByUrl('/post');
  }
}
