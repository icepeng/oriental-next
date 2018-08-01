import { Action } from '@ngrx/store';

export enum ArchiveActionTypes {
    Open = '[Archive] Open',
    Close = '[Archive] Close',
    Submit = '[Archive] Submit',
    SubmitSuccess = '[Archive] Submit Success',
    SubmitFailure = '[Archive] Submit Failure',
}

export class Open implements Action {
    readonly type = ArchiveActionTypes.Open;
}

export class Close implements Action {
    readonly type = ArchiveActionTypes.Close;
}

export class Submit implements Action {
    readonly type = ArchiveActionTypes.Submit;

    constructor(
        public payload: {
            description: string;
            cardResponse: number;
        },
    ) {}
}

export class SubmitSuccess implements Action {
    readonly type = ArchiveActionTypes.SubmitSuccess;

    constructor(
        public payload: {
            id: number;
            user: string;
            description: string;
            cardResponse: number;
            point: number;
        },
    ) {}
}

export class SubmitFailure implements Action {
    readonly type = ArchiveActionTypes.SubmitFailure;

    constructor(public payload: any) {}
}

export type ArchiveActions =
    | Open
    | Close
    | Submit
    | SubmitSuccess
    | SubmitFailure;
