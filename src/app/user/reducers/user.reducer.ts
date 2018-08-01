import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { AuthActionTypes, AuthActions } from '../../core/actions/auth.actions';
import {
    ArchiveActions,
    ArchiveActionTypes,
} from '../../survey/actions/archive.actions';
import {
    ResponseActionTypes,
    ResponseActions,
} from '../../survey/actions/response.actions';
import {
    SurveySubmitActionTypes,
    SurveySubmitActions,
} from '../../survey/actions/submit.actions';
import { UserActionTypes, UserActions } from '../actions/user.actions';
import { User } from '../models/user.model';

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
    action:
        | UserActions
        | AuthActions
        | ResponseActions
        | SurveySubmitActions
        | ArchiveActions,
): State {
    switch (action.type) {
        case UserActionTypes.LoadSuccess: {
            return {
                ...adapter.addMany(
                    [action.payload.user, ...action.payload.archiveUsers],
                    state,
                ),
                selectedId: state.selectedId,
                authedId: state.authedId,
            };
        }

        case ResponseActionTypes.LoadOneSuccess: {
            return {
                ...adapter.addMany(action.payload.users, state),
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

        case ArchiveActionTypes.SubmitSuccess: {
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
