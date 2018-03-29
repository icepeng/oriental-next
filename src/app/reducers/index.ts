import * as fromRouter from '@ngrx/router-store';
import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';
import { RouterStateUrl } from '../shared/utils';
import * as fromLocalization from '../core/reducers/localization.reducer';
import * as fromLocaleModal from '../core/reducers/locale-modal.reducer';
import * as locales from '../core/locales';

export interface State {
    router: fromRouter.RouterReducerState<RouterStateUrl>;
    localization: fromLocalization.State;
    localeModal: fromLocaleModal.State;
}

export const reducers: ActionReducerMap<State> = {
    router: fromRouter.routerReducer,
    localization: fromLocalization.reducer,
    localeModal: fromLocaleModal.reducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: any): State {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}
export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger, storeFreeze]
    : [];

/**
 * Localization Reducers
 */
export const getLocalizationState = createFeatureSelector<
    fromLocalization.State
>('localization');

export const getLocale = createSelector(
    getLocalizationState,
    fromLocalization.getLocale,
);

export const getLocalCards = createSelector(
    getLocale,
    locale => locales.cards[locale],
);

export const getLocalUI = createSelector(
    getLocale,
    locale => locales.ui[locale],
);

/**
 * Locale Modal Reducers
 */
export const getLocaleModalState = createFeatureSelector<fromLocaleModal.State>(
    'localeModal',
);

export const getLocaleModalIsOpen = createSelector(
    getLocaleModalState,
    fromLocaleModal.getIsOpen,
);
