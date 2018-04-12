import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SurveyResponse } from '../../survey/models/response.model';
import { Store } from '@ngrx/store';
import * as fromUser from '../reducers';
import * as fromSurvey from '../../survey/selectors/survey.selectors';
import * as fromResponse from '../../survey/selectors/response.selectors';
import { combineLatest, map } from 'rxjs/operators';
import { Survey } from '../../survey/models/survey.model';

@Component({
    selector: 'app-user-response-list',
    templateUrl: './user-response-list.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserResponseListComponent implements OnInit {
    list$: Observable<
        {
            response: SurveyResponse;
            survey: Survey;
            viewable: boolean;
            editable: boolean;
        }[]
    >;

    constructor(private store: Store<any>) {}

    ngOnInit() {
        this.list$ = this.store.select(fromUser.getSelectedUserId).pipe(
            combineLatest(
                this.store.select(fromResponse.getAllResponses),
                this.store.select(fromSurvey.getSurveyEntities),
            ),
            map(([userId, responses, surveyEntities]) =>
                responses.filter(x => x.user === userId).map(response => {
                    const survey = surveyEntities[response.survey];
                    return {
                        response,
                        survey,
                        viewable:
                            survey.status === 'closed' ||
                            response.user === userId,
                        editable:
                            survey.status === 'ongoing' &&
                            response.user === userId,
                    };
                }),
            ),
        );
    }
}
