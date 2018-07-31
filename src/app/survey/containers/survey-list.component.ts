import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest, map } from 'rxjs/operators';
import * as AuthAction from '../../core/actions/auth.actions';
import * as fromRoot from '../../reducers';
import * as fromUser from '../../user/reducers';
import { Survey } from '../models/survey.model';
import * as fromResponse from '../selectors/response.selectors';
import * as fromSurvey from '../selectors/survey.selectors';

type SURVEY_LIST = Survey & {
    responseId: number;
    showWriteButton: boolean;
    showEditButton: boolean;
    showLoginButton: boolean;
    showResultButton: boolean;
};

@Component({
    selector: 'app-survey-list',
    templateUrl: './survey-list.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyListComponent implements OnInit {
    ongoingList$: Observable<SURVEY_LIST[]>;
    closedList$: Observable<SURVEY_LIST[]>;

    constructor(private store: Store<any>) {}

    ngOnInit() {
        const list$ = this.store.select(fromSurvey.getAllSurveys).pipe(
            combineLatest(
                this.store.select(fromUser.getAuthedUserId),
                this.store.select(fromResponse.getAllResponses),
                this.store.select(fromRoot.getLoggedIn),
            ),
            map(([surveys, userId, responses, loggedIn]) => {
                return surveys.map(survey => {
                    const response = responses.find(
                        x => x.survey === survey.id && x.user === userId,
                    );
                    return {
                        ...survey,
                        responseId: response ? response.id : null,
                        showWriteButton:
                            survey.status === 'ongoing' &&
                            loggedIn &&
                            !response,
                        showEditButton:
                            survey.status === 'ongoing' &&
                            loggedIn &&
                            !!response,
                        showLoginButton:
                            survey.status === 'ongoing' && !loggedIn,
                        showResultButton: survey.status === 'closed',
                    };
                });
            }),
        );
        this.ongoingList$ = list$.pipe(map(item => item.filter(x => x.status === 'ongoing')))
        this.closedList$ = list$.pipe(map(item => item.filter(x => x.status === 'closed')))
    }

    login() {
        this.store.dispatch(new AuthAction.Login());
    }
}
