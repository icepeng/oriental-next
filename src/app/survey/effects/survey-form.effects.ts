import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
    SubmitCard,
    SubmitCardFailure,
    SubmitCardSuccess,
    SubmitExpansion,
    SubmitExpansionFailure,
    SubmitExpansionSuccess,
    SurveySubmitActionTypes,
} from '../actions/submit.actions';
import { SurveyService } from '../services/survey.service';

@Injectable()
export class SurveyFormEffects {
    @Effect()
    submitCard$: Observable<Action> = this.actions$
        .ofType(SurveySubmitActionTypes.SubmitCard)
        .pipe(
            map((action: SubmitCard) => action.payload),
            switchMap(payload =>
                this.surveyService
                    .saveCard({
                        form: payload.form,
                        responseId: payload.response,
                        surveyId: payload.survey,
                    })
                    .pipe(
                        map(
                            res =>
                                new SubmitCardSuccess({
                                    survey: payload.survey,
                                    response: payload.response,
                                    form: payload.form,
                                }),
                        ),
                        catchError(error => of(new SubmitCardFailure(error))),
                    ),
            ),
        );

    @Effect()
    submitExpansion$: Observable<Action> = this.actions$
        .ofType(SurveySubmitActionTypes.SubmitExpansion)
        .pipe(
            map((action: SubmitExpansion) => action.payload),
            switchMap(payload =>
                this.surveyService
                    .saveExpansion({
                        form: payload.form,
                        responseId: payload.response,
                        surveyId: payload.survey,
                    })
                    .pipe(
                        map(
                            res =>
                                new SubmitExpansionSuccess({
                                    survey: payload.survey,
                                    response: payload.response,
                                    form: payload.form,
                                }),
                        ),
                        catchError(error =>
                            of(new SubmitExpansionFailure(error)),
                        ),
                    ),
            ),
        );

    constructor(
        private actions$: Actions,
        private surveyService: SurveyService,
    ) {}
}
