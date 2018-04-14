import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromStat from './expansion-stat.reducer';
import * as fromExpansion from './expansion.reducer';
import * as fromSurvey from '../../survey/selectors/survey.selectors';

export interface ExpansionState {
    expansion: fromExpansion.State;
    stat: fromStat.State;
}

export interface State extends fromRoot.State {
    expansion: ExpansionState;
}

export const reducers: ActionReducerMap<ExpansionState> = {
    expansion: fromExpansion.reducer,
    stat: fromStat.reducer,
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

// Stat
export const getExpansionStatState = createSelector(
    getExpansionState,
    state => state.stat,
);

export const {
    selectIds: getExpansionStatIds,
    selectEntities: getExpansionStatEntities,
    selectAll: getAllExpansionStats,
    selectTotal: getTotalExpansionStats,
} = fromStat.adapter.getSelectors(getExpansionStatState);

export const getSelectedExpansionStats = createSelector(
    getSelectedExpansionId,
    getAllExpansionStats,
    fromSurvey.getSurveyEntities,
    (expansionId, expansionStats, surveyEntities) =>
        expansionStats.filter(
            x => surveyEntities[x.id].expansion === expansionId,
        ),
);
