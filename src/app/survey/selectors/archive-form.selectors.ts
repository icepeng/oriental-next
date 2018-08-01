import { createSelector } from '@ngrx/store';
import { getSurveyState } from '../reducers';
import * as fromArchiveForm from '../reducers/archive-form.reducer';

export const getArchiveFormState = createSelector(
    getSurveyState,
    state => state.archiveForm,
);

export const getArchiveFormIsOpen = createSelector(
    getArchiveFormState,
    fromArchiveForm.getIsOpen,
);

export const getArchiveFormIsLoading = createSelector(
    getArchiveFormState,
    fromArchiveForm.getIsLoading,
);

export const getPrepareError = createSelector(
    getArchiveFormState,
    fromArchiveForm.getError,
);
