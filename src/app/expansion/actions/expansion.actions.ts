import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Card } from '../../card/models/card.model';
import { CardStat } from '../../card/models/stat.model';
import { Survey } from '../../survey/models/survey.model';
import { Expansion } from '../models/expansion.model';
import { ExpansionStat } from '../models/stat.model';

export enum ExpansionActionTypes {
    Load = '[Expansion] Load',
    LoadSuccess = '[Expansion] Load Success',
    LoadFailure = '[Expansion] Load Failure',
    Select = '[Expansion] Select',
}

export class Load implements Action {
    readonly type = ExpansionActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = ExpansionActionTypes.LoadSuccess;

    constructor(
        public payload: {
            expansions: Expansion[];
            cards: Card[];
            surveys: Survey[];
            cardStats: CardStat[];
            expansionStats: ExpansionStat[];
        },
    ) {}
}

export class LoadFailure implements Action {
    readonly type = ExpansionActionTypes.LoadFailure;

    constructor(public payload: HttpErrorResponse) {}
}

export class Select implements Action {
    readonly type = ExpansionActionTypes.Select;

    constructor(public payload: string) {}
}

export type ExpansionActions = Load | LoadSuccess | LoadFailure | Select;
