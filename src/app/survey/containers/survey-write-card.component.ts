import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { combineLatest, take, takeUntil } from 'rxjs/operators';
import * as FilterAction from '../actions/filter.actions';
import * as FormAction from '../actions/survey-form.actions';
import { SurveyCardFilter } from '../models/filter.model';
import * as fromSurvey from '../reducers';

@Component({
    selector: 'app-survey-write-card',
    templateUrl: './survey-write-card.component.html',
    styleUrls: ['./survey-write-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyWriteCardComponent implements OnInit, OnDestroy {
    filter$ = this.store.select(fromSurvey.getFilter);
    cards$ = this.store.select(fromSurvey.getCardFormList);
    selectedCardId$ = this.store.select(fromSurvey.getFormSelectedCardId);
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
                combineLatest(this.store.select(fromSurvey.getFormCards)),
                takeUntil(this.unsubscribe$),
            )
            .subscribe(([id, formCards]) => {
                const formCard = formCards[id];
                if (!formCard) {
                    return this.formGroup.reset({
                        power: null,
                        generality: null,
                        description: '',
                    });
                }
                this.formGroup.reset({
                    power: formCard.power,
                    generality: formCard.generality,
                    description: formCard.description,
                });
            });
        this.store.dispatch(new FormAction.SelectCard(null));
    }

    onFilterChange(filter: SurveyCardFilter) {
        this.store.dispatch(new FilterAction.SetFilter(filter));
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
        this.selectedCardId$.pipe(take(1)).subscribe(card => {
            this.alertClosed = true;
            this.store.dispatch(
                new FormAction.SubmitCard({
                    ...this.formGroup.value,
                    card,
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
