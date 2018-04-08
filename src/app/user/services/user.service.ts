import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { HttpAuth } from '../../core/services/http-auth.service';
import {
    SurveyResponse,
    CardResponse,
    ExpansionResponse,
} from '../../survey/models/response.model';
import { User, UserFromApi } from '../models/user.model';
import { environment } from 'environments/environment';

@Injectable()
export class UserService {
    constructor(private http: HttpAuth) {}

    getOne(
        id: string,
    ): Observable<{
        user: User;
        responses: SurveyResponse[];
        cardResponses: CardResponse[];
        expansionResponses: ExpansionResponse[];
    }> {
        return this.http
            .get<UserFromApi>(`${environment.apiAddress}/users/${id}`)
            .pipe(
                map(res => {
                    const user = {
                        id: res.user.id,
                        battletag: res.user.battletag,
                    };
                    const responses = res.user.responses.map(response => ({
                        id: response.id,
                        user: user.id,
                        survey: response.surveyId,
                        cardResponses: response.cardResponses.map(x => x.id),
                        expansionResponse: response.expansionResponse.id,
                    }));
                    const cardResponses = res.user.responses.reduce(
                        (arr, response) => [
                            ...arr,
                            ...response.cardResponses.map(x => ({
                                id: x.id,
                                card: x.cardId,
                                power: x.power,
                                generality: x.generality,
                                description: x.description,
                            })),
                        ],
                        [] as CardResponse[],
                    );
                    const expansionResponses = res.user.responses.reduce(
                        (arr, response) => [...arr, response.expansionResponse],
                        [] as ExpansionResponse[],
                    );
                    return {
                        user,
                        responses,
                        cardResponses,
                        expansionResponses,
                    };
                }),
            );
    }
}
