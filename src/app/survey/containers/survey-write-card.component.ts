import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
    combineLatest,
    map,
    take,
    takeUntil,
    withLatestFrom,
} from 'rxjs/operators';
import { Card } from '../../card/models/card.model';
import * as SubmitAction from '../actions/submit.actions';
import * as FormAction from '../actions/survey-form.actions';
import { SurveyCardFilter } from '../models/filter.model';
import * as fromForm from '../selectors/form.selectors';
import * as fromResponse from '../selectors/response.selectors';
import * as fromSurvey from '../selectors/survey.selectors';
import { CardResponse } from '../models/response.model';


@Component({
    selector: 'app-survey-write-card',
    templateUrl: './survey-write-card.component.html',
    styleUrls: ['./survey-write-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyWriteCardComponent implements OnInit, OnDestroy {
    filter$ = this.store.select(fromForm.getFilter);
    selectedCardId$ = this.store.select(fromForm.getFormSelectedCardId);
    isLoading$ = this.store.select(fromForm.getFormIsLoading);
    cards$: Observable<(Card & { form?: CardResponse })[]>;

    unsubscribe$: Subject<void> = new Subject<void>();

    formGroup = new FormGroup({
        power: new FormControl(null, Validators.required),
        generality: new FormControl(null, Validators.required),
        description: new FormControl(''),
    });

    alertClosed = true;

    constructor(private store: Store<any>) {}

    ngOnInit() {
        this.selectedCardId$
            .pipe(
                combineLatest(
                    this.store.select(fromResponse.getSelectedResponseId),
                    this.store.select(fromResponse.getCardResponseEntities),
                ),
                takeUntil(this.unsubscribe$),
            )
            .subscribe(([cardId, responseId, cardResponseEntities]) => {
                const id = `${cardId}-${responseId}`;
                const cardResponse = cardResponseEntities[id];
                if (!cardResponse) {
                    return this.formGroup.reset({
                        power: null,
                        generality: null,
                        description: '',
                    });
                }
                this.formGroup.reset({
                    power: cardResponse.power,
                    generality: cardResponse.generality,
                    description: cardResponse.description,
                });
            });
        this.cards$ = this.store.select(fromForm.getFilteredFormList).pipe(
            combineLatest(this.store.select(fromForm.getFormNextCard)),
            withLatestFrom(this.store.select(fromSurvey.getSelectedSurvey)),
            map(([[cards, nextCard], survey]) => {
                if (survey.isPreRelease) {
                    return cards;
                }
                const responsed = cards.filter(x => !!x.form);
                return nextCard ? [nextCard, ...responsed] : responsed;
            }),
        );
        this.store.dispatch(new FormAction.SelectCard(null));
    }

    onFilterChange(filter: SurveyCardFilter) {
        this.store.dispatch(new FormAction.SetFilter(filter));
    }

    onSelect(id: string) {
        this.selectedCardId$.pipe(take(1)).subscribe(x => {
            document.querySelector('.content-area').scrollTop = 0;
            if (x) {
                this.alertClosed = false;
                return;
            }
            this.store.dispatch(new FormAction.SelectCard(id));
        });
    }

    onSubmit() {
        this.selectedCardId$
            .pipe(
                combineLatest(
                    this.store.select(fromSurvey.getSelectedSurveyId),
                    this.store.select(fromResponse.getSelectedResponseId),
                    this.isLoading$,
                ),
                take(1),
            )
            .subscribe(([card, survey, response, isLoading]) => {
                if (this.formGroup.invalid || isLoading) {
                    return;
                }
                this.alertClosed = true;
                this.store.dispatch(
                    new SubmitAction.SubmitCard({
                        form: {
                            ...this.formGroup.value,
                            card,
                        },
                        survey,
                        response,
                    }),
                );
            });
    }

    onCancel() {
        this.alertClosed = true;
        this.store.dispatch(new FormAction.SelectCard(null));
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
