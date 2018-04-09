import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpAuth } from '../../core/services/http-auth.service';
import {
    CardResponse,
    ExpansionResponse,
    SurveyResponse,
    ResponseFromApi,
} from '../models/response.model';
import { SurveyForm } from '../models/survey-form.model';

@Injectable()
export class SurveyService {
    constructor(private http: HttpAuth) {}

    add(
        surveyId: number,
        form: SurveyForm,
    ): Observable<{
        id: number;
        user: string;
    }> {
        return this.http
            .post<{ id: number; user: string }>(
                `${environment.apiAddress}/surveys/${surveyId}/responses`,
                form,
            )
            .pipe(map(data => data));
    }

    edit(
        id: number,
        surveyId: number,
        form: SurveyForm,
    ): Observable<{ user: string }> {
        return this.http.put<{ user: string }>(
            `${environment.apiAddress}/surveys/${surveyId}/responses/${id}`,
            form,
        );
    }
}
