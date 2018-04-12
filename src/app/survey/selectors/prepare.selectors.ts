import { getSurveyState } from '../reducers';
import * as fromPrepare from '../reducers/survey-prepare.reducer';
import { createSelector } from '@ngrx/store';

export const getSurveyPrepareState = createSelector(
    getSurveyState,
    state => state.prepare,
);

export const getPrepareIsLoading = createSelector(
    getSurveyPrepareState,
    fromPrepare.getIsLoading,
);

export const getPrepareError = createSelector(
    getSurveyPrepareState,
    fromPrepare.getError,
);
