import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpAuth } from '../../core/services/http-auth.service';
import {
    SurveyCardForm,
    SurveyExpansionForm,
} from '../models/survey-form.model';
import {
    SurveyResponse,
    CardResponse,
    ExpansionResponse,
    ResponseFromApi,
} from '../models/response.model';
import { User } from '../../user/models/user.model';

@Injectable()
export class ResponseService {
    constructor(private http: HttpAuth) {}

    getOne({
        survey,
        id,
    }: {
        survey: number;
        id: number;
    }): Observable<{
        response: SurveyResponse;
        user: User;
        cardResponses: CardResponse[];
        expansionResponse?: ExpansionResponse;
    }> {
        return this.http
            .get<{ response: ResponseFromApi & { user: User } }>(
                `${environment.apiAddress}/surveys/${survey}/responses/${id}`,
            )
            .pipe(
                map(res => {
                    const response = {
                        id: res.response.id,
                        user: res.response.user.id,
                        survey: res.response.surveyId,
                        cardResponses: res.response.cardResponses.map(
                            x => `${x.cardId}-${res.response.id}`,
                        ),
                        expansionResponse: res.response.expansionResponse
                            ? res.response.id
                            : null,
                    };
                    const cardResponses = res.response.cardResponses.map(x => ({
                        id: `${x.cardId}-${response.id}`,
                        card: x.cardId,
                        power: x.power,
                        generality: x.generality,
                        description: x.description,
                    }));
                    const expansionResponse = res.response.expansionResponse
                        ? {
                              ...res.response.expansionResponse,
                              id: response.id,
                          }
                        : undefined;
                    const user = res.response.user;
                    return {
                        response,
                        cardResponses,
                        expansionResponse,
                        user,
                    };
                }),
            );
    }

    getRandomId(surveyId: number) {
        return this.http
            .get<{ response: { id: number } }>(
                `${
                    environment.apiAddress
                }/surveys/${surveyId}/responses/random`,
            )
            .pipe(map(data => data.response.id));
    }
}
