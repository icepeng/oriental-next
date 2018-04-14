import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CardStat } from '../../card/models/stat.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, combineLatest } from 'rxjs/operators';
import * as fromRoot from '../../reducers';

@Component({
    selector: 'app-survey-stat-cards',
    templateUrl: './survey-stat-cards.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyStatCardsComponent implements OnInit, OnChanges {
    @Input() cardStats: CardStat[];
    @Input() prop: 'power' | 'generality';

    cardStats$ = new BehaviorSubject<CardStat[]>(null);
    prop$ = new BehaviorSubject<'power' | 'generality'>(null);
    options$: Observable<any>;

    constructor(private store: Store<any>) {}

    ngOnInit() {
        this.options$ = this.cardStats$.pipe(
            combineLatest(this.prop$, this.store.select(fromRoot.getLocalCards)),
            map(([cardStats, prop, localCards]) => {
                const data = this.getData(cardStats, prop);
                console.log(data);
                return {
                    tooltip: {},
                    color: [
                        '#0F1E82',
                        '#6870C4',
                        '#00BFA9',
                        '#6FEAD9',
                        '#80746D',
                        '#BBB3A9',
                    ],
                    grid: {
                        bottom: 144,
                    },
                    xAxis: {
                        type: 'category',
                        data: data.map(x => localCards[x.card].name),
                        axisLabel: {
                            rotate: -75,
                        },
                    },
                    yAxis: {
                        max: 100,
                        min: -100,
                        axisLabel: {
                            formatter: '{value}%',
                        },
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            start: 0,
                            end: 10,
                        },
                        {
                            type: 'inside',
                            realtime: true,
                            start: 0,
                            end: 10,
                        },
                    ],
                    series: [
                        {
                            type: 'bar',
                            name: '60',
                            data: data.map(x => x.values[0]),
                            stack: 'one',
                        },
                        {
                            type: 'bar',
                            name: '80',
                            data: data.map(x => x.values[1]),
                            stack: 'one',
                        },
                        {
                            type: 'bar',
                            name: '40',
                            data: data.map(x => x.values[2]),
                            stack: 'one',
                        },
                        {
                            type: 'bar',
                            name: '20',
                            data: data.map(x => x.values[3]),
                            stack: 'one',
                        },
                    ],
                };
            }),
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.cardStats.currentValue) {
            this.cardStats$.next(this.cardStats);
        }
        if (changes.prop.currentValue) {
            this.prop$.next(this.prop);
        }
    }

    getData(cardStats: CardStat[], prop: 'power' | 'generality') {
        return cardStats
            .map(cardStat => {
                const total = cardStat.data[prop].reduce(
                    (sum, x) => sum + x,
                    0,
                );
                const values = [
                    Math.floor(cardStat.data[prop][2] / total * 100),
                    Math.floor(cardStat.data[prop][3] / total * 100),
                    -Math.floor(cardStat.data[prop][1] / total * 100),
                    -Math.floor(cardStat.data[prop][0] / total * 100),
                ];
                return {
                    card: cardStat.card,
                    values,
                };
            })
            .sort(
                (a, b) => b.values[0] + b.values[1] - a.values[0] - a.values[1],
            );
    }
}
