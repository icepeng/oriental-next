import {
    ResponseViewActionTypes,
    ResponseViewActions,
} from '../actions/response-view.actions';
import { ResponseViewCardFilter } from '../models/filter.model';

export interface State {
    filter: ResponseViewCardFilter;
    viewLimit: number;
}

export const initialState: State = {
    filter: {
        class: 'ALL',
        cost: 'ALL',
        rarity: 'ALL',
    },
    viewLimit: 20,
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
                viewLimit: 20,
                filter: action.payload,
            };
        }

        case ResponseViewActionTypes.ExpandLimit: {
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
