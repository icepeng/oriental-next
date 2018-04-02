import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../reducers';

@Component({
    selector: 'app-expansion-list',
    templateUrl: './expansion-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
    .card-block {
        text-align: center;
    }
    `]
})
export class ExpansionListComponent implements OnInit {
    expansions$ = this.store.select(fromStore.getAllExpansions);

    constructor(private store: Store<any>) {}

    ngOnInit() {}
}
