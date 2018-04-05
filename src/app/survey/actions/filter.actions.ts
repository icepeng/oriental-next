import { Action } from '@ngrx/store';

import { SurveyCardFilter } from '../models/filter.model';

export enum FilterActionTypes {
    Set = '[Survey Card Filter] Set',
    Reset = '[Survey Card Filter] Reset',
}

export class SetFilter implements Action {
    readonly type = FilterActionTypes.Set;

    constructor(public payload: SurveyCardFilter) {}
}

export class ResetFilter implements Action {
    readonly type = FilterActionTypes.Reset;
}

export type FilterActions = SetFilter | ResetFilter;
