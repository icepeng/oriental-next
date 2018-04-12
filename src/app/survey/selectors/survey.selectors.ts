import { createSelector } from "@ngrx/store";
import { getSurveyState } from "../reducers";
import * as fromSurvey from '../reducers/survey.reducer';

export const getSurveyEntitiesState = createSelector(
    getSurveyState,
    state => state.survey,
);

export const getSelectedSurveyId = createSelector(
    getSurveyEntitiesState,
    fromSurvey.getSelectedId,
);

export const {
    selectIds: getSurveyIds,
    selectEntities: getSurveyEntities,
    selectAll: getAllSurveys,
    selectTotal: getTotalSurveys,
} = fromSurvey.adapter.getSelectors(getSurveyEntitiesState);

export const getSelectedSurvey = createSelector(
    getSurveyEntities,
    getSelectedSurveyId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    },
);

export const getOngoingSurveys = createSelector(getAllSurveys, surveys =>
    surveys.filter(x => x.status === 'ongoing'),
);

export const getClosedSurveys = createSelector(getAllSurveys, surveys =>
    surveys.filter(x => x.status === 'closed'),
);
