import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ResponseViewAction from '../actions/response-view.actions';
import { ResponseViewCardFilter } from '../models/filter.model';
import * as fromResponse from '../selectors/response.selectors';
import * as fromResponseView from '../selectors/view.selectors';

@Component({
    selector: 'app-survey-response-view-card-list',
    templateUrl: './survey-response-view-card-list.component.html',
    styleUrls: ['./survey-write-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyResponseViewCardListComponent implements OnInit {
    filter$ = this.store.select(fromResponseView.getFilter);
    cardResponses$ = this.store.select(
        fromResponseView.getLimitedFilteredCards,
    );
    showExpandButton$ = this.store.select(fromResponseView.getShowExpandButton);

    constructor(private store: Store<any>) {}

    ngOnInit() {}

    onFilterChange(filter: ResponseViewCardFilter) {
        this.store.dispatch(new ResponseViewAction.SetFilter(filter));
    }

    moreCards() {
        this.store.dispatch(new ResponseViewAction.ExpandLimit());
    }
}
