import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';

import * as UserAction from '../../user/actions/user.actions';
import { UserService } from '../../user/services/user.service';
import {
    AuthActionTypes,
    LoginFailure,
    LoginSuccess,
} from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
    @Effect()
    login$ = this.actions$.ofType(AuthActionTypes.Login).pipe(
        switchMap(async () => {
            try {
                const token = await this.authService.login();
                const decoded = this.authService.decodeToken(token);
                return new LoginSuccess({ token, decoded });
            } catch (err) {
                return new LoginFailure(err);
            }
        }),
    );

    @Effect()
    loginSuccess$ = this.actions$
        .ofType(AuthActionTypes.LoginSuccess)
        .pipe(
            map((action: LoginSuccess) => action.payload),
            map(({ decoded }) => new UserAction.Load(decoded.id)),
        );

    @Effect({ dispatch: false })
    logout$ = this.actions$
        .ofType(AuthActionTypes.Logout)
        .pipe(tap(() => this.router.navigate(['/home'])));

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private userService: UserService,
        private router: Router,
    ) {}
}
