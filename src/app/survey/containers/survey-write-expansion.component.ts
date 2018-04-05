import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromExpansion from '../../expansion/reducers';

@Component({
    selector: 'app-survey-write-expansion',
    templateUrl: './survey-write-expansion.component.html',
    styleUrls: ['./survey-write-expansion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyWriteExpansionComponent implements OnInit {
    selectedExpansionId$ = this.store.select(
        fromExpansion.getSelectedExpansionId,
    );

    constructor(private store: Store<any>) {}

    ngOnInit() {}
}
