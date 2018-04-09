import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { UserActionTypes, UserActions } from '../../user/actions/user.actions';
import {
    AddSuccess,
    EditSuccess,
    SurveySubmitActionTypes,
    SurveySubmitActions,
} from '../actions/submit.actions';
import { ExpansionResponse } from '../models/response.model';

export interface State extends EntityState<ExpansionResponse> {}

export const adapter: EntityAdapter<ExpansionResponse> = createEntityAdapter<
    ExpansionResponse
>({
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState();

function buildExpansionResponse(
    action: AddSuccess | EditSuccess,
): ExpansionResponse {
    return {
        ...action.payload.form.expansionResponse,
        id: action.payload.id,
    };
}

export function reducer(
    state = initialState,
    action: UserActions | SurveySubmitActions,
): State {
    switch (action.type) {
        case UserActionTypes.LoadSuccess: {
            return {
                ...adapter.addMany(action.payload.expansionResponses, state),
            };
        }

        case SurveySubmitActionTypes.AddSuccess: {
            return {
                ...adapter.addOne(buildExpansionResponse(action), state),
            };
        }

        case SurveySubmitActionTypes.EditSuccess: {
            return {
                ...adapter.updateOne(
                    {
                        id: action.payload.id,
                        changes: buildExpansionResponse(action),
                    },
                    state,
                ),
            };
        }

        default: {
            return state;
        }
    }
}
