import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest, map, take } from 'rxjs/operators';
import * as fromUser from '../../user/reducers';
import * as SubmitAction from '../actions/submit.actions';
import * as fromSurvey from '../reducers';

@Component({
    selector: 'app-survey-write-submit',
    templateUrl: './survey-write-submit.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyWriteSubmitComponent implements OnInit {
    formCards$ = this.store.select(fromSurvey.getFormCards);
    formExpansion$ = this.store.select(fromSurvey.getFormExpansion);
    isLoading$ = this.store.select(fromSurvey.getFormIsLoading);
    cardMin$: Observable<boolean>;
    expansionRequired$: Observable<boolean>;

    constructor(private store: Store<any>, private router: Router) {}

    ngOnInit() {
        this.cardMin$ = this.formCards$.pipe(
            map(cards => Object.keys(cards).length < 10),
        );
        this.expansionRequired$ = this.formExpansion$.pipe(map(x => !x));
    }

    onSubmit() {
        this.store
            .select(fromSurvey.getSelectedSurveyId)
            .pipe(
                combineLatest(
                    this.store.select(fromUser.getAuthedUserId),
                    this.store.select(fromSurvey.getAllResponses),
                    this.formCards$,
                    this.formExpansion$,
                    this.isLoading$,
                ),
                take(1),
            )
            .subscribe(
                ([
                    id,
                    userId,
                    responses,
                    formCards,
                    formExpansion,
                    isLoading,
                ]) => {
                    if (isLoading) {
                        return;
                    }

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
                },
            );
    }
}
