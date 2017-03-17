import { StoreState } from './../store';
import { Job, Bid, State, STATE } from './../state';
import { Observable } from 'rxjs';
import { id, trace } from './../util';
import { jobs, user } from './../selectors';
import { NgRedux } from '@angular-redux/store';
import { AngularFire } from 'angularfire2';
import { Actions } from './../actions';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page', // <my-app></my-app>
  template: `
    <div class="ui vertical segment" [ngClass]="{loading: !(jobs$ | async)}" style="height:100%">
        <div class="ui container">
            <h2 class="ui dividing disabled header">
                Active jobs
            </h2>
            <job *ngFor="let job of (jobs$ | async)"
                [job]="job" 
                (bid)="actions.bid(job, $event)"
                (pay)="actions.pay(job)" ></job>
        </div>
    </div>
  `,
  styleUrls: [],
})
export class HomePageComponent {
    jobs$: Observable<Job[]>;
    constructor(@Inject(STATE) state$: Observable<State>, public actions: Actions) {
        this.jobs$ = state$.map(s => s.jobs);
    }
}
