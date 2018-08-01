import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { ExpansionResponseView } from '../models/response.model';


@Component({
    selector: 'app-expansion-random-response',
    templateUrl: './expansion-random-response.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionRandomResponseComponent implements OnInit {
    @Input() responses: ExpansionResponseView[];

    constructor() {}

    ngOnInit() {}
}
