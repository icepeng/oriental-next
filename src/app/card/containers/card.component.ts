import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
    @HostBinding('class.u-main-container') main = true;

    constructor() {}

    ngOnInit() {}
}
