import { AppModule } from './app.module';
import { NgRedux } from '@angular-redux/store';
import { IAppState, Bid, Job, User } from './model';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';
import { trace, a, id } from './util';

export const bids = (af: AngularFire) => (jobId: string) => af.database.list(`bids/${jobId}/`);
export const user = (af: AngularFire): Observable<User> =>
    af.auth.map(auth => auth ? auth.uid : null)
        .flatMap(uid => uid ? af.database.object(`users/${uid}`) : Observable.of(null));
export const job = (af: AngularFire) => (jobId: string): Observable<Job> =>
    af.database.object(`jobs/${jobId}`)
        .flatMap(j => bids(af)(jobId)
        .map(b => a(j, {bids: b, $key: j.$key})));

export const jobs = (af: AngularFire): Observable<Job[]> =>
    user(af).flatMap(u => u ? af.database.object(`owner_to_jobs/${u.$key}`) : Observable.of({}))
        .map(x => Object.keys(x))
        .map(l => l.map((key, i) => job(af)(key).map(j => { return {job: j, index: i}; })))
        .flatMap(l => Observable.merge(...l))
        .scan((acc: Job[], x: {index: number, job: Job} ) => {acc[x.index] = x.job; return acc; }, []);


