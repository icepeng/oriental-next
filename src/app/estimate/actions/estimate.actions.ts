import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
    Estimate,
    CardEstimate,
    ExpansionEstimate,
} from '../models/estimate.model';
import { User } from '../../user/models/user.model';
import { Survey } from '../../survey/models/survey.model';

export enum EstimateActionTypes {
    Load = '[Estimate] Load',
    LoadSuccess = '[Estimate] Load Success',
    LoadFailure = '[Estimate] Load Failure',
    Select = '[Estimate] Select',
}

export class Load implements Action {
    readonly type = EstimateActionTypes.Load;

    constructor(
        public payload: {
            filter: {
                expansion?: string;
                username?: string;
            };
        },
    ) {}
}

export class LoadSuccess implements Action {
    readonly type = EstimateActionTypes.LoadSuccess;

    constructor(
        public payload: {
            estimates: Estimate[];
            users: User[];
            surveys: Survey[];
            cardEstimates?: CardEstimate[];
            expansionEstimates?: ExpansionEstimate[];
        },
    ) {}
}

export class LoadFailure implements Action {
    readonly type = EstimateActionTypes.LoadFailure;

    constructor(public payload: HttpErrorResponse) {}
}

export class Select implements Action {
    readonly type = EstimateActionTypes.Select;

    constructor(public payload: string) {}
}

export type EstimateActions = Select;
