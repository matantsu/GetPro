import { AppModule } from './app.module';
import { NgRedux } from '@angular-redux/store';
import { IAppState, Job, Bid, User } from './model';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';
import { trace, a, id } from './util';

export const user = (af: AngularFire): Observable<firebase.User> =>
    af.auth.map(auth => auth ? auth.auth : null);
export const bid = (af: AngularFire) => (jobId: string): Observable<Bid> =>
    user(af).flatMap(u => u ? af.database.object(`bids/${jobId}/${u.uid}`, { preserveSnapshot: true })
        .map(s => s.val() ? a(s.val(), {$key: s.key}) : s.val()) : null);
export const owner = (af: AngularFire) => (jobId: string): Observable<User> =>
    af.database.object(`job_to_owner/${jobId}`, { preserveSnapshot: true })
        .map(x => x.val())
        .flatMap(userId => af.database.object(`users/${userId}`));
export const jobs = (af: AngularFire): Observable<Job[]> =>
    af.database.list(`jobs`)
        .map(l => l.map((j, i) => bid(af)(j.$key)
            .flatMap(b =>
                        b && b.payed ?
                            owner(af)(j.$key).map(o => { return {index: i, val: a(j, {owner: o, bid: b, $key: j.$key})}; }) :
                            Observable.of({index: i, val: a(j, {bid: b, $key: j.$key})})
                    )
        ))
        .flatMap(l => Observable.merge(...l))
        .scan((acc: Job[], x: {val: Job, index: number}) => {acc[x.index] = x.val; return acc; }, [])
        .map((l: Job[]) => l.filter(id))
        .map(trace)
    ;
