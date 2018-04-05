import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromSurvey from '../reducers';

@Component({
    selector: 'app-survey-list',
    templateUrl: './survey-list.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyListComponent implements OnInit {
    ongoingSurveys$ = this.store.select(fromSurvey.getOngoingSurveys);
    closedSurveys$ = this.store.select(fromSurvey.getClosedSurveys);

    constructor(private store: Store<any>) {}

    ngOnInit() {}
}
