import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, combineLatest } from 'rxjs/operators';
import * as SurveyAction from '../actions/survey.actions';
import * as SubmitAction from '../actions/submit.actions';
import * as fromUser from '../../user/reducers';
import * as fromSurvey from '../reducers';

@Component({
    selector: 'app-survey-prepare',
    templateUrl: './survey-prepare.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyPrepareComponent implements OnInit {
    isLoading$ = this.store.select(fromSurvey.getPrepareIsLoading);
    error$ = this.store.select(fromSurvey.getPrepareError);

    constructor(private store: Store<any>, private route: ActivatedRoute) {}

    ngOnInit() {}

    start() {
        this.route.paramMap
            .pipe(
                combineLatest(this.store.select(fromUser.getAuthedUserId)),
                take(1),
            )
            .subscribe(([paramMap, user]) => {
                this.store.dispatch(
                    new SubmitAction.Submit({
                        user,
                        survey: +paramMap.get('surveyId'),
                    }),
                );
            });
    }
}
