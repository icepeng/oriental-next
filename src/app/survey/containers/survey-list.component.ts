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

@Component({
    selector: 'app-survey-list',
    templateUrl: './survey-list.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyListComponent implements OnInit {
    list$: Observable<
        (Survey & {
            responseId: number;
            showWriteButton: boolean;
            showEditButton: boolean;
            showLoginButton: boolean;
            showResultButton: boolean;
        })[]
    >;

    constructor(private store: Store<any>) {}

    ngOnInit() {
        this.list$ = this.store.select(fromSurvey.getAllSurveys).pipe(
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
    }

    login() {
        this.store.dispatch(new AuthAction.Login());
    }
}
