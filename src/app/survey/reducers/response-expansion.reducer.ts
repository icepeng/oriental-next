import {
    EntityAdapter,
    EntityState,
    Update,
    createEntityAdapter,
} from '@ngrx/entity';
import { UserActionTypes, UserActions } from '../../user/actions/user.actions';
import {
    SubmitExpansionSuccess,
    SurveySubmitActionTypes,
    SurveySubmitActions,
} from '../actions/submit.actions';
import { ExpansionResponse } from '../models/response.model';
import {
    ResponseActionTypes,
    ResponseActions,
} from '../actions/response.actions';

export interface State extends EntityState<ExpansionResponse> {}

export const adapter: EntityAdapter<ExpansionResponse> = createEntityAdapter<
    ExpansionResponse
>({
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState();

function buildExpansionResponse(
    action: SubmitExpansionSuccess,
): Update<ExpansionResponse> {
    return {
        id: action.payload.response,
        changes: {
            ...action.payload.form,
            id: action.payload.response,
        },
    };
}

export function reducer(
    state = initialState,
    action: UserActions | SurveySubmitActions | ResponseActions,
): State {
    switch (action.type) {
        case UserActionTypes.LoadSuccess: {
            return {
                ...adapter.addMany(action.payload.expansionResponses, state),
            };
        }

        case ResponseActionTypes.LoadOneSuccess: {
            if (!action.payload.expansionResponse) {
                return;
            }
            return {
                ...adapter.addOne(action.payload.expansionResponse, state),
            };
        }

        case SurveySubmitActionTypes.SubmitExpansionSuccess: {
            return {
                ...adapter.upsertOne(buildExpansionResponse(action), state),
            };
        }

        default: {
            return state;
        }
    }
}
