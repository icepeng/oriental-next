import {
    SurveySubmitActionTypes,
    SurveySubmitActions,
} from '../actions/submit.actions';
import {
    SurveyFormActionTypes,
    SurveyFormActions,
} from '../actions/survey-form.actions';
import { SurveyCardFilter } from '../models/filter.model';

export interface State {
    error: string;
    isLoading: boolean;
    selectedCardId: string;
    filter: SurveyCardFilter;
    nextCardId: string;
    success: boolean;
}

export const initialState: State = {
    error: null,
    isLoading: false,
    selectedCardId: null,
    filter: {
        class: 'ALL',
        cost: 'ALL',
        rarity: 'ALL',
        nullOnly: true,
    },
    nextCardId: null,
    success: false,
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

        case SurveyFormActionTypes.SelectCard: {
            return {
                ...state,
                success: false,
                selectedCardId: action.payload,
            };
        }

        case SurveyFormActionTypes.CloseError: {
            return {
                ...state,
                error: null,
            };
        }

        case SurveyFormActionTypes.SetFilter: {
            return {
                ...state,
                filter: action.payload,
            };
        }

        case SurveyFormActionTypes.SetNextCardSuccess: {
            return {
                ...state,
                nextCardId: action.payload,
            };
        }

        case SurveySubmitActionTypes.SubmitCard:
        case SurveySubmitActionTypes.SubmitExpansion: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case SurveySubmitActionTypes.SubmitCardSuccess:
        case SurveySubmitActionTypes.SubmitExpansionSuccess: {
            return {
                ...state,
                error: null,
                isLoading: false,
                selectedCardId: null,
                success: true,
            };
        }

        case SurveySubmitActionTypes.SubmitCardFailure:
        case SurveySubmitActionTypes.SubmitExpansionFailure: {
            return {
                ...state,
                error: action.payload.message,
                isLoading: false,
            };
        }

        default: {
            return state;
        }
    }
}

export const getIsLoading = (state: State) => state.isLoading;

export const getError = (state: State) => state.error;

export const getSuccess = (state: State) => state.success;

export const getSelectedCardId = (state: State) => state.selectedCardId;

export const getFilter = (state: State) => state.filter;

export const getNextCardId = (state: State) => state.nextCardId;
