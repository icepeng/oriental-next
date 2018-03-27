import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'app-expansion',
    templateUrl: './expansion.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionComponent implements OnInit {
    @HostBinding('class.u-main-container') main = true;

    constructor() {}

    ngOnInit() {}
}
