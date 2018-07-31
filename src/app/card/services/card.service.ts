import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { CardResponseView } from '../models/response.model';

@Injectable()
export class CardService {
    constructor(private http: HttpClient) {}

    getRandomResponses(id: string): Observable<CardResponseView[]> {
        return this.http
            .get<{ cardResponses: any[] }>(
                `${environment.apiAddress}/cards/${id}/responses`,
            )
            .pipe(
                map(data => {
                    return data.cardResponses.map(x => ({
                        id: x.id,
                        battletag: x.response.user.battletag,
                        userId: x.response.user.id,
                        power: x.power,
                        generality: x.generality,
                        description: x.description,
                    }));
                }),
            );
    }
}
