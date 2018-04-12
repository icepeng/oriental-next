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

export const getFormSelectedCardId = createSelector(
    getSurveyFormState,
    fromForm.getSelectedCardId,
);

export const getFilter = createSelector(getSurveyFormState, fromForm.getFilter);

export const getFilteredCards = createSelector(
    getFilter,
    fromSurvey.getSelectedSurvey,
    fromExpansion.getExpansionEntities,
    fromCard.getCardEntities,
    (filter, survey, expansions, cards) => {
        return expansions[survey.expansion].cards
            .map(id => cards[id])
            .filter(card => filterCard(card, filter));
    },
);

export const getCardFormList = createSelector(
    getFilter,
    getFilteredCards,
    fromResponse.getSelectedResponseId,
    fromResponse.getCardResponseEntities,
    (filter, cards, responseId, formCards) => {
        const res = cards.map<
            Card & {
                form: CardResponse;
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
