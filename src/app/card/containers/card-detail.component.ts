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

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDetailComponent implements OnInit, OnDestroy {
    card$ = this.store.select(fromCard.getSelectedCard);
    selectedId$ = this.store.select(fromCard.getSelectedCardId);
    unsubscribe$: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute, private store: Store<any>) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params =>
            this.store.dispatch(new CardActions.Select(params.get('id'))),
        );
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
