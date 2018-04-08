import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { SurveyForm } from '../models/survey-form.model';

export enum SurveySubmitActionTypes {
    Add = '[Survey Submit] Add',
    Edit = '[Survey Submit] Edit',
    AddSuccess = '[Survey Submit] Add Success',
    EditSuccess = '[Survey Submit] Edit Success',
    Failure = '[Survey Submit] Failure',
}

export class Add implements Action {
    readonly type = SurveySubmitActionTypes.Add;

    constructor(public payload: { survey: number; form: SurveyForm }) {}
}

export class AddSuccess implements Action {
    readonly type = SurveySubmitActionTypes.AddSuccess;

    constructor(
        public payload: { id: number; survey: number; form: SurveyForm },
    ) {}
}

export class Edit implements Action {
    readonly type = SurveySubmitActionTypes.Edit;

    constructor(
        public payload: { id: number; survey: number; form: SurveyForm },
    ) {}
}

export class EditSuccess implements Action {
    readonly type = SurveySubmitActionTypes.EditSuccess;

    constructor(
        public payload: { id: number; survey: number; form: SurveyForm },
    ) {}
}

export class Failure implements Action {
    readonly type = SurveySubmitActionTypes.Failure;

    constructor(public payload: HttpErrorResponse) {}
}

export type SurveySubmitActions =
    | Add
    | AddSuccess
    | Edit
    | EditSuccess
    | Failure;
