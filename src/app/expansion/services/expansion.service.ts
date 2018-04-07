import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

import { Card } from '../../card/models/card.model';
import { Expansion } from '../models/expansion.model';
import { Survey } from '../../survey/models/survey.model';

@Injectable()
export class ExpansionService {
    constructor() {}

    private mockApi() {
        return of({
            latest: null,
            next: 'the-witchwood',
            expansions: [
                {
                    code: 'the-witchwood',
                    releaseDate: '2018-04-10',
                    cards: [
                        {
                            id: '1',
                            class: 'Druid',
                            cost: 2,
                            rarity: 'Common',
                        },
                        {
                            id: '2',
                            class: 'Druid',
                            cost: 4,
                            rarity: 'Rare',
                        },
                    ],
                    surveys: [
                        {
                            id: '1',
                            startTime: '2018-04-05T14:01:12.012Z',
                            endTime: null,
                            isPreRelease: true,
                            status: 'ongoing',
                        },
                    ],
                },
            ],
        });
    }

    getAll(): Observable<{
        latest: string;
        next: string;
        expansions: Expansion[];
        cards: Card[];
        surveys: Survey[];
    }> {
        return this.mockApi().pipe(
            map(data => {
                const latest = data.latest;
                const next = data.next;
                const expansions = data.expansions.map(expansion => ({
                    ...expansion,
                    cards: expansion.cards.map(x => x.id),
                }));
                const cards = data.expansions.reduce(
                    (arr, x) => [
                        ...arr,
                        ...x.cards.map(y => ({ ...y, expansion: x.code })),
                    ],
                    [],
                );
                const surveys = data.expansions.reduce(
                    (arr, x) => [
                        ...arr,
                        ...x.surveys.map(y => ({ ...y, expansion: x.code })),
                    ],
                    [],
                );
                return {
                    latest,
                    next,
                    expansions,
                    cards,
                    surveys,
                };
            }),
        );
    }
}
