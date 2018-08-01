import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { CardResponseView } from '../models/response.model';
import { Card } from '../models/card.model';


@Component({
    selector: 'app-card-random-response',
    templateUrl: './card-random-response.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardRandomResponseComponent implements OnInit {
    @Input() responses: CardResponseView[];
    @Input() cardId: string;

    constructor() {}

    ngOnInit() {}
}
