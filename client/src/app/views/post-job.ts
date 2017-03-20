import { ToastService } from './../toast';
import { Observable } from 'rxjs';
import { STATE, State } from './../state';
import { user } from './../selectors';
import { Router } from '@angular/router';
import { Actions } from './../actions';
import { AngularFire } from 'angularfire2';
import { NgRedux } from '@angular-redux/store';
import { Job, StoreState } from './../model';
import { Toast } from './../toast';
import { Component, Output, EventEmitter, ElementRef, ViewChild, Inject } from '@angular/core';

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

  constructor(@Inject(STATE) private state$: Observable<State>, private actions: Actions , private router: Router,
              private toaster: ToastService) {}

  ngOnInit() {
    this.state$.first()
      .map(s => !s.user.phone)
      .subscribe(u => {
        if (u) {
          this.toaster.show(new Toast('No phone number', 'Please enter a phone number to post a job', true, 10000));
          this.router.navigateByUrl('/edit');
        }
      });
  }

  post() {
    this.actions.postJob({type: this.type, desc: this.desc});
  }

  ngAfterViewInit() {
    jQuery(this.select.nativeElement).dropdown();
  }
}
