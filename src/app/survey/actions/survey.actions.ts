import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { Survey } from '../models/survey.model';

export enum SurveyActionTypes {
    Select = '[Survey] Select',
}

export class Select implements Action {
    readonly type = SurveyActionTypes.Select;

    constructor(public payload: string) {}
}

export type SurveyActions = Select;
