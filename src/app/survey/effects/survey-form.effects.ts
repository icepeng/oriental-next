import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
    Add,
    AddSuccess,
    Edit,
    EditSuccess,
    Failure,
    SurveySubmitActionTypes,
} from '../actions/submit.actions';
import { SurveyService } from '../services/survey.service';

@Injectable()
export class SurveyFormEffects {
    @Effect()
    add$: Observable<Action> = this.actions$
        .ofType(SurveySubmitActionTypes.Add)
        .pipe(
            map((action: Add) => action.payload),
            switchMap(payload =>
                this.surveyService.add(payload.survey, payload.form).pipe(
                    map(
                        res =>
                            new AddSuccess({
                                survey: payload.survey,
                                form: payload.form,
                                id: res.id,
                            }),
                    ),
                    catchError(error => of(new Failure(error))),
                ),
            ),
        );

    @Effect()
    edit$: Observable<Action> = this.actions$
        .ofType(SurveySubmitActionTypes.Edit)
        .pipe(
            map((action: Edit) => action.payload),
            switchMap(payload =>
                this.surveyService
                    .edit(payload.id, payload.survey, payload.form)
                    .pipe(
                        map(
                            res =>
                                new EditSuccess({
                                    survey: payload.survey,
                                    form: payload.form,
                                    id: payload.id,
                                }),
                        ),
                        catchError(error => of(new Failure(error))),
                    ),
            ),
        );

    constructor(
        private actions$: Actions,
        private surveyService: SurveyService,
    ) {}
}
