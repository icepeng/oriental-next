import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { UserActions, UserActionTypes } from '../../user/actions/user.actions';
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

export function reducer(state = initialState, action: UserActions): State {
    switch (action.type) {
        case UserActionTypes.LoadSuccess: {
            return {
                ...adapter.addMany(action.payload.cardResponses, state),
                selectedId: state.selectedId,
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedId;
