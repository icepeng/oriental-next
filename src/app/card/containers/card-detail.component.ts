import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { take, takeUntil, withLatestFrom } from 'rxjs/operators';
import * as fromSurvey from '../../survey/selectors/survey.selectors';
import * as CardActions from '../actions/card.actions';
import * as fromCard from '../reducers';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDetailComponent implements OnInit, OnDestroy {
    selectedId$ = this.store.select(fromCard.getSelectedCardId);
    total$ = this.store.select(fromCard.getFilteredCardsTotal);
    index$ = this.store.select(fromCard.getSelectedCardIndex);
    stats$ = this.store.select(fromCard.getSelectedCardStats);
    surveyEntities$ = this.store.select(fromSurvey.getSurveyEntities);

    unsubscribe$: Subject<void> = new Subject<void>();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<any>,
    ) {}

    ngOnInit() {
        this.route.paramMap
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(params =>
                this.store.dispatch(new CardActions.Select(params.get('id'))),
            );
    }

    onPrev() {
        this.store
            .select(fromCard.getFilteredCards)
            .pipe(withLatestFrom(this.index$), take(1))
            .subscribe(([cards, index]) => {
                if (index <= 0) {
                    return;
                }
                this.router.navigate(['../', cards[index - 1].id], {
                    relativeTo: this.route,
                });
            });
    }

    onNext() {
        this.store
            .select(fromCard.getFilteredCards)
            .pipe(withLatestFrom(this.index$, this.total$), take(1))
            .subscribe(([cards, index, total]) => {
                if (index + 1 >= total) {
                    return;
                }
                this.router.navigate(['../', cards[index + 1].id], {
                    relativeTo: this.route,
                });
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
