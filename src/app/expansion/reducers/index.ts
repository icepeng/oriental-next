import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromExpansion from './expansion.reducer';

export interface ExpansionState {
    expansion: fromExpansion.State;
}

export interface State extends fromRoot.State {
    expansion: ExpansionState;
}

export const reducers: ActionReducerMap<ExpansionState> = {
    expansion: fromExpansion.reducer,
};

export const getExpansionState = createFeatureSelector<ExpansionState>(
    'expansion',
);

export const getExpansionEntitiesState = createSelector(
    getExpansionState,
    state => state.expansion,
);

export const getSelectedExpansionId = createSelector(
    getExpansionEntitiesState,
    fromExpansion.getSelectedId,
);

export const {
    selectIds: getExpansionIds,
    selectEntities: getExpansionEntities,
    selectAll: getAllExpansions,
    selectTotal: getTotalExpansions,
} = fromExpansion.adapter.getSelectors(getExpansionEntitiesState);

export const getSelectedExpansion = createSelector(
    getExpansionEntities,
    getSelectedExpansionId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    },
);
