import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-survey-write-expansion',
    templateUrl: './survey-write-expansion.component.html',
    styleUrls: ['./survey-write-expansion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyWriteExpansionComponent implements OnInit {
    @Input() expansion: string;

    constructor() {}

    ngOnInit() {}
}
