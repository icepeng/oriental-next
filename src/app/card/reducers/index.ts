import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { Card } from '../models/card.model';
import { CardFilter } from '../models/filter.model';
import * as fromCard from './card.reducer';
import * as fromFilter from './filter.reducer';
import * as fromStat from './card-stat.reducer';

export interface CardState {
    card: fromCard.State;
    filter: fromFilter.State;
    stat: fromStat.State;
}

export interface State extends fromRoot.State {
    card: CardState;
}

export const reducers: ActionReducerMap<CardState> = {
    card: fromCard.reducer,
    filter: fromFilter.reducer,
    stat: fromStat.reducer,
};

export const getCardState = createFeatureSelector<CardState>('card');

export const getCardEntitiesState = createSelector(
    getCardState,
    state => state.card,
);

export const getSelectedCardId = createSelector(
    getCardEntitiesState,
    fromCard.getSelectedId,
);

export const {
    selectIds: getCardIds,
    selectEntities: getCardEntities,
    selectAll: getAllCards,
    selectTotal: getTotalCards,
} = fromCard.adapter.getSelectors(getCardEntitiesState);

export const getSelectedCard = createSelector(
    getCardEntities,
    getSelectedCardId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    },
);

// Stat
export const getCardStatState = createSelector(
    getCardState,
    state => state.stat,
);

export const {
    selectIds: getCardStatIds,
    selectEntities: getCardStatEntities,
    selectAll: getAllCardStats,
    selectTotal: getTotalCardStats,
} = fromStat.adapter.getSelectors(getCardStatState);

export const getSelectedCardStats = createSelector(
    getSelectedCardId,
    getAllCardStats,
    (cardId, cardStats) => cardStats.filter(x => x.card === cardId),
);

// Filter
export const getViewFilterState = createSelector(
    getCardState,
    (state: CardState) => state.filter,
);

export const getFilter = createSelector(
    getViewFilterState,
    fromFilter.getFilter,
);

export const getViewLimit = createSelector(
    getViewFilterState,
    fromFilter.getViewLimit,
);

export const getFilteredCards = createSelector(
    getFilter,
    getAllCards,
    (filter, cards) => {
        return cards.filter(card => filterCard(card, filter));
        // .sort(sortCard(filter));
    },
);

export const getFilteredCardsTotal = createSelector(
    getFilteredCards,
    cards => cards.length,
);

export const getSelectedCardIndex = createSelector(
    getFilteredCards,
    getSelectedCardId,
    (cards, id) => cards.findIndex(x => x.id === id),
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

function filterCard(card: Card, filter: CardFilter) {
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

// const sortCard = (filter: CardFilter) => (a: Card, b: Card) => {
//     const sign = filter.sortOrder === 'ASC' ? 1 : -1;
//     const primary = filter.sortColumn;
//     const secondary = filter.sortColumn === 'power' ? 'generality' : 'power';
//     if (a.stat[primary] < b.stat[primary]) {
//         return -1 * sign;
//     }
//     if (a.stat[primary] > b.stat[primary]) {
//         return 1 * sign;
//     }
//     if (a.stat[secondary] < b.stat[secondary]) {
//         return -1 * sign;
//     }
//     if (a.stat[secondary] > b.stat[secondary]) {
//         return 1 * sign;
//     }
//     return 0;
// };
