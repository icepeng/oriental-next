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
import * as fromFilter from './filter.reducer';
import * as fromForm from './survey-form.reducer';
import * as fromSurvey from './survey.reducer';

export interface SurveyState {
    survey: fromSurvey.State;
    filter: fromFilter.State;
    form: fromForm.State;
}

export interface State extends fromRoot.State {
    survey: SurveyState;
}

export const reducers: ActionReducerMap<SurveyState> = {
    survey: fromSurvey.reducer,
    filter: fromFilter.reducer,
    form: fromForm.reducer,
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

// Form

export const getSurveyFormState = createSelector(
    getSurveyState,
    state => state.form,
);

export const getFormSelectedCardId = createSelector(
    getSurveyFormState,
    fromForm.getSelectedCardId,
);

export const getFormCards = createSelector(
    getSurveyFormState,
    fromForm.getCards,
);

export const getFormExpansion = createSelector(
    getSurveyFormState,
    fromForm.getExpansion,
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

export const getFilteredCardsNullOnly = createSelector(
    getFilter,
    getFilteredCards,
    getFormCards,
    (filter, cards, formCards) => {
        if (!filter.nullOnly) {
            return cards;
        }
        return cards.filter(card => !formCards[card.id]);
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
