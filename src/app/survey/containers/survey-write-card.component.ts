import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-survey-write-card',
    templateUrl: './survey-write-card.component.html',
    styles: [`.list-wrapper { max-width: 1056px; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyWriteCardComponent implements OnInit {
    constructor(private store: Store<any>) {}

    ngOnInit() {}
}
