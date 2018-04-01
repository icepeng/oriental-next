import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-estimate-list',
    templateUrl: './estimate-list.component.html',
    styles: [`.list-wrapper { max-width: 1056px; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstimateListComponent implements OnInit {
    constructor(private store: Store<any>) {}

    ngOnInit() {}
}
