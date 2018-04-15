import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';
import { Survey } from '../../survey/models/survey.model';
import { ExpansionStat } from '../models/stat.model';

@Component({
    selector: 'app-expansion-basic-chart',
    templateUrl: './expansion-basic-chart.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionBasicChartComponent implements OnInit, OnChanges {
    @Input() expansionStats: ExpansionStat[];
    @Input() surveyEntities: { [id: number]: Survey };
    @Input() prop: 'fun' | 'balance';

    options = {
        tooltip: {},
        legend: {},
        color: [
            '#6FEAD9',
            '#00BFA9',
            '#0F1E82',
            '#6870C4',
            '#80746D',
            '#BBB3A9',
        ],
        xAxis: {
            type: 'category',
            data: [],
        },
        yAxis: {},
        series: [],
    };

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        if (!this.surveyEntities || !this.expansionStats || !this.prop) {
            return;
        }
        this.options = {
            ...this.options,
            xAxis: this.getXAxis(this.expansionStats, this.surveyEntities),
            series: this.getSeries(this.expansionStats, this.prop),
        };
    }

    getXAxis(
        expansionStats: ExpansionStat[],
        surveyEntities: { [id: number]: Survey },
    ) {
        return {
            type: 'category',
            data: expansionStats.map(
                expansionStat =>
                    surveyEntities[expansionStat.id].endTime.split('T')[0],
            ),
        };
    }

    getSeries(expansionStats: ExpansionStat[], prop: 'fun' | 'balance') {
        return [20, 40, 60, 80].map((value, index) => ({
            type: 'bar',
            name: value,
            data: expansionStats.map(
                expansionStat => expansionStat.data[prop][index],
            ),
        }));
    }
}