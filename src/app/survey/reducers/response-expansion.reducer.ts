import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { UserActions, UserActionTypes } from '../../user/actions/user.actions';
import { ExpansionResponse } from '../models/response.model';

export interface State extends EntityState<ExpansionResponse> {}

export const adapter: EntityAdapter<ExpansionResponse> = createEntityAdapter<
    ExpansionResponse
>({
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: UserActions): State {
    switch (action.type) {
        case UserActionTypes.LoadSuccess: {
            return {
                ...adapter.addMany(action.payload.expansionResponses, state),
            };
        }

        default: {
            return state;
        }
    }
}
