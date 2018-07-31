import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
    catchError,
    map,
    switchMap,
    withLatestFrom,
    tap,
} from 'rxjs/operators';
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
import * as fromUser from '../../user/reducers';
import * as fromForm from '../selectors/form.selectors';
import {
    SurveyFormActionTypes,
    SetNextCardSuccess,
} from '../actions/survey-form.actions';

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
                        withLatestFrom(
                            this.store.select(fromUser.getAuthedUserId),
                        ),
                        map(
                            ([res, user]) =>
                                new SubmitCardSuccess({
                                    survey: payload.survey,
                                    response: payload.response,
                                    form: payload.form,
                                    point: res.point,
                                    user,
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
                        withLatestFrom(
                            this.store.select(fromUser.getAuthedUserId),
                        ),
                        map(
                            ([res, user]) =>
                                new SubmitExpansionSuccess({
                                    survey: payload.survey,
                                    response: payload.response,
                                    form: payload.form,
                                    point: res.point,
                                    user,
                                }),
                        ),
                        catchError(error =>
                            of(new SubmitExpansionFailure(error)),
                        ),
                    ),
            ),
        );

    @Effect()
    setNextCard$: Observable<Action> = this.actions$
        .ofType(
            SurveyFormActionTypes.SetNextCard,
            SurveySubmitActionTypes.SubmitCardSuccess,
        )
        .pipe(
            tap(() => console.log('hi')),
            withLatestFrom(this.store.select(fromForm.getCardFormList)),
            map(([_, cards]) => {
                const left = cards.filter(x => !x.form);
                const randomPick =
                    left[Math.floor(Math.random() * left.length)];
                return new SetNextCardSuccess(
                    randomPick ? randomPick.id : null,
                );
            }),
        );

    constructor(
        private store: Store<any>,
        private actions$: Actions,
        private surveyService: SurveyService,
    ) {}
}
