import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take, combineLatest } from 'rxjs/operators';

import * as FilterAction from '../actions/filter.actions';
import * as SurveyAction from '../actions/survey.actions';
import * as FormAction from '../actions/survey-form.actions';
import * as fromUser from '../../user/reducers';
import * as fromSurvey from '../reducers';

@Component({
    selector: 'app-survey-write',
    templateUrl: './survey-write.component.html',
    styles: [`.wrapper { max-width: 1056px; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyWriteComponent implements OnInit {
    constructor(private store: Store<any>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap
            .pipe(
                map(paramMap => paramMap.get('id')),
                combineLatest(
                    this.store.select(fromUser.getAuthedUserId),
                    this.store.select(fromSurvey.getAllResponses),
                    this.store.select(fromSurvey.getCardResponseEntities),
                    this.store.select(fromSurvey.getExpansionResponseEntities),
                ),
                take(1),
            )
            .subscribe(
                ([
                    id,
                    userId,
                    responses,
                    cardResponses,
                    expansionResponses,
                ]) => {
                    this.store.dispatch(new SurveyAction.Select(id));
                    const response = responses.find(
                        x => x.user === userId && x.survey === +id,
                    );
                    if (!response) {
                        return this.store.dispatch(new FormAction.Init());
                    }
                    return this.store.dispatch(
                        new FormAction.Load({
                            cardResponses: response.cardResponses.map(
                                x => cardResponses[x],
                            ),
                            expansionResponse:
                                expansionResponses[response.expansionResponse],
                        }),
                    );
                },
            );
        this.store.dispatch(new FilterAction.ResetFilter());
    }
}
