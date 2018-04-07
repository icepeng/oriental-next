import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, take } from 'rxjs/operators';

import * as fromRoot from '../../reducers';
import * as Auth from '../actions/auth.actions';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<fromRoot.State>) {}

    inStore() {
        return this.store.select(fromRoot.getLoggedIn).pipe(take(1));
    }

    canActivate(): Observable<boolean> {
        return this.inStore().pipe(
            switchMap(authed => {
                if (!authed) {
                    this.store.dispatch(new Auth.Login());
                    return of(false);
                }
                return of(true);
            }),
        );
    }
}
