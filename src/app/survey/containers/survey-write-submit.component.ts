import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
    combineLatest,
    filter,
    map,
    switchMap,
    take,
    withLatestFrom,
} from 'rxjs/operators';
import * as fromUser from '../../user/reducers';
import * as SubmitAction from '../actions/submit.actions';
import * as fromSurvey from '../reducers';
import { SurveyCardForm } from '../models/survey-form.model';

@Component({
    selector: 'app-survey-write-submit',
    templateUrl: './survey-write-submit.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyWriteSubmitComponent implements OnInit {
    cardResponses$: Observable<SurveyCardForm[]>;
    isLoading$ = this.store.select(fromSurvey.getFormIsLoading);
    cardMin$: Observable<boolean>;
    expansionRequired$: Observable<boolean>;
    disabled$: Observable<boolean>;

    constructor(private store: Store<any>, private router: Router) {}

    ngOnInit() {
        this.cardMin$ = this.store
            .select(fromSurvey.getFormCards)
            .pipe(map(cards => Object.keys(cards).length < 10));
        this.expansionRequired$ = this.store
            .select(fromSurvey.getFormExpansion)
            .pipe(map(x => !x));
        this.disabled$ = this.cardMin$.pipe(
            combineLatest(this.expansionRequired$),
            map(([min, req]) => min || req),
        );
        this.cardResponses$ = this.store
            .select(fromSurvey.getFormCards)
            .pipe(
                map(formCards =>
                    Object.keys(formCards).map(key => formCards[key]),
                ),
            );
    }

    onSubmit() {
        this.isLoading$
            .pipe(
                combineLatest(this.disabled$),
                take(1),
                filter(([isLoading, disabled]) => !isLoading && !disabled),
                switchMap(() =>
                    this.store.select(fromSurvey.getSelectedSurveyId),
                ),
                withLatestFrom(
                    this.store.select(fromUser.getAuthedUserId),
                    this.store.select(fromSurvey.getAllResponses),
                    this.store.select(fromSurvey.getFormCards),
                    this.store.select(fromSurvey.getFormExpansion),
                ),
            )
            .subscribe(([id, userId, responses, formCards, formExpansion]) => {
                const response = responses.find(
                    x => x.user === userId && x.survey === +id,
                );
                const form = {
                    cardResponses: Object.keys(formCards).map(
                        x => formCards[x],
                    ),
                    expansionResponse: formExpansion,
                };
                if (!response) {
                    return this.store.dispatch(
                        new SubmitAction.Add({
                            survey: +id,
                            form,
                        }),
                    );
                }
                return this.store.dispatch(
                    new SubmitAction.Edit({
                        id: response.id,
                        survey: +id,
                        form,
                    }),
                );
            });
    }
}
