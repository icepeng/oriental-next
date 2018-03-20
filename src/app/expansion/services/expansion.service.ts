import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

import { Card } from '../../card/models/card.model';
import { Expansion } from '../models/expansion.model';

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
                            name: 'test1',
                            class: 'MAGE',
                            cost: 1,
                        },
                        {
                            id: '2',
                            name: 'test2',
                            class: 'HUNTER',
                            cost: 2,
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
                    (arr, x) => [...arr, ...x.cards],
                    [],
                );
                return {
                    latest,
                    next,
                    expansions,
                    cards,
                };
            }),
        );
    }
}
