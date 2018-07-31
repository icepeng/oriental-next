import { CardFilter } from '../models/filter.model';
import { FilterActions, FilterActionTypes } from './../actions/filter.actions';

export interface State {
    filter: CardFilter;
    viewLimit: number;
}

export const initialState: State = {
    filter: {
        class: 'ALL',
        cost: 'ALL',
        rarity: 'ALL',
        expansion: 'ALL',
    },
    viewLimit: 20,
};

export function reducer(state = initialState, action: FilterActions): State {
    switch (action.type) {
        case FilterActionTypes.Set: {
            return {
                filter: action.payload,
                viewLimit: 20,
            };
        }
        case FilterActionTypes.Reset: {
            return {
                filter: { ...initialState.filter },
                viewLimit: 20,
            };
        }

        case FilterActionTypes.ExpandLimit: {
            return {
                ...state,
                viewLimit: state.viewLimit + 20,
            };
        }

        default: {
            return state;
        }
    }
}

export const getFilter = (state: State) => state.filter;

export const getViewLimit = (state: State) => state.viewLimit;
