import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromExpansion from '../../expansion/reducers';

@Component({
    selector: 'app-survey-expansion',
    templateUrl: './survey-expansion.component.html',
    styleUrls: ['./survey-expansion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyExpansionComponent implements OnInit {
    nextExpansionId$ = this.store.select(fromExpansion.getNextExpansionId);

    constructor(private store: Store<any>) {}

    ngOnInit() {}
}
