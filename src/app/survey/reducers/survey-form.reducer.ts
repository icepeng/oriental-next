import {
    SurveyFormActions,
    SurveyFormActionTypes,
} from '../actions/survey-form.actions';

export interface State {
    selectedCardId: string | null;
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
    selectedCardId: null,
    cards: {},
    expansion: null,
};

export function reducer(
    state = initialState,
    action: SurveyFormActions,
): State {
    switch (action.type) {
        case SurveyFormActionTypes.SelectCard: {
            return {
                ...state,
                selectedCardId: action.payload,
            };
        }

        case SurveyFormActionTypes.SubmitCard: {
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.payload.card]: action.payload,
                },
                selectedCardId: null,
            };
        }

        case SurveyFormActionTypes.SubmitExpansion: {
            return {
                ...state,
                expansion: action.payload,
                selectedCardId: null,
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedCardId = (state: State) => state.selectedCardId;

export const getCards = (state: State) => state.cards;

export const getExpansion = (state: State) => state.expansion;
