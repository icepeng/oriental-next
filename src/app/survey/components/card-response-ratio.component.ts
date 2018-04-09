import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';
import { SurveyCardForm } from '../models/survey-form.model';

@Component({
    selector: 'app-card-response-ratio',
    templateUrl: './card-response-ratio.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardResponseRatioComponent implements OnInit, OnChanges {
    @Input() cardResponses: SurveyCardForm[];
    @Input() label: string;
    @Input() prop: 'power' | 'generality';

    options = {
        tooltip: {},
        series: [],
    };

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        this.options = {
            ...this.options,
            series: [
                {
                    type: 'pie',
                    name: this.label,
                    data: this.getData(this.cardResponses, this.prop),
                },
            ],
        };
    }

    getData(cardResponses: SurveyCardForm[], prop: 'power' | 'generality') {
        return [20, 40, 60, 80].map(name => {
            const value = cardResponses.filter(x => x[prop] === name).length;
            return { name, value };
        });
    }
}
