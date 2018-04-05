import { SurveyCardFilter } from '../models/filter.model';
import { FilterActions, FilterActionTypes } from './../actions/filter.actions';

export interface State {
    filter: SurveyCardFilter;
}

export const initialState: State = {
    filter: {
        class: 'ALL',
        cost: 'ALL',
        rarity: 'ALL',
        isAnswered: 'N',
    },
};

export function reducer(state = initialState, action: FilterActions): State {
    switch (action.type) {
        case FilterActionTypes.Set: {
            return {
                filter: action.payload,
            };
        }
        case FilterActionTypes.Reset: {
            return {
                filter: { ...initialState.filter },
            };
        }

        default: {
            return state;
        }
    }
}

export const getFilter = (state: State) => state.filter;
