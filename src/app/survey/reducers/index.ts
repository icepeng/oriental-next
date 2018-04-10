import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';
import { Card } from '../../card/models/card.model';
import * as fromCard from '../../card/reducers';
import * as fromExpansion from '../../expansion/reducers';
import * as fromRoot from '../../reducers';
import { SurveyCardFilter } from '../models/filter.model';
import { SurveyCardForm } from '../models/survey-form.model';
import * as fromFilter from './filter.reducer';
import * as fromCardResponse from './response-card.reducer';
import * as fromExpansionResponse from './response-expansion.reducer';
import * as fromResponse from './response.reducer';
import * as fromForm from './survey-form.reducer';
import * as fromSurvey from './survey.reducer';
import * as fromPrepare from './survey-prepare.reducer';

export interface SurveyState {
    survey: fromSurvey.State;
    filter: fromFilter.State;
    form: fromForm.State;
    response: fromResponse.State;
    cardResponse: fromCardResponse.State;
    expansionResponse: fromExpansionResponse.State;
    prepare: fromPrepare.State;
}

export interface State extends fromRoot.State {
    survey: SurveyState;
}

export const reducers: ActionReducerMap<SurveyState> = {
    survey: fromSurvey.reducer,
    filter: fromFilter.reducer,
    form: fromForm.reducer,
    response: fromResponse.reducer,
    cardResponse: fromCardResponse.reducer,
    expansionResponse: fromExpansionResponse.reducer,
    prepare: fromPrepare.reducer,
};

export const getSurveyState = createFeatureSelector<SurveyState>('survey');

export const getSurveyEntitiesState = createSelector(
    getSurveyState,
    state => state.survey,
);

export const getSelectedSurveyId = createSelector(
    getSurveyEntitiesState,
    fromSurvey.getSelectedId,
);

export const {
    selectIds: getSurveyIds,
    selectEntities: getSurveyEntities,
    selectAll: getAllSurveys,
    selectTotal: getTotalSurveys,
} = fromSurvey.adapter.getSelectors(getSurveyEntitiesState);

export const getSelectedSurvey = createSelector(
    getSurveyEntities,
    getSelectedSurveyId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    },
);

export const getOngoingSurveys = createSelector(getAllSurveys, surveys =>
    surveys.filter(x => x.status === 'ongoing'),
);

export const getClosedSurveys = createSelector(getAllSurveys, surveys =>
    surveys.filter(x => x.status === 'closed'),
);

export const getSelectedSurveyExpansion = createSelector(
    getSelectedSurvey,
    fromExpansion.getExpansionEntities,
    (survey, expansions) => expansions[survey.expansion],
);

export const getSelectedSurveyCards = createSelector(
    getSelectedSurveyExpansion,
    fromCard.getCardEntities,
    (expansion, cards) => expansion.cards.map(id => cards[id]),
);

// Responses
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

export const getSelectedResponseCards = createSelector(
    getSelectedResponse,
    getCardResponseEntities,
    (response, entities) => {
        return response && response.cardResponses.map(id => entities[id]);
    },
);

// Form
export const getSurveyFormState = createSelector(
    getSurveyState,
    state => state.form,
);

export const getFormIsLoading = createSelector(
    getSurveyFormState,
    fromForm.getIsLoading,
);

export const getFormError = createSelector(
    getSurveyFormState,
    fromForm.getError,
);

export const getFormSelectedCardId = createSelector(
    getSurveyFormState,
    fromForm.getSelectedCardId,
);

// Filter
export const getSurveyFilterState = createSelector(
    getSurveyState,
    state => state.filter,
);

export const getFilter = createSelector(
    getSurveyFilterState,
    fromFilter.getFilter,
);

export const getFilteredCards = createSelector(
    getFilter,
    getSelectedSurveyCards,
    (filter, cards) => {
        return cards.filter(card => filterCard(card, filter));
    },
);

export const getCardFormList = createSelector(
    getFilter,
    getFilteredCards,
    getSelectedResponseId,
    getCardResponseEntities,
    (filter, cards, responseId, formCards) => {
        const res = cards.map<
            Card & {
                form: SurveyCardForm;
            }
        >(card => ({ ...card, form: formCards[`${card.id}-${responseId}`] }));
        if (!filter.nullOnly) {
            return res;
        }
        return res.filter(card => !card.form);
    },
);

export const getFilteredCardsTotal = createSelector(
    getFilteredCards,
    cards => cards.length,
);

function filterCard(card: Card, filter: SurveyCardFilter) {
    if (card.class !== filter.class && filter.class !== 'ALL') {
        return false;
    }
    if (card.rarity !== filter.rarity && filter.rarity !== 'ALL') {
        return false;
    }
    if (filter.cost !== 'ALL' && card.cost !== +filter.cost) {
        return false;
    }
    return true;
}

// Prepare
export const getSurveyPrepareState = createSelector(
    getSurveyState,
    state => state.prepare,
);

export const getPrepareIsLoading = createSelector(
    getSurveyPrepareState,
    fromPrepare.getIsLoading,
);

export const getPrepareError = createSelector(
    getSurveyPrepareState,
    fromPrepare.getError,
);
