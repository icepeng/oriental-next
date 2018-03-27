import {
    LocalizationActions,
    LocalizationActionTypes,
} from '../actions/localization.actions';

export interface State {
    locale: string;
}

export const initialState: State = {
    locale: 'ko-kr',
};

export function reducer(
    state = initialState,
    action: LocalizationActions,
): State {
    switch (action.type) {
        case LocalizationActionTypes.Set: {
            return {
                ...state,
                locale: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}

export const getLocale = (state: State) => state.locale;
