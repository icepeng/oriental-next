import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

import { Card } from '../../card/models/card.model';
import { Expansion } from '../models/expansion.model';
import { Survey } from '../../survey/models/survey.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class ExpansionService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<{
        expansions: Expansion[];
        cards: Card[];
        surveys: Survey[];
    }> {
        return this.http
            .get<{
                expansions: {
                    code: string;
                    cards: Card[];
                    surveys: Survey[];
                }[];
            }>(`${environment.apiAddress}/expansions`)
            .pipe(
                map(data => {
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
                            ...x.surveys.map(y => ({
                                ...y,
                                expansion: x.code,
                            })),
                        ],
                        [],
                    );
                    return {
                        expansions,
                        cards,
                        surveys,
                    };
                }),
            );
    }
}
