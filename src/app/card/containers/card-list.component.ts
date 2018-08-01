import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromCard from '../reducers';
import * as fromExpansion from '../../expansion/reducers';
import * as FilterAction from '../actions/filter.actions';
import { CardFilter } from '../models/filter.model';
@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styles: [
        `
            .list-wrapper {
                max-width: 1056px;
            }
            .card-img {
                margin-bottom: 12px;
            }
            .card-img:hover {
                cursor: pointer;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent implements OnInit {
    filter$ = this.store.select(fromCard.getFilter);
    list$ = this.store.select(fromCard.getLimitedFilteredCards);
    expansions$ = this.store.select(fromExpansion.getAllExpansions);
    showExpandButton$ = this.store.select(fromCard.getShowExpandButton);

    constructor(private store: Store<any>) {}

    ngOnInit() {}

    onFilterChange(cardFilter: CardFilter) {
        this.store.dispatch(new FilterAction.SetFilter(cardFilter));
    }

    moreCards() {
        this.store.dispatch(new FilterAction.ExpandLimit());
    }
}
