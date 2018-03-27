import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-expansion-detail',
    templateUrl: './expansion-detail.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionDetailComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
