import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-card-average-chart',
    templateUrl: './card-average-chart.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardAverageChartComponent implements OnInit {
    options = {
        xAxis: {
            type: 'category',
            data: ['2018/04/10', '2018/04/24', '2018/05/08', '2018/05/22'],
        },
        yAxis: {
            type: 'value',
            max: 5,
        },
        legend: {},
        series: [
            {
                data: [2.2, 4.2, 3.8, 4.1],
                type: 'line',
                name: '카드 파워',
            },
            {
                data: [2.1, 2.8, 3.1, 3.2],
                type: 'line',
                name: '범용성',
            },
        ],
    };

    constructor() {}

    ngOnInit() {}
}
