import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, filter, switchMap, take, tap, map } from 'rxjs/operators';
import * as ResponseAction from '../actions/response.actions';
import { SurveyResponse } from '../models/response.model';
import * as fromResponse from '../selectors/response.selectors';

@Injectable()
export class ResponseGuard implements CanActivate {
    constructor(private store: Store<any>) {}

    getFromStoreOrAPI({
        surveyId,
        responseId,
    }: {
        surveyId: number;
        responseId: number;
    }) {
        return this.store.select(fromResponse.getResponseEntities).pipe(
            map(responseEntities => responseEntities[responseId]),
            tap(response => {
                if (!response) {
                    this.store.dispatch(
                        new ResponseAction.LoadOne({
                            survey: surveyId,
                            id: responseId,
                        }),
                    );
                }
                console.log('ho')
            }),
            filter(response => !!response),
            take(1),
        );
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.getFromStoreOrAPI({
            surveyId: +route.paramMap.get('surveyId'),
            responseId: +route.paramMap.get('responseId'),
        }).pipe(switchMap(() => of(true)), catchError(() => of(false)));
    }
}
