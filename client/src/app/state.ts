import { StoreState, User, Job } from './model';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { AngularFire } from 'angularfire2';
import { OpaqueToken } from '@angular/core';
import { user, jobs$ } from './selectors';
import { trace } from './util';

export interface State {
    user: User;
    jobs: Job[];
}

export const stateObservableFactory: (af: AngularFire, store: NgRedux<StoreState>) => Observable<State> = (af, store) => {
    let state$ = Observable.combineLatest(
        user(af).startWith(null),
        jobs$(af).startWith(null),
        (u, j): State => ({user: u, jobs: j || null}))
    .map(trace);
    state$.subscribe();
    return state$;
};
export let STATE = new OpaqueToken('app.state$');
