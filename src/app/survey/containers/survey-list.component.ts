import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest, map } from 'rxjs/operators';
import * as AuthAction from '../../core/actions/auth.actions';
import * as fromRoot from '../../reducers';
import * as fromUser from '../../user/reducers';
import { Survey } from '../models/survey.model';
import * as fromSurvey from '../reducers';

@Component({
    selector: 'app-survey-list',
    templateUrl: './survey-list.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyListComponent implements OnInit {
    ongoingList$: Observable<(Survey & { responseId: number })[]>;
    closedSurveys$ = this.store.select(fromSurvey.getClosedSurveys);
    loggedIn$ = this.store.select(fromRoot.getLoggedIn);

    constructor(private store: Store<any>) {}

    ngOnInit() {
        this.ongoingList$ = this.store
            .select(fromSurvey.getOngoingSurveys)
            .pipe(
                combineLatest(
                    this.store.select(fromUser.getAuthedUserId),
                    this.store.select(fromSurvey.getAllResponses),
                ),
                map(([surveys, userId, responses]) => {
                    return surveys.map(survey => {
                        const response = responses.find(
                            x => x.survey === survey.id && x.user === userId,
                        );
                        return {
                            ...survey,
                            responseId: response ? response.id : null,
                        };
                    });
                }),
            );
    }

    login() {
        this.store.dispatch(new AuthAction.Login());
    }
}
