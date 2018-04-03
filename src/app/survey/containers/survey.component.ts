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

    ngOnInit() {
        // TODO: select current survey
        // TODO: estimate 중 user === authedUser && survey === currentSurvey가 존재하면, 정보 불러오기
    }
}
