import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';
import * as SurveyAction from '../actions/survey.actions';
import * as fromSurvey from '../selectors/survey.selectors';

@Component({
    selector: 'app-survey-result',
    templateUrl: './survey-result.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyResultComponent implements OnInit {
    expansion$: Observable<string>;

    constructor(private route: ActivatedRoute, private store: Store<any>) {}

    ngOnInit() {
        this.route.paramMap.pipe(take(1)).subscribe(paramMap => {
            this.store.dispatch(
                new SurveyAction.Select(+paramMap.get('surveyId')),
            );
        });

        this.expansion$ = this.store
            .select(fromSurvey.getSelectedSurvey)
            .pipe(map(survey => survey.expansion));
    }
}
