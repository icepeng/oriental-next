import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { Survey } from '../models/survey.model';

export enum ResponseActionTypes {
    Select = '[Survey Response] Select',
    SelectCard = '[Survey Response] Select Card',
}

export class Select implements Action {
    readonly type = ResponseActionTypes.Select;

    constructor(public payload: number) {}
}

export class SelectCard implements Action {
    readonly type = ResponseActionTypes.SelectCard;

    constructor(public payload: string) {}
}

export type ResponseActions = Select | SelectCard;
