import { StoreState } from './store';
import { NgRedux } from '@angular-redux/store';
import { AngularFire } from 'angularfire2';
import { user, jobs } from './selectors';
import { Observable } from 'rxjs';
import { OpaqueToken } from '@angular/core';
import { trace } from './util';

export enum JobStatus {
    OPEN, // you can bid on it
    BIDDED, // you bidded on it and waiting for the client
    CHOSEN, // client has chosen your bid
    UNCHOSEN, // client chose other bid
    PAYED, // you payed for the job and you get the client's details
    LOCKED // someone else has payed for the job and it is locked
}

export interface Bid {
    $key: string;
    payed?: boolean;
    price: number;
}

export interface User {
    $key: string;
    displayName: string;
    photoURL: string;
    phone: string;
}

export interface Job {
    $key: string;
    owner?: User;
    bid?: Bid;
    chosen?: string;
    locked?: boolean;

    type: string;
    desc: string;
}

export interface State {
    user?: User;
    jobs?: Job[];
}

export const jobStatus = (job: Job) =>
    job.locked && job.bid && job.bid.payed ?
        JobStatus.PAYED :
    job.locked ?
        JobStatus.LOCKED :
    job.chosen && job.bid && job.chosen === job.bid.$key ?
        JobStatus.CHOSEN :
    job.bid ?
        JobStatus.BIDDED :
    JobStatus.OPEN
;

export const stateObservableFactory: (af: AngularFire, store: NgRedux<StoreState>) => Observable<State> = (af, store) =>
    Observable.combineLatest(
        user(af).startWith(null),
        jobs(af).startWith(null),
        (u, j): State => ({user: u, jobs: j}))
    .map(trace);
;
export let STATE = new OpaqueToken('app.state$');
