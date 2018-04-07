import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromSurvey from '../reducers';

@Component({
    selector: 'app-survey-write-submit',
    templateUrl: './survey-write-submit.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyWriteSubmitComponent implements OnInit {
    formCards$ = this.store.select(fromSurvey.getFormCards);
    formExpansion$ = this.store.select(fromSurvey.getFormExpansion);

    constructor(private store: Store<any>) {}

    ngOnInit() {}
}
