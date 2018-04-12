import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';
import { CardResponse } from '../models/response.model';

@Component({
    selector: 'app-card-response-ratio',
    templateUrl: './card-response-ratio.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardResponseRatioComponent implements OnInit, OnChanges {
    @Input() cardResponses: CardResponse[];
    @Input() label: string;
    @Input() prop: 'power' | 'generality';

    options = {
        tooltip: {},
        xAxis: {
            type: 'category',
            data: [20, 40, 60, 80]
        },
        yAxis: {},
        series: [],
    };

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        if (!this.label || !this.cardResponses || !this.prop) {
            return;
        }
        this.options = {
            ...this.options,
            series: [
                {
                    type: 'bar',
                    name: this.label,
                    data: this.getData(this.cardResponses, this.prop),
                },
            ],
        };
    }

    getData(cardResponses: CardResponse[], prop: 'power' | 'generality') {
        return [20, 40, 60, 80].map(name => {
            const value = cardResponses.filter(x => x[prop] === name).length;
            return value;
        });
    }
}
