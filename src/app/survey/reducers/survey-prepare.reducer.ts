import {
    SurveySubmitActionTypes,
    SurveySubmitActions,
} from '../actions/submit.actions';

export interface State {
    error: string;
    isLoading: boolean;
}

export const initialState: State = {
    error: null,
    isLoading: false,
};

export function reducer(
    state = initialState,
    action: SurveySubmitActions,
): State {
    switch (action.type) {
        case SurveySubmitActionTypes.Submit: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case SurveySubmitActionTypes.SubmitSuccess: {
            return {
                ...state,
                error: null,
                isLoading: false,
            };
        }

        case SurveySubmitActionTypes.SubmitFailure: {
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
