import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
    combineLatest,
    filter,
    map,
    switchMap,
    take,
    withLatestFrom,
} from 'rxjs/operators';
import * as fromUser from '../../user/reducers';
import * as SubmitAction from '../actions/submit.actions';
import { SurveyCardForm } from '../models/survey-form.model';
import * as fromSurvey from '../reducers';

@Component({
    selector: 'app-survey-write-review',
    templateUrl: './survey-write-review.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyWriteReviewComponent implements OnInit {
    cardResponses$: Observable<SurveyCardForm[]>;
    cardMin$: Observable<boolean>;
    expansionRequired$: Observable<boolean>;

    constructor(private store: Store<any>, private router: Router) {}

    ngOnInit() {
        this.cardResponses$ = this.store
            .select(fromSurvey.getSelectedResponseCards)
            .pipe(
                map(formCards =>
                    Object.keys(formCards).map(key => formCards[key]),
                ),
            );
    }

    onSubmit() {}
}
