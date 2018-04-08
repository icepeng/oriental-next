import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { UserActions, UserActionTypes } from '../../user/actions/user.actions';
import { SurveyResponse } from '../models/response.model';

export interface State extends EntityState<SurveyResponse> {
    selectedId: string | null;
}

export const adapter: EntityAdapter<SurveyResponse> = createEntityAdapter<
    SurveyResponse
>({
    selectId: (response: SurveyResponse) => response.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedId: null,
});

export function reducer(state = initialState, action: UserActions): State {
    switch (action.type) {
        case UserActionTypes.LoadSuccess: {
            return {
                ...adapter.addMany(action.payload.responses, state),
                selectedId: state.selectedId,
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedId;
