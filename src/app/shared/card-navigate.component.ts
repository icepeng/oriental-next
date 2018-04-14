import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';

@Component({
    selector: 'app-card-navigate',
    templateUrl: './card-navigate.component.html',
    styleUrls: ['./card-navigate.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardNavigateComponent implements OnInit {
    @Input() total: number;
    @Input() index: number;
    @Input() id: string;
    @Output() prev = new EventEmitter<void>();
    @Output() next = new EventEmitter<void>();

    constructor() {}

    ngOnInit() {}
}
