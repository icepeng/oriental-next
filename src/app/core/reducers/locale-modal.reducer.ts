import {
    LocaleModalActions,
    LocaleModalActionTypes,
} from '../actions/locale-modal.actions';
import {
    LocalizationActionTypes,
    LocalizationActions,
} from '../actions/localization.actions';

export interface State {
    isOpen: boolean;
}

export const initialState: State = {
    isOpen: false,
};

export function reducer(
    state = initialState,
    action: LocaleModalActions | LocalizationActions,
): State {
    switch (action.type) {
        case LocaleModalActionTypes.Open: {
            return {
                ...state,
                isOpen: true,
            };
        }

        case LocalizationActionTypes.Set:
        case LocaleModalActionTypes.Close: {
            return {
                ...state,
                isOpen: false,
            };
        }

        default: {
            return state;
        }
    }
}

export const getIsOpen = (state: State) => state.isOpen;
