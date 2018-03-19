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

export const getLatestExpansionId = createSelector(
    getExpansionEntitiesState,
    fromExpansion.getLatestId,
);

export const getNextExpansionId = createSelector(
    getExpansionEntitiesState,
    fromExpansion.getNextId,
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

export const getLatestExpansion = createSelector(
    getExpansionEntities,
    getLatestExpansionId,
    (entities, latestId) => {
        return latestId && entities[latestId];
    },
);

export const getNextExpansion = createSelector(
    getExpansionEntities,
    getNextExpansionId,
    (entities, nextId) => {
        return nextId && entities[nextId];
    },
);
