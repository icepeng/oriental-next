import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';
import { Survey } from '../../survey/models/survey.model';
import { CardStat } from '../models/stat.model';
import { propName } from '../../core/locales/ko-kr';

@Component({
    selector: 'app-card-basic-chart',
    templateUrl: './card-basic-chart.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBasicChartComponent implements OnInit, OnChanges {
    @Input() cardStats: CardStat[];
    @Input() surveyEntities: { [id: number]: Survey };
    @Input() prop: 'power' | 'generality';

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
        yAxis: {
            axisLabel: {
                formatter: '{value} %',
            },
        },
        series: [],
    };

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        if (!this.surveyEntities || !this.cardStats || !this.prop) {
            return;
        }
        this.options = {
            ...this.options,
            xAxis: this.getXAxis(this.cardStats, this.surveyEntities),
            series: this.getSeries(this.cardStats, this.prop),
        };
    }

    getXAxis(cardStats: CardStat[], surveyEntities: { [id: number]: Survey }) {
        return {
            type: 'category',
            data: cardStats.map(
                cardStat =>
                    surveyEntities[cardStat.survey].endTime.split('T')[0],
            ),
        };
    }

    getSeries(cardStats: CardStat[], prop: 'power' | 'generality') {
        return [20, 40, 60, 80].map((value, index) => {
            return {
                type: 'bar',
                name: propName[prop][value],
                data: cardStats.map(
                    cardStat =>
                        (cardStat.data[prop][index] /
                            cardStat.data.responseCount) *
                        100,
                ),
                tooltip: {
                    formatter: params => {
                        return `${
                            params.name
                        }<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${
                            params.color
                        }"></span>${params.seriesName}: ${Math.round(
                            params.data,
                        )}%`;
                    },
                },
            };
        });
    }
}
