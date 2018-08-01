import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Card } from '../../card/models/card.model';
import { CardStat } from '../../card/models/stat.model';
import { Survey } from '../../survey/models/survey.model';
import { Expansion } from '../models/expansion.model';
import { ExpansionResponseView } from '../models/response.model';
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
                                ...expansion.surveys
                                    .filter(survey => !!survey.expansionStat)
                                    .map(survey => ({
                                        ...survey.expansionStat,
                                        survey: survey.id,
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
                                        pid: cardStat.id,
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

    getRandomResponses(id: string): Observable<ExpansionResponseView[]> {
        return this.http
            .get<{ expansionResponses: any[] }>(
                `${environment.apiAddress}/expansions/${id}/responses`,
            )
            .pipe(
                map(data => {
                    return data.expansionResponses.map(x => ({
                        id: x.id,
                        battletag: x.response.user.battletag,
                        userId: x.response.user.id,
                        surveyId: x.response.surveyId,
                        responseId: x.response.id,
                        fun: x.fun,
                        balance: x.balance,
                        description: x.description,
                    }));
                }),
            );
    }
}
