import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { AuthActions, AuthActionTypes } from '../../core/actions/auth.actions';
import { UserActions, UserActionTypes } from '../actions/user.actions';
import { User } from '../models/user.model';
import {
    ResponseActions,
    ResponseActionTypes,
} from '../../survey/actions/response.actions';
import {
    SurveySubmitActions,
    SurveySubmitActionTypes,
} from '../../survey/actions/submit.actions';

export interface State extends EntityState<User> {
    authedId: string | null;
    selectedId: string | null;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: (user: User) => user.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    authedId: null,
    selectedId: null,
});

export function reducer(
    state = initialState,
    action: UserActions | AuthActions | ResponseActions | SurveySubmitActions,
): State {
    switch (action.type) {
        case UserActionTypes.LoadSuccess: {
            return {
                ...adapter.addOne(action.payload.user, state),
                selectedId: state.selectedId,
                authedId: state.authedId,
            };
        }

        case ResponseActionTypes.LoadOneSuccess: {
            return {
                ...adapter.addOne(action.payload.user, state),
                selectedId: state.selectedId,
                authedId: state.authedId,
            };
        }

        case SurveySubmitActionTypes.SubmitCardSuccess: {
            return {
                ...adapter.updateOne(
                    {
                        id: action.payload.user,
                        changes: { point: action.payload.point },
                    },
                    state,
                ),
                selectedId: state.selectedId,
                authedId: state.authedId,
            };
        }

        case UserActionTypes.Select: {
            return {
                ...state,
                selectedId: action.payload,
            };
        }

        case AuthActionTypes.LoginSuccess: {
            return {
                ...state,
                authedId: action.payload.decoded.id,
            };
        }

        case AuthActionTypes.Logout: {
            return {
                ...state,
                authedId: null,
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedId;

export const getAuthedId = (state: State) => state.authedId;
