import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest, map } from 'rxjs/operators';

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
    ongoingList$: Observable<(Survey & { responsed: boolean })[]>;
    closedSurveys$ = this.store.select(fromSurvey.getClosedSurveys);

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
                        const responsed = !!responses.find(
                            x => x.survey === survey.id && x.user === userId,
                        );
                        return {
                            ...survey,
                            responsed,
                        };
                    });
                }),
            );
    }
}
