import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'app-estimate',
    templateUrl: './estimate.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstimateComponent implements OnInit {
    @HostBinding('class.u-main-container') main = true;

    constructor() {}

    ngOnInit() {}
}
