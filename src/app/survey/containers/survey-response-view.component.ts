import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest, filter, map, take } from 'rxjs/operators';
import * as fromUser from '../../user/reducers';
import * as ResponseAction from '../actions/response.actions';
import * as SurveyAction from '../actions/survey.actions';
import * as fromResponse from '../selectors/response.selectors';
import * as fromSurvey from '../selectors/survey.selectors';

@Component({
    selector: 'app-survey-response-view',
    templateUrl: './survey-response-view.component.html',
    styles: [`.wrapper { max-width: 1056px; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyResponseViewComponent implements OnInit {
    hasExpansionResponse$: Observable<boolean>;
    battletag$: Observable<string>;
    expansion$: Observable<string>;

    constructor(private route: ActivatedRoute, private store: Store<any>) {}

    ngOnInit() {
        this.route.paramMap.pipe(take(1)).subscribe(paramMap => {
            this.store.dispatch(
                new SurveyAction.Select(+paramMap.get('surveyId')),
            );
            this.store.dispatch(
                new ResponseAction.Select(+paramMap.get('responseId')),
            );
        });
        this.battletag$ = this.store
            .select(fromResponse.getSelectedResponse)
            .pipe(
                combineLatest(this.store.select(fromUser.getUserEntities)),
                filter(
                    ([response, userEntities]) =>
                        !!response && !!userEntities[response.user],
                ),
                map(
                    ([response, userEntities]) =>
                        userEntities[response.user].battletag,
                ),
            );

        this.expansion$ = this.store
            .select(fromResponse.getSelectedResponse)
            .pipe(
                combineLatest(this.store.select(fromSurvey.getSurveyEntities)),
                filter(
                    ([response, surveyEntities]) =>
                        !!response && !!surveyEntities[response.survey],
                ),
                map(
                    ([response, surveyEntities]) =>
                        surveyEntities[response.survey].expansion,
                ),
            );

        this.hasExpansionResponse$ = this.store
            .select(fromResponse.getSelectedResponse)
            .pipe(map(response => !!response.expansionResponse));
    }
}
