import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromResponse from '../selectors/response.selectors';

@Component({
    selector: 'app-survey-response-view-summary',
    templateUrl: './survey-response-view-summary.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyResponseViewSummaryComponent implements OnInit {
    cardResponses$ = this.store.select(fromResponse.getSelectedResponseCardResponses);

    constructor(private store: Store<any>) {}

    ngOnInit() {}
}
