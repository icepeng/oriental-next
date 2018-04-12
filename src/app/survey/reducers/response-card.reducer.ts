import {
    EntityAdapter,
    EntityState,
    Update,
    createEntityAdapter,
} from '@ngrx/entity';
import { UserActionTypes, UserActions } from '../../user/actions/user.actions';
import {
    ResponseActionTypes,
    ResponseActions,
} from '../actions/response.actions';
import {
    SubmitCardSuccess,
    SurveySubmitActionTypes,
    SurveySubmitActions,
} from '../actions/submit.actions';
import { CardResponse } from '../models/response.model';

export interface State extends EntityState<CardResponse> {
    selectedId: string | null;
}

export const adapter: EntityAdapter<CardResponse> = createEntityAdapter<
    CardResponse
>({
    selectId: (cardResponse: CardResponse) => cardResponse.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedId: null,
});

function buildCardResponse(action: SubmitCardSuccess): Update<CardResponse> {
    const id = `${action.payload.form.card}-${action.payload.response}`;
    return {
        id,
        changes: {
            id,
            ...action.payload.form,
        },
    };
}

export function reducer(
    state = initialState,
    action: UserActions | SurveySubmitActions | ResponseActions,
): State {
    switch (action.type) {
        case ResponseActionTypes.SelectCard: {
            return {
                ...state,
                selectedId: action.payload,
            };
        }

        case ResponseActionTypes.LoadOneSuccess: {
            return {
                ...adapter.addMany(action.payload.cardResponses, state),
            };
        }

        case UserActionTypes.LoadSuccess: {
            return {
                ...adapter.addMany(action.payload.cardResponses, state),
                selectedId: state.selectedId,
            };
        }

        case SurveySubmitActionTypes.SubmitCardSuccess: {
            return {
                ...adapter.upsertOne(buildCardResponse(action), state),
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedId;
