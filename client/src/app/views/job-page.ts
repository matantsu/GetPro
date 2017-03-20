import { ToastService } from './../toast';
import { STATE, State } from './../state';
import { Component, Input, EventEmitter, Output, Inject } from '@angular/core';
import { user, job, bids } from './../selectors';
import { Observable } from 'rxjs';
import { id } from './../util';
import { NgRedux } from '@angular-redux/store';
import { AngularFire } from 'angularfire2';
import { StoreState, Bid, Job } from './../model';
import { Actions } from './../actions';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { trace } from './../util';
import { Toast } from './../toast';

@Component({
  selector: 'job-page',
  template: `
    <div style="height:100%">
      <div class="ui vertical segment" [ngClass]="{loading: !(job$ | async)}">
        <div class="ui container">
            <bid *ngFor="let bid of (job$ | async)?.bids"
                [job]="(job$ | async)"
                [bid]="bid"
                (choose)="choose(bid)">
            </bid>
            <h1 class="ui icon disabled center aligned header" *ngIf="!(job$ | async)?.locked">
              <br>
              <div class="ui active centered inline loader"></div>
              <div class="content">
                Searching for bids...
              </div>
              <br>
            </h1>
        </div>
      </div>
    </div>
    
  `,
  styleUrls: [],
})
export class JobPageComponent {
  stop = false;
  job$: Observable<Job>;
  jobId$: Observable<string>;
  constructor(private route: ActivatedRoute,
              @Inject(STATE) private state$: Observable<State>,
              private actions: Actions,
              private router: Router,
              private toaster: ToastService) {}

  ngOnInit() {
    this.jobId$ = this.route.params
      .first()
      .map(params => params['jobId']);

    this.job$ = this.jobId$.flatMap(id => this.state$
      .map(s => s.jobsByKey[id]));
  }

  choose(bid) {
    this.jobId$
      .subscribe(x => this.actions.chooseBid(bid, x));
  }
}
