import { Action } from '@ngrx/store';

export enum EstimateActionTypes {
    Select = '[Estimate] Select',
}

export class Select implements Action {
    readonly type = EstimateActionTypes.Select;

    constructor(public payload: string) {}
}

export type EstimateActions = Select;
