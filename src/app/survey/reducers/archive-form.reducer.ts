import { ArchiveActionTypes, ArchiveActions } from '../actions/archive.actions';
import { ResponseViewActionTypes } from '../actions/response-view.actions';

export interface State {
    isOpen: boolean;
    isLoading: boolean;
    error: string;
}

export const initialState: State = {
    isOpen: false,
    isLoading: false,
    error: null,
};

export function reducer(state = initialState, action: ArchiveActions): State {
    switch (action.type) {
        case ArchiveActionTypes.Open: {
            return {
                ...state,
                isOpen: true,
            };
        }

        case ArchiveActionTypes.Close: {
            return {
                ...state,
                isOpen: false,
            };
        }

        case ArchiveActionTypes.Submit: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case ArchiveActionTypes.SubmitSuccess: {
            return {
                ...state,
                isLoading: false,
                isOpen: false,
            };
        }

        case ArchiveActionTypes.SubmitFailure: {
            return {
                ...state,
                isLoading: false,
            };
        }

        default: {
            return state;
        }
    }
}

export const getIsLoading = (state: State) => state.isLoading;

export const getIsOpen = (state: State) => state.isOpen;

export const getError = (state: State) => state.error;
