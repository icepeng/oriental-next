import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpAuth } from '../../core/services/http-auth.service';
import { User } from '../../user/models/user.model';
import { Archive } from '../models/archive.model';
import {
    CardResponse,
    ExpansionResponse,
    ResponseFromApi,
    SurveyResponse,
} from '../models/response.model';

@Injectable()
export class ResponseService {
    constructor(private http: HttpAuth) {}

    create(
        surveyId: number,
    ): Observable<{
        id: number;
    }> {
        return this.http
            .post<{ id: number }>(
                `${environment.apiAddress}/surveys/${surveyId}/responses`,
                {},
            )
            .pipe(map(data => data));
    }

    getOne({
        survey,
        id,
    }: {
        survey: number;
        id: number;
    }): Observable<{
        response: SurveyResponse;
        users: User[];
        archives: Archive[];
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
                        pid: x.id,
                        card: x.cardId,
                        power: x.power,
                        generality: x.generality,
                        description: x.description,
                        archives: x.archives.map(y => y.id),
                    }));
                    const expansionResponse = res.response.expansionResponse
                        ? {
                              ...res.response.expansionResponse,
                              id: response.id,
                              pid: res.response.expansionResponse.id,
                          }
                        : undefined;

                    const archivesFromApi = res.response.cardResponses
                        .map(x => x.archives)
                        .reduce((arr, x) => [...arr, ...x], []);
                    const archives = archivesFromApi.map(x => ({
                        id: x.id,
                        description: x.description,
                        cardResponse: x.cardResponseId,
                        user: x.userId,
                    }));
                    const users = [
                        res.response.user,
                        ...archivesFromApi.map(x => x.user),
                    ];
                    return {
                        response,
                        cardResponses,
                        expansionResponse,
                        users,
                        archives,
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
