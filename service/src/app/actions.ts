import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { StoreState } from './store';
import { NgRedux } from '@angular-redux/store';
import { Action } from 'redux';
import { a, trace } from './util';
import { Subscription } from 'rxjs';

@Injectable()
export class Actions {
    constructor(private ngRedux: NgRedux<StoreState>, private af: AngularFire) {
    }

    login() {
        return this.af.auth.login();
    }

    logout() {
        return this.af.auth.logout();
    }

    bid(job, bid) {
        trace(bid);
        return this.af.auth
            .first()
            .subscribe(a =>
                this.af.database
                    .object(`bids/${job.$key}/${a.uid}`)
                    .set({price: +bid}));
    }

    pay(job) {
        return this.af.auth
            .first()
            .subscribe(a =>
                this.af.database
                    .object(`bids/${job.$key}/${a.uid}/payed`)
                    .set(true));
    }
}
