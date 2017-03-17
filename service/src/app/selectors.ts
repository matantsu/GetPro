import { AppModule } from './app.module';
import { NgRedux } from '@angular-redux/store';
import { StoreState, } from './store';
import { User, Job, Bid } from './state';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';
import { trace, assign, id, list } from './util';

const log = str => x => {
    console.log(str, x);
    return x;
};

export const user = (af: AngularFire): Observable<User> =>
    af.auth.skipWhile(x => x == null)
        .flatMap(auth => auth ? af.database.object(`users/${auth.uid}`) : Observable.of(null));
export const bid = (af: AngularFire) => (jobId: string): Observable<Bid> =>
    user(af)
        .filter(id)
        .flatMap(u => af.database.object(`bids/${jobId}/${u.$key}`, { preserveSnapshot: true }))
        .skipWhile(s => s.val() == null)
        .map(s => assign(s.val(), {$key: s.key}));
export const owner = (af: AngularFire) => (jobId: string): Observable<User> =>
    bid(af)(jobId)
        .skipWhile(b => !b.payed)
        .flatMap(b => af.database.object(`job_to_owner/${jobId}`, { preserveSnapshot: true }))
        .map(x => x.val())
        .flatMap(userId => af.database.object(`users/${userId}`));

const fillJob = (af: AngularFire) => (j: Job): Observable<Job> =>
    Observable.combineLatest(
                bid(af)(j.$key).startWith(null),
                owner(af)(j.$key).startWith(null),
                (b, o) => assign(j, {bid: b, owner: o, $key: j.$key})
            );

export const jobs = (af: AngularFire): Observable<Job[]> =>
    af.database.list('jobs')
        .map(l => l.map(fillJob(af)))
        .flatMap(os => Observable.combineLatest(...os.map(o => o.startWith(null)), list));
