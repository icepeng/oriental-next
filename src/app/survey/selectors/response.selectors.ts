import { createSelector } from '@ngrx/store';
import { getSurveyState } from '../reducers';
import * as fromArchive from '../reducers/archive.reducer';
import * as fromCardResponse from '../reducers/response-card.reducer';
import * as fromExpansionResponse from '../reducers/response-expansion.reducer';
import * as fromResponse from '../reducers/response.reducer';
import * as fromUser from '../../user/reducers';

export const getResponseState = createSelector(
    getSurveyState,
    state => state.response,
);

export const {
    selectIds: getResponseIds,
    selectEntities: getResponseEntities,
    selectAll: getAllResponses,
    selectTotal: getTotalResponses,
} = fromResponse.adapter.getSelectors(getResponseState);

export const getSelectedResponseId = createSelector(
    getResponseState,
    state => state.selectedId,
);

export const getSelectedResponse = createSelector(
    getResponseEntities,
    getSelectedResponseId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    },
);

export const getCardResponseState = createSelector(
    getSurveyState,
    state => state.cardResponse,
);

export const {
    selectIds: getCardResponseIds,
    selectEntities: getCardResponseEntities,
    selectAll: getAllCardResponses,
    selectTotal: getTotalCardResponses,
} = fromCardResponse.adapter.getSelectors(getCardResponseState);

export const getSelectedCardResponseId = createSelector(
    getCardResponseState,
    state => state.selectedId,
);

export const getSelectedCardResponse = createSelector(
    getCardResponseEntities,
    getSelectedCardResponseId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    },
);

export const getExpansionResponseState = createSelector(
    getSurveyState,
    state => state.expansionResponse,
);

export const {
    selectIds: getExpansionResponseIds,
    selectEntities: getExpansionResponseEntities,
    selectAll: getAllExpansionResponses,
    selectTotal: getTotalExpansionResponses,
} = fromExpansionResponse.adapter.getSelectors(getExpansionResponseState);

export const getSelectedExpansionResponse = createSelector(
    getExpansionResponseEntities,
    getSelectedResponseId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    },
);

export const getSelectedResponseCardResponses = createSelector(
    getSelectedResponse,
    getCardResponseEntities,
    (response, entities) => {
        return response ? response.cardResponses.map(id => entities[id]) : [];
    },
);

export const getArchiveState = createSelector(
    getSurveyState,
    state => state.archive,
);

export const {
    selectIds: getArchiveIds,
    selectEntities: getArchiveEntities,
    selectAll: getAllArchives,
    selectTotal: getTotalArchives,
} = fromArchive.adapter.getSelectors(getArchiveState);

export const getSelectedCardResponseArchives = createSelector(
    getSelectedCardResponse,
    getArchiveEntities,
    fromUser.getUserEntities,
    (cardResponse, archiveEntities, userEntities) =>
        cardResponse
            ? cardResponse.archives.map(id => {
                  const archive = archiveEntities[id];
                  return {
                      ...archive,
                      battletag: userEntities[archive.user].battletag,
                  };
              })
            : [],
);
