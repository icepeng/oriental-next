import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import * as CardActions from '../actions/card.actions';
import { Store } from '@ngrx/store';
import * as fromCard from '../reducers';
import { takeUntil, take, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDetailComponent implements OnInit, OnDestroy {
    card$ = this.store.select(fromCard.getSelectedCard);
    selectedId$ = this.store.select(fromCard.getSelectedCardId);
    total$ = this.store.select(fromCard.getFilteredCardsTotal);
    index$ = this.store.select(fromCard.getSelectedCardIndex);

    unsubscribe$: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute, private store: Store<any>) {}

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
                this.store.dispatch(
                    new CardActions.Select(cards[index - 1].id),
                );
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
                this.store.dispatch(
                    new CardActions.Select(cards[index + 1].id),
                );
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
