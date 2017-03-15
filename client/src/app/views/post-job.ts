import { user } from './../selectors';
import { Router } from '@angular/router';
import { Actions } from './../actions';
import { AngularFire } from 'angularfire2';
import { NgRedux } from '@angular-redux/store';
import { Job, IAppState } from './../model';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'post-job',
  template: `
    <div style="height:100%">
      <div class="ui vertical segment">
        <div class="ui container">
          <h1 class="ui header">
              Post a job
          </h1>
          <div class="ui input">
            <input [(ngModel)]="type" type="text" placeholder="type">
          </div>
          <div class="ui input">
              <input [(ngModel)]="desc" type="text" placeholder="desc">
          </div>
          
        </div>
      </div>
      <div class="ui vertical segment">
        <div class="ui container">
          <div class="ui button" (click)="post()">post</div>
        </div>
      </div>
    </div>
    
  `,
  styleUrls: [],
})
export class PostJobComponent {
  type: string;
  desc: string;

  constructor(private ngRedux: NgRedux<IAppState>, private actions: Actions , private angularFire: AngularFire, private router: Router) {}

  post() {
    this.actions.postJob({type: this.type, desc: this.desc});
  }
}
