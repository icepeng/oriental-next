import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Card } from '../../card/models/card.model';
import { CardStat } from '../../card/models/stat.model';
import { Survey } from '../../survey/models/survey.model';
import { Expansion } from '../models/expansion.model';
import { ExpansionStat } from '../models/stat.model';

@Injectable()
export class ExpansionService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<{
        expansions: Expansion[];
        cards: Card[];
        surveys: Survey[];
        expansionStats: ExpansionStat[];
        cardStats: CardStat[];
    }> {
        return this.http
            .get<{ expansions: any[] }>(`${environment.apiAddress}/expansions`)
            .pipe(
                map(data => {
                    const expansions = data.expansions.map(expansion => ({
                        ...expansion,
                        cards: expansion.cards.map(card => card.id),
                    }));
                    const cards = data.expansions.reduce(
                        (arr, expansion) => [
                            ...arr,
                            ...expansion.cards.map(card => ({
                                ...card,
                                expansion: expansion.code,
                            })),
                        ],
                        [],
                    );
                    const surveys = data.expansions.reduce(
                        (arr, expansion) => [
                            ...arr,
                            ...expansion.surveys.map(survey => ({
                                ...survey,
                                expansion: expansion.code,
                                expansionStat: survey.expansionStat
                                    ? survey.id
                                    : null,
                                cardStats: survey.cardStats.map(
                                    cardStat =>
                                        `${cardStat.cardId}-${survey.id}`,
                                ),
                            })),
                        ],
                        [],
                    );
                    const expansionStats = data.expansions
                        .reduce(
                            (arr, expansion) => [
                                ...arr,
                                ...expansion.surveys.map(survey => ({
                                    ...survey.expansionStat,
                                    id: survey.id,
                                })),
                            ],
                            [],
                        )
                        .filter(x => !!x);
                    const cardStats = data.expansions.reduce(
                        (arr, expansion) => [
                            ...arr,
                            ...expansion.surveys.reduce(
                                (arr2, survey) => [
                                    ...arr2,
                                    ...survey.cardStats.map(cardStat => ({
                                        id: `${cardStat.cardId}-${survey.id}`,
                                        card: cardStat.cardId,
                                        survey: survey.id,
                                        data: cardStat.data,
                                    })),
                                ],
                                [],
                            ),
                        ],
                        [],
                    );
                    return {
                        expansions,
                        cards,
                        surveys,
                        expansionStats,
                        cardStats,
                    };
                }),
            );
    }
}
