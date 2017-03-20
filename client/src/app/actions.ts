import { user } from './selectors';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { StoreState, Job, Bid, User } from './model';
import { NgRedux } from '@angular-redux/store';
import { Action } from 'redux';
import { assign, trace, id } from './util';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';

export type AppAction = null;

@Injectable()
export class Actions {
    constructor(private ngRedux: NgRedux<StoreState>, private af: AngularFire, private router: Router) {
    }

    postJob(job: Job) {
        this.af.database.list('jobs/')
            .push(assign(job, {timestamp: firebase.database.ServerValue.TIMESTAMP}))
            .then(x => this.router.navigateByUrl('job/' + x.key));
    }

    chooseBid(bid: Bid, jobId: string) {
        this.af.database.object(`jobs/${jobId}/chosen`)
            .set(bid.$key);
    }

    remove(jobId) {
        this.af.database.object(`jobs/${jobId}`)
            .remove()
            .then(x => this.router.navigateByUrl('home/'));
    }

    editUser(u: any) {
        user(this.af)
            .first()
            .flatMap(us => this.af.database.object(`users/${us.$key}`).set(assign(us, u)))
            .first()
            .subscribe();
    }

    login() {
        return this.af.auth.login();
    }

    logout() {
        return this.af.auth.logout();
    }
}
