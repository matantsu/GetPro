import { user } from './../selectors';
import { Router } from '@angular/router';
import { Actions } from './../actions';
import { AngularFire } from 'angularfire2';
import { NgRedux } from '@angular-redux/store';
import { Job, StoreState } from './../model';
import { Component, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'post-job',
  template: `
    <div style="height:100%" >
      <div class="ui vertical huge segment">
        <div class="ui container">
          <h2 class="ui dividing disabled header">
              Post a job
          </h2>
          <br>
          <div class="ui huge form">
            <div class="field">
              <select #select [(ngModel)]="type" class="ui huge dropdown">
                <option value="">Type</option>
                <option value="plumber">Plumber</option>
                <option value="electrician">Electrician</option>
                <option value="cab">Cab</option>
              </select>
            </div>
            <div class="field">
              <textarea [(ngModel)]="desc" type="tel" placeholder="Description"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="ui vertical segment">
        <div class="ui container">
          <button class="ui big teal right labled icon circular button" 
                  [ngClass]="{disabled: 
                      !type || 
                      !desc}" 
                  type="submit"
                  (click)="post()">
                Post
                <i class="i send icon"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: [],
})
export class PostJobComponent {
  @ViewChild('select') select: ElementRef;
  type: string;
  desc: string;

  constructor(private ngRedux: NgRedux<StoreState>, private actions: Actions , private angularFire: AngularFire, private router: Router) {}

  post() {
    this.actions.postJob({type: this.type, desc: this.desc});
  }

  ngAfterViewInit() {
    jQuery(this.select.nativeElement).dropdown();
  }
}
