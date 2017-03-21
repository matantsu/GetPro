import { AppModule } from './app.module';
import { NgRedux } from '@angular-redux/store';
import { StoreState, Bid, Job, User } from './model';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';
import { trace, assign, id, list } from './util';

export const user = (af: AngularFire): Observable<User> =>
    af.auth.skipWhile(x => x == null)
        .flatMap(auth => auth ? af.database.object(`users/${auth.uid}`) : Observable.of(null));

export const fillBid = (af: AngularFire) => (bid: Bid) =>
    af.database.object(`users/${bid.$key}`).startWith(null)
        .map(owner => assign(bid, {owner: owner, $key: bid.$key}));
export const bids = (af: AngularFire) => (jobId: string) =>
    af.database.list(`bids/${jobId}/`)
        .map(bs => bs.map(fillBid(af)))
        .flatMap(os => Observable.combineLatest(...os.map(o => o.startWith(null)), list))
        .startWith([])
        .map(j => j.sort((a, b) => b.timestamp - a.timestamp));
export const job = (af: AngularFire) => (jobId: string): Observable<Job> =>
    af.database.object(`jobs/${jobId}`)
        .flatMap(j => bids(af)(jobId)
        .map(b => assign(j, {bids: b, $key: j.$key})));

const fillJob = (af: AngularFire) => (jobId: string): Observable<Job> =>
    af.database.object(`jobs/${jobId}`)
        .flatMap(j => bids(af)(jobId).startWith(null).map(bs => assign(j, {bids: bs, $key: j.$key})));


export const jobs = (af: AngularFire): Observable<Job[]> =>
    user(af).flatMap(u => u ? af.database.object(`owner_to_jobs/${u.$key}`) : Observable.of({}))
        .map(x => Object.keys(x))
        .map(l => l.map((key, i) => job(af)(key).map(j => { return {job: j, index: i}; })))
        .flatMap(l => Observable.merge(...l))
        .scan((acc: Job[], x: {index: number, job: Job} ) => {acc[x.index] = x.job; return acc; }, []);

export const jobs$ = (af: AngularFire): Observable<Job[]> =>
    user(af)
        .filter(id)
        .flatMap(u => af.database.object(`owner_to_jobs/${u.$key}`, { preserveSnapshot: true}))
        .filter(s => s.val())
        .map(s => s.val())
        .map(x => Object.keys(x))
        .map(l => l.map(fillJob(af)))
        .flatMap(os => Observable.combineLatest(...os.map(o => o.startWith(null)), list))
        .map(l => l.filter(id))
        .startWith([])
        .map(j => j.sort((a, b) => b.timestamp - a.timestamp));
