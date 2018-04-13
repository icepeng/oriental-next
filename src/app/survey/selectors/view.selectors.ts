import { createSelector } from '@ngrx/store';
import { Card } from '../../card/models/card.model';
import * as fromCard from '../../card/reducers';
import { ResponseViewCardFilter } from '../models/filter.model';
import { getSurveyState } from '../reducers';
import * as fromView from '../reducers/response-view.reducer';
import * as fromResponse from './response.selectors';

export const getResponseViewState = createSelector(
    getSurveyState,
    state => state.responseView,
);

export const getFilter = createSelector(
    getResponseViewState,
    fromView.getFilter,
);

export const getViewLimit = createSelector(
    getResponseViewState,
    fromView.getViewLimit,
);

export const getFilteredCards = createSelector(
    getFilter,
    fromResponse.getSelectedResponseCardResponses,
    fromCard.getCardEntities,
    (filter, cardResponses, cardEntities) => {
        return cardResponses.filter(cardResponse =>
            filterCard(cardEntities[cardResponse.card], filter),
        );
    },
);

export const getFilteredCardsTotal = createSelector(
    getFilteredCards,
    cards => cards.length,
);

export const getLimitedFilteredCards = createSelector(
    getFilteredCards,
    getViewLimit,
    (cards, viewLimit) => cards.slice(0, viewLimit),
);

export const getShowExpandButton = createSelector(
    getFilteredCardsTotal,
    getViewLimit,
    (total, limit) => total > limit,
);

function filterCard(card: Card, filter: ResponseViewCardFilter) {
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
