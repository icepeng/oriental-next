import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { combineLatest, takeUntil, withLatestFrom, take } from 'rxjs/operators';
import * as ResponseAction from '../actions/response.actions';
import * as fromResponse from '../selectors/response.selectors';
import * as fromResponseView from '../selectors/view.selectors';

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
    total$ = this.store.select(fromResponseView.getFilteredCardResponsesTotal);
    index$ = this.store.select(fromResponseView.getSelectedCardResponseIndex);
    unsubscribe$: Subject<void> = new Subject<void>();

    constructor(
        private store: Store<any>,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

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

    onPrev() {
        this.store
            .select(fromResponseView.getFilteredCardResponses)
            .pipe(withLatestFrom(this.index$), take(1))
            .subscribe(([cardResponses, index]) => {
                if (index <= 0) {
                    return;
                }
                this.router.navigate(['../', cardResponses[index - 1].card], {
                    relativeTo: this.route,
                });
            });
    }

    onNext() {
        this.store
            .select(fromResponseView.getFilteredCardResponses)
            .pipe(withLatestFrom(this.index$, this.total$), take(1))
            .subscribe(([cardResponses, index, total]) => {
                if (index + 1 >= total) {
                    return;
                }
                this.router.navigate(['../', cardResponses[index + 1].card], {
                    relativeTo: this.route,
                });
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
