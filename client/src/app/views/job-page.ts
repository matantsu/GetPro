import { Component, Input, EventEmitter, Output } from '@angular/core';
import { user, job, bids } from './../selectors';
import { Observable } from 'rxjs';
import { id } from './../util';
import { NgRedux } from '@angular-redux/store';
import { AngularFire } from 'angularfire2';
import { IAppState, Bid, Job } from './../model';
import { Actions } from './../actions';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { trace } from './../util';

@Component({
  selector: 'job-page',
  template: `
    <div style="height:100%">
      <div class="ui vertical segment">
        <div class="ui container">
          <div class="ui red button" (click)="remove()">delete post</div>
        </div>
      </div>
      <div class="ui vertical segment">
        <div class="ui container">
            <div class="ui fluid cards">
                <div class="card" *ngFor="let bid of (job$ | async)?.bids">
                  <div class="content">
                    <div class="header">{{bid.price}}</div>
                    <div class="meta" *ngIf="(job$ | async).chosen == bid.$key">
                      CHOSEN!
                      {{(job$ | async).locked ? 'SERVER PAYED, DETAILS: ...' : 'WAITING FOR SERVER TO RESPOND'}}
                    </div>
                    <div class="description">
                      
                    </div>
                  </div>
                  <div class="extra content" *ngIf="(job$ | async).chosen != bid.$key && !(job$ | async).locked">
                    <div class="right floated ui button" (click)="choose(bid)">
                      Choose
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    
  `,
  styleUrls: [],
})
export class JobPageComponent {
  job$: Observable<Job>;
  jobId$: Observable<string>;
  constructor(private route: ActivatedRoute, private af: AngularFire, private actions: Actions, private router: Router) {}

  ngOnInit() {
    this.jobId$ = this.route.params
      .first()
      .map(params => params['jobId']);
    this.job$ = this.jobId$.flatMap(job(this.af))
      .catch(r => {this.router.navigateByUrl('/home'); return []; });
  }

  remove() {
    this.jobId$
      .subscribe(x => this.actions.remove(x));
  }

  choose(bid) {
    this.jobId$
      .subscribe(x => this.actions.chooseBid(bid, x));
  }
}
