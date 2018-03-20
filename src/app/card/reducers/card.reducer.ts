import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import {
    ExpansionActions,
    ExpansionActionTypes,
} from '../../expansion/actions/expansion.actions';
import { CardActions, CardActionTypes } from '../actions/card.actions';
import { Card } from '../models/card.model';

export interface State extends EntityState<Card> {
    selectedId: string | null;
}

export const adapter: EntityAdapter<Card> = createEntityAdapter<Card>({
    selectId: (card: Card) => card.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedId: null,
});

export function reducer(
    state = initialState,
    action: ExpansionActions | CardActions,
): State {
    switch (action.type) {
        case ExpansionActionTypes.LoadSuccess: {
            return {
                ...adapter.addAll(action.payload.cards, state),
                selectedId: state.selectedId,
            };
        }

        case CardActionTypes.Select: {
            return {
                ...state,
                selectedId: action.payload,
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedId;
