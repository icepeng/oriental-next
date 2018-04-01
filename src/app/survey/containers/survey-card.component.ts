import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-survey-card',
    templateUrl: './survey-card.component.html',
    styles: [`.list-wrapper { max-width: 1056px; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyCardComponent implements OnInit {
    constructor(private store: Store<any>) {}

    ngOnInit() {}
}
