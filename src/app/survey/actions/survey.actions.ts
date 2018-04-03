import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { Survey } from '../models/survey.model';

export enum SurveyActionTypes {
    Load = '[Survey] Load',
    LoadSuccess = '[Survey] Load Success',
    LoadFailure = '[Survey] Load Failure',
}

export class Load implements Action {
    readonly type = SurveyActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = SurveyActionTypes.LoadSuccess;

    constructor(public payload: Survey[]) {}
}

export class LoadFailure implements Action {
    readonly type = SurveyActionTypes.LoadFailure;

    constructor(public payload: HttpErrorResponse) {}
}

export type SurveyActions = Load | LoadSuccess | LoadFailure;
