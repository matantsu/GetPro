import { STATE, State } from './../state';
import { Router } from '@angular/router';
import { Component, Input, EventEmitter, Output, Inject } from '@angular/core';
import { user, jobs } from './../selectors';
import { Observable } from 'rxjs';
import { id } from './../util';
import { NgRedux } from '@angular-redux/store';
import { AngularFire } from 'angularfire2';
import { StoreState, Bid, Job } from './../model';
import { Actions } from './../actions';

@Component({
  selector: 'home-page',
  template: `
    <div style="height:100%">
      <div class="ui vertical segment">
        <div class="ui container">
            <div class="ui teal huge fluid circular left labeled icon button" routerLink="/post">
                <i class="announcement icon"></i>
                Post a job
            </div>
        </div>
      </div>
      <div class="ui vertical segment" [ngClass]="{loading: !(jobs$ | async)}">
        <div class="ui container">
            <h2 class="ui dividing disabled header">
                My jobs
            </h2>
            <job *ngFor="let job of ((jobs$ | async) || [])"
                [job]="job"></job>
            <h1 class="ui icon disabled center aligned header" *ngIf="(jobs$ | async).length == 0">
              <i class="newspaper icon"></i>
              <div class="content">
                No jobs
                <div class="sub header">
                    post your first job to get started
                </div>
              </div>
            </h1>
        </div>
      </div>
    </div>
  `,
  styleUrls: [],
})
export class HomePageComponent {
    jobs$: Observable<Job[]>;
    constructor(public actions: Actions, @Inject(STATE) state$: Observable<State>,  private router: Router) {
      this.jobs$ = state$.map(s => s.jobs);
    }

    gotoJob(jobId) {
        this.router.navigateByUrl(`/job/${jobId}`);
    }
}
