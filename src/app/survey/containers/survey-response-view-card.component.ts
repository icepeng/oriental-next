import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { combineLatest, takeUntil } from 'rxjs/operators';
import * as ResponseAction from '../actions/response.actions';
import * as fromResponse from '../selectors/response.selectors';

@Component({
    selector: 'app-survey-response-view-card',
    templateUrl: './survey-response-view-card.component.html',
    styleUrls: ['./survey-write-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyResponseViewCardComponent implements OnInit, OnDestroy {
    selectedCardResponse$ = this.store.select(
        fromResponse.getSelectedCardResponse,
    );
    unsubscribe$: Subject<void> = new Subject<void>();

    constructor(private store: Store<any>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap
            .pipe(
                combineLatest(
                    this.store.select(fromResponse.getSelectedResponseId),
                ),
                takeUntil(this.unsubscribe$),
            )
            .subscribe(([paramMap, responseId]) => {
                this.store.dispatch(
                    new ResponseAction.SelectCard(
                        `${paramMap.get('cardId')}-${responseId}`,
                    ),
                );
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
