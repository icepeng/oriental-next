import { SurveyCardFilter } from '../models/filter.model';
import { FilterActions, FilterActionTypes } from './../actions/filter.actions';

export interface State {
    selectedCard: string;
    cards: {
        [id: string]: {
            power: number;
            generality: number;
            description: string;
        };
    };
    expansion: {
        fun: number;
        balance: number;
        description: string;
    };
}

export const initialState: State = {
    selectedCard: null,
    cards: {},
    expansion: null,
};

export function reducer(state = initialState, action: any): State {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

export const getCards = (state: State) => state.cards;

export const getExpansion = (state: State) => state.expansion;
