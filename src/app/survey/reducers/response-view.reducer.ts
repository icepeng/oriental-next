import {
    ResponseViewActionTypes,
    ResponseViewActions,
} from '../actions/response-view.actions';
import { ResponseViewCardFilter } from '../models/filter.model';

export interface State {
    filter: ResponseViewCardFilter;
}

export const initialState: State = {
    filter: {
        class: 'ALL',
        cost: 'ALL',
        rarity: 'ALL',
    },
};

export function reducer(
    state = initialState,
    action: ResponseViewActions,
): State {
    switch (action.type) {
        case ResponseViewActionTypes.Init: {
            return {
                ...initialState,
            };
        }

        case ResponseViewActionTypes.SetFilter: {
            return {
                ...state,
                filter: action.payload,
            };
        }

        default: {
            return state;
        }
    }
}

export const getFilter = (state: State) => state.filter;
