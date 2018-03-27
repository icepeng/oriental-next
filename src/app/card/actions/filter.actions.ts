import { Action } from '@ngrx/store';

import { CardFilter } from '../models/filter.model';

export enum FilterActionTypes {
    Set = '[Card Filter] Set',
    Reset = '[Card Filter] Reset',
    ExpandLimit = '[Card Filter] Expand Limit',
}

export class SetFilter implements Action {
    readonly type = FilterActionTypes.Set;

    constructor(public payload: CardFilter) {}
}

export class ResetFilter implements Action {
    readonly type = FilterActionTypes.Reset;
}

export class ExpandLimit implements Action {
    readonly type = FilterActionTypes.ExpandLimit;
}

export type FilterActions = SetFilter | ResetFilter | ExpandLimit;
