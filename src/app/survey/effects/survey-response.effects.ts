import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import {
    LoadOne,
    LoadFailure,
    LoadOneSuccess,
    ResponseActionTypes,
    NavigateRandom,
} from '../actions/response.actions';
import { ResponseService } from '../services/response.service';

@Injectable()
export class ResponseEffects {
    @Effect()
    load$ = this.actions$
        .ofType(ResponseActionTypes.LoadOne)
        .pipe(
            map((action: LoadOne) => action.payload),
            switchMap(payload =>
                this.responseService
                    .getOne(payload)
                    .pipe(
                        map(res => new LoadOneSuccess(res)),
                        catchError(err => of(new LoadFailure(err))),
                    ),
            ),
        );

    @Effect({ dispatch: false })
    navigateRandom$ = this.actions$
        .ofType(ResponseActionTypes.NavigateRandom)
        .pipe(
            map((action: NavigateRandom) => action.payload),
            switchMap(payload =>
                this.responseService
                    .getRandomId(payload.survey)
                    .pipe(
                        tap(id =>
                            this.router.navigate([
                                '/',
                                'surveys',
                                payload.survey,
                                'responses',
                                id,
                                'view',
                            ]),
                        ),
                    ),
            ),
        );

    constructor(
        private actions$: Actions,
        private responseService: ResponseService,
        private router: Router,
    ) {}
}
