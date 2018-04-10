import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpAuth } from '../../core/services/http-auth.service';
import {
    SurveyCardForm,
    SurveyExpansionForm,
} from '../models/survey-form.model';

@Injectable()
export class SurveyService {
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

    saveCard({
        responseId,
        surveyId,
        form,
    }: {
        responseId: number;
        surveyId: number;
        form: SurveyCardForm;
    }): Observable<{}> {
        return this.http.post<{}>(
            `${
                environment.apiAddress
            }/surveys/${surveyId}/responses/${responseId}/card-responses`,
            form,
        );
    }

    saveExpansion({
        responseId,
        surveyId,
        form,
    }: {
        responseId: number;
        surveyId: number;
        form: SurveyExpansionForm;
    }): Observable<{}> {
        return this.http.post<{}>(
            `${
                environment.apiAddress
            }/surveys/${surveyId}/responses/${responseId}/expansion-response`,
            form,
        );
    }
}
