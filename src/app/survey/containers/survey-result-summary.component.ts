import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromResult from '../selectors/result.selectors';

@Component({
    selector: 'app-survey-result-summary',
    templateUrl: './survey-result-summary.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyResultSummaryComponent implements OnInit {
    cardStats$ = this.store.select(fromResult.getSelectedSurveyCardStats);
    expansionStat$ = this.store.select(fromResult.getSelectedSurveyCardStats);

    constructor(private store: Store<any>) {}

    ngOnInit() {}
}
