import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromSurvey from '../reducers';
import { Observable } from 'rxjs/Observable';
import { combineLatest, map } from 'rxjs/operators';

@Component({
    selector: 'app-survey-write-submit',
    templateUrl: './survey-write-submit.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyWriteSubmitComponent implements OnInit {
    formCards$ = this.store.select(fromSurvey.getFormCards);
    formExpansion$ = this.store.select(fromSurvey.getFormExpansion);
    cardMin$: Observable<boolean>;
    expansionRequired$: Observable<boolean>;

    constructor(private store: Store<any>) {}

    ngOnInit() {
        this.cardMin$ = this.formCards$.pipe(
            map(cards => Object.keys(cards).length < 10),
        );
        this.expansionRequired$ = this.formExpansion$.pipe(map(x => !x));
    }
}
