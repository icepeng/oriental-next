import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpAuth } from '../../core/services/http-auth.service';
import { ArchiveView } from '../models/archive.model';

@Injectable()
export class ArchiveService {
    constructor(private http: HttpAuth) {}

    submit({
        description,
        cardResponse,
    }: {
        description: string;
        cardResponse: number;
    }): Observable<{ id: number; point: number }> {
        return this.http.post<{ id: number; point: number }>(
            `${environment.apiAddress}/archives`,
            {
                description,
                cardResponseId: cardResponse,
            },
        );
    }

    getRecent(): Observable<ArchiveView[]> {
        return this.http
            .get<{ archives: any }>(`${environment.apiAddress}/archives/recent`)
            .pipe(
                map(res => {
                    return res.archives.map(x => ({
                        id: x.id,
                        description: x.description,
                        userId: x.userId,
                        battletag: x.user.battletag,
                        cardResponse: {
                            battletag: x.cardResponse.response.user.battletag,
                            responseId: x.cardResponse.response.id,
                            surveyId: x.cardResponse.response.surveyId,
                            userId: x.cardResponse.response.user.id,
                            cardId: x.cardResponse.cardId,
                            power: x.cardResponse.power,
                            generality: x.cardResponse.generality,
                            description: x.cardResponse.description,
                        },
                    }));
                }),
            );
    }
}
