import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromResponse from '../selectors/response.selectors';
import * as fromSurvey from '../selectors/survey.selectors';


@Component({
    selector: 'app-survey-response-view-expansion',
    templateUrl: './survey-response-view-expansion.component.html',
    styleUrls: ['./survey-write-expansion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyResponseViewExpansionComponent implements OnInit {
    expansionResponse$ = this.store.select(
        fromResponse.getSelectedExpansionResponse,
    );
    survey$ = this.store.select(fromSurvey.getSelectedSurvey);

    constructor(private store: Store<any>) {}

    ngOnInit() {}
}
