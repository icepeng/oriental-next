import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { SurveyForm } from '../models/survey-form.model';
import { HttpAuth } from '../../core/services/http-auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class SurveyService {
    constructor(private http: HttpAuth) {}

    add(
        surveyId: number,
        form: SurveyForm,
    ): Observable<{
        id: number;
    }> {
        return this.http
            .post<{ id: number }>(
                `${environment.apiAddress}/surveys/${surveyId}/responses`,
                form,
            )
            .pipe(map(data => data));
    }

    edit(id: number, surveyId: number, form: SurveyForm): Observable<{}> {
        return this.http.put(
            `${environment.apiAddress}/surveys/${surveyId}/responses/${id}`,
            form,
        );
    }
}
