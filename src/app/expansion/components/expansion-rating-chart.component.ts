import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-expansion-rating-chart',
    templateUrl: './expansion-rating-chart.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionRatingChartComponent implements OnInit {
    options = {
        xAxis: {
            type: 'category',
            data: ['2018/04/10', '2018/04/24', '2018/05/08', '2018/05/22'],
        },
        yAxis: {
            type: 'value',
            max: 5
        },
        legend: {},
        series: [
          {
              data: [3.5, 2.2, 2.4, 2.7],
              type: 'line',
              name: '밸런스'
          },
          {
              data: [2.4, 3.2, 3.1, 3.8],
              type: 'line',
              name: '재미'
          },
        ],
    };

    constructor() {}

    ngOnInit() {}
}
