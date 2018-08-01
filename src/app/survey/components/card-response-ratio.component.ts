import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';
import { CardResponse } from '../models/response.model';
import { propName } from '../../core/locales/ko-kr';

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
        color: [
            '#6870C4',
            '#00BFA9',
            '#80746D',
            '#6FEAD9',
            '#BBB3A9',
            '#0F1E82',
        ],
        xAxis: {
            type: 'category',
            data: [20, 40, 60, 80],
            axisLabel: {
                rotate: -75,
            },
        },
        yAxis: {},
        series: [],
        grid: {
            bottom: '30%'
        },
    };

    constructor() {}

    ngOnInit() {
        this.options.xAxis.data = [20, 40, 60, 80].map(
            x => propName[this.prop][x],
        );
    }

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
