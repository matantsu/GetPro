import { Router } from '@angular/router';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { user, jobs } from './../selectors';
import { Observable } from 'rxjs';
import { id } from './../util';
import { NgRedux } from '@angular-redux/store';
import { AngularFire } from 'angularfire2';
import { IAppState, Bid, Job } from './../model';
import { Actions } from './../actions';

@Component({
  selector: 'home-page',
  template: `
    <div style="height:100%">
      <div class="ui vertical segment">
        <div class="ui container">
            <div class="ui button" routerLink="/edit">
                post a job
            </div>
        </div>
      </div>
      <div class="ui vertical segment">
        <div class="ui container">
            <h1 class="ui header">
                Select a previous job
            </h1>
            <div class="ui cards" *ngFor="let job of (jobs$ | async)">
                <a class="card" (click)="gotoJob(job.$key)">
                    <div class="content">
                        <div class="header">{{job.type}}</div>
                        <div class="meta">{{job.bids.length}} bids</div>
                        <div class="description">
                            {{job.desc}}
                        </div>
                    </div>
                </a>
            </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: [],
})
export class HomePageComponent {
    jobs$: Observable<Job[]>;
    constructor(public actions: Actions, private af: AngularFire, private ngRedux: NgRedux<IAppState>, private router: Router) {
      this.jobs$ = jobs(af);
    }

    gotoJob(jobId) {
        this.router.navigateByUrl(`/job/${jobId}`);
    }
}
