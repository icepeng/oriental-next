import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyComponent implements OnInit {
    @HostBinding('class.u-main-container') main = true;

    constructor() {}

    ngOnInit() {}
}
