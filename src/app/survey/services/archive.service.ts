import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpAuth } from '../../core/services/http-auth.service';

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
}
