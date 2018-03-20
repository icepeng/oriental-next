import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromCard from './card.reducer';

export interface CardState {
    card: fromCard.State;
}

export interface State extends fromRoot.State {
    card: CardState;
}

export const reducers: ActionReducerMap<CardState> = {
    card: fromCard.reducer,
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
