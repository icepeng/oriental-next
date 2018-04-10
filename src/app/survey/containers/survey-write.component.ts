import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as FilterAction from '../actions/filter.actions';
import * as ResponseAction from '../actions/response.actions';
import * as FormAction from '../actions/survey-form.actions';
import * as SurveyAction from '../actions/survey.actions';
import * as fromSurvey from '../reducers';

@Component({
    selector: 'app-survey-write',
    templateUrl: './survey-write.component.html',
    styles: [`.wrapper { max-width: 1056px; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyWriteComponent implements OnInit {
    error$ = this.store.select(fromSurvey.getFormError);

    constructor(private store: Store<any>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.pipe(take(1)).subscribe(paramMap => {
            this.store.dispatch(
                new SurveyAction.Select(+paramMap.get('surveyId')),
            );
            this.store.dispatch(new ResponseAction.Select(+paramMap.get('id')));
            this.store.dispatch(new FormAction.Init());
            this.store.dispatch(new FilterAction.ResetFilter());
        });
    }
}
