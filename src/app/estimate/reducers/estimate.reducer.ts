import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import {
    EstimateActions,
    EstimateActionTypes,
} from '../actions/estimate.actions';
import { Estimate } from '../models/estimate.model';

export interface State extends EntityState<Estimate> {
    selectedId: string | null;
}

export const adapter: EntityAdapter<Estimate> = createEntityAdapter<Estimate>({
    selectId: (estimate: Estimate) => estimate.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedId: null,
});

export function reducer(state = initialState, action: EstimateActions): State {
    switch (action.type) {
        case EstimateActionTypes.Select: {
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
