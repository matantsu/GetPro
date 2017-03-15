import { user } from './selectors';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { IAppState, Job, Bid, User } from './model';
import { NgRedux } from '@angular-redux/store';
import { Action } from 'redux';
import { a, trace, id } from './util';
import { Subscription } from 'rxjs';

export type AppAction = null;

@Injectable()
export class Actions {
    constructor(private ngRedux: NgRedux<IAppState>, private angularFire: AngularFire, private router: Router) {
    }

    postJob(job: Job) {
        this.angularFire.database.list('jobs/')
            .push(job)
            .then(x => this.router.navigateByUrl('job/' + x.key));
    }

    chooseBid(bid: Bid, jobId: string) {
        this.angularFire.database.object(`jobs/${jobId}/chosen`)
            .set(bid.$key);
    }

    remove(jobId) {
        this.angularFire.database.object(`jobs/${jobId}`)
            .remove()
            .then(x => this.router.navigateByUrl('home/'));
    }

    editUser(u: any) {
            user(this.angularFire)
            .first()
            .flatMap(us => this.angularFire.database.object(`users/${us.$key}`).set(a(us, u)))
            .first()
            .subscribe();
    }
}
