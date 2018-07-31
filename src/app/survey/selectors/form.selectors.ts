import { createSelector } from '@ngrx/store';
import { Card } from '../../card/models/card.model';
import * as fromCard from '../../card/reducers';
import * as fromExpansion from '../../expansion/reducers';
import { SurveyCardFilter } from '../models/filter.model';
import { CardResponse } from '../models/response.model';
import { getSurveyState } from '../reducers';
import * as fromForm from '../reducers/survey-form.reducer';
import * as fromResponse from './response.selectors';
import * as fromSurvey from './survey.selectors';

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

export const getFormSuccess = createSelector(
    getSurveyFormState,
    fromForm.getSuccess,
);

export const getFormSelectedCardId = createSelector(
    getSurveyFormState,
    fromForm.getSelectedCardId,
);

export const getFormNextCardId = createSelector(
    getSurveyFormState,
    fromForm.getNextCardId,
);

export const getFormNextCard = createSelector(
    getFormNextCardId,
    fromCard.getCardEntities,
    (id, entities) => (id ? entities[id] : null),
);

export const getSurveyCards = createSelector(
    fromSurvey.getSelectedSurvey,
    fromExpansion.getExpansionEntities,
    fromCard.getCardEntities,
    (survey, expansions, cardEntities) => {
        if (!survey) {
            return [];
        }
        return expansions[survey.expansion].cards.map(id => cardEntities[id]);
    },
);

export const getFilter = createSelector(getSurveyFormState, fromForm.getFilter);

export const getCardFormList = createSelector(
    getSurveyCards,
    fromResponse.getSelectedResponseId,
    fromResponse.getCardResponseEntities,
    (cards, responseId, formCards) => {
        return cards.map<
            Card & {
                form?: CardResponse;
            }
        >(card => ({ ...card, form: formCards[`${card.id}-${responseId}`] }));
    },
);

export const getFilteredFormList = createSelector(
    getFilter,
    getCardFormList,
    (filter, cards) => {
        return cards.filter(card => filterCard(card, filter));
    },
);

function filterCard(
    card: Card & {
        form?: CardResponse;
    },
    filter: SurveyCardFilter,
) {
    if (card.class !== filter.class && filter.class !== 'ALL') {
        return false;
    }
    if (card.rarity !== filter.rarity && filter.rarity !== 'ALL') {
        return false;
    }
    if (filter.cost !== 'ALL' && card.cost !== +filter.cost) {
        return false;
    }
    if (filter.nullOnly && !!card.form) {
        return false;
    }
    return true;
}
