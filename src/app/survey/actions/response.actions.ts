import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { User } from '../../user/models/user.model';
import {
    CardResponse,
    ExpansionResponse,
    SurveyResponse,
} from '../models/response.model';

export enum ResponseActionTypes {
    Select = '[Survey Response] Select',
    SelectCard = '[Survey Response] Select Card',
    LoadOne = '[Survey Response] Load One',
    LoadOneSuccess = '[Survey Response] Load One Success',
    LoadFailure = '[Survey Response] Load Failure',
    NavigateRandom = '[Survey Response] Navigate Random',
}

export class Select implements Action {
    readonly type = ResponseActionTypes.Select;

    constructor(public payload: number) {}
}

export class SelectCard implements Action {
    readonly type = ResponseActionTypes.SelectCard;

    constructor(public payload: string) {}
}

export class LoadOne implements Action {
    readonly type = ResponseActionTypes.LoadOne;

    constructor(public payload: { id: number; survey: number }) {}
}

export class LoadOneSuccess implements Action {
    readonly type = ResponseActionTypes.LoadOneSuccess;

    constructor(
        public payload: {
            response: SurveyResponse;
            cardResponses: CardResponse[];
            expansionResponse?: ExpansionResponse;
            user: User;
        },
    ) {}
}

export class LoadFailure implements Action {
    readonly type = ResponseActionTypes.LoadFailure;

    constructor(public payload: HttpErrorResponse) {}
}

export class NavigateRandom implements Action {
    readonly type = ResponseActionTypes.NavigateRandom;

    constructor(public payload: { survey: number }) {}
}

export type ResponseActions =
    | Select
    | SelectCard
    | LoadOne
    | LoadOneSuccess
    | LoadFailure
    | NavigateRandom;
