import {
    SurveySubmitActions,
    SurveySubmitActionTypes,
} from '../actions/submit.actions';
import {
    SurveyFormActionTypes,
    SurveyFormActions,
} from '../actions/survey-form.actions';
import {
    SurveyCardForm,
    SurveyExpansionForm,
} from '../models/survey-form.model';

export interface State {
    isLoading: boolean;
    dirty: boolean;
    selectedCardId: string | null;
    cards: {
        [id: string]: SurveyCardForm;
    };
    expansion: SurveyExpansionForm;
}

export const initialState: State = {
    isLoading: false,
    dirty: false,
    selectedCardId: null,
    cards: {},
    expansion: null,
};

export function reducer(
    state = initialState,
    action: SurveyFormActions | SurveySubmitActions,
): State {
    switch (action.type) {
        case SurveyFormActionTypes.Init: {
            return {
                ...initialState,
            };
        }

        case SurveyFormActionTypes.Load: {
            return {
                ...initialState,
                cards: action.payload.cardResponses.reduce((obj, x) => {
                    return {
                        ...obj,
                        [x.card]: {
                            card: x.card,
                            power: x.power,
                            generality: x.generality,
                            description: x.description,
                        },
                    };
                }, {}),
                expansion: {
                    fun: action.payload.expansionResponse.fun,
                    balance: action.payload.expansionResponse.balance,
                    description: action.payload.expansionResponse.description,
                },
            };
        }

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
                dirty: true,
            };
        }

        case SurveyFormActionTypes.SubmitExpansion: {
            return {
                ...state,
                expansion: action.payload,
                selectedCardId: null,
                dirty: true,
            };
        }

        case SurveySubmitActionTypes.Add:
        case SurveySubmitActionTypes.Edit: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case SurveySubmitActionTypes.Failure:
        case SurveySubmitActionTypes.AddSuccess:
        case SurveySubmitActionTypes.EditSuccess: {
            return {
                ...state,
                isLoading: false,
                dirty: false,
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

export const getIsLoading = (state: State) => state.isLoading;

export const getDirty = (state: State) => state.dirty;
