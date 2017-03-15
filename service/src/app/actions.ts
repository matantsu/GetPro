import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { IAppState } from './model';
import { NgRedux } from '@angular-redux/store';
import { Action } from 'redux';
import { a, trace } from './util';
import { Subscription } from 'rxjs';

interface JobPostedAction extends Action {
    type: 'jobPosted';
    key: string;
}

function jobPosted(key: string): JobPostedAction {
    return {
        type: 'jobPosted',
        key: key
    };
}

export type AppAction = JobPostedAction;

@Injectable()
export class Actions {
    constructor(private ngRedux: NgRedux<IAppState>, private angularFire: AngularFire) {
    }

    bid(job, bid) {
        trace(bid);
        this.angularFire.auth
            .first()
            .subscribe(a =>
                this.angularFire.database
                    .object(`bids/${job.$key}/${a.uid}`)
                    .set({price: +bid}));
    }

    pay(job) {
        this.angularFire.auth
            .first()
            .subscribe(a =>
                this.angularFire.database
                    .object(`bids/${job.$key}/${a.uid}/payed`)
                    .set(true));
    }
}
