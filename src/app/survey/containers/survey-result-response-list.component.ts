import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromSurvey from '../selectors/survey.selectors';
import * as ResponseAction from '../actions/response.actions';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-survey-result-response-list',
    templateUrl: './survey-result-response-list.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyResultResponseListComponent implements OnInit {
    constructor(private store: Store<any>) {}

    ngOnInit() {}

    navigateRandom() {
        this.store
            .select(fromSurvey.getSelectedSurveyId)
            .pipe(take(1))
            .subscribe(surveyId => {
                this.store.dispatch(
                    new ResponseAction.NavigateRandom({ survey: surveyId }),
                );
            });
    }
}
