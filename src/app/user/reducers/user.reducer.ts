import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { UserActions, UserActionTypes } from '../actions/user.actions';
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

export function reducer(state = initialState, action: UserActions): State {
    switch (action.type) {
        case UserActionTypes.LoadSuccess: {
            return {
                ...adapter.addOne(action.payload, state),
                selectedId: state.selectedId,
            };
        }

        case UserActionTypes.Select: {
            return {
                ...state,
                selectedId: action.payload,
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedId;

export const getAuthedId = (state: State) => state.authedId;
