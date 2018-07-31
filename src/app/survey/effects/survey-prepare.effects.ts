import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
    Submit,
    SubmitFailure,
    SubmitSuccess,
    SurveySubmitActionTypes,
} from '../actions/submit.actions';
import { ResponseService } from '../services/response.service';

@Injectable()
export class SurveyPrepareEffects {
    @Effect()
    submit$: Observable<Action> = this.actions$
        .ofType(SurveySubmitActionTypes.Submit)
        .pipe(
            map((action: Submit) => action.payload),
            switchMap(payload =>
                this.responseService.create(payload.survey).pipe(
                    map(
                        res =>
                            new SubmitSuccess({
                                survey: payload.survey,
                                user: payload.user,
                                id: res.id,
                            }),
                    ),
                    catchError(error => of(new SubmitFailure(error))),
                ),
            ),
        );

    @Effect({ dispatch: false })
    success$ = this.actions$.ofType(SurveySubmitActionTypes.SubmitSuccess).pipe(
        map((action: SubmitSuccess) => action.payload),
        tap(payload =>
            this.router.navigate([
                '/',
                'surveys',
                payload.survey,
                'responses',
                payload.id,
                'write',
            ]),
        ),
    );

    constructor(
        private actions$: Actions,
        private responseService: ResponseService,
        private router: Router,
    ) {}
}
