import { createSelector } from '@ngrx/store';
import { getSurveyState } from '../reducers';
import * as fromSurvey from './survey.selectors';
import * as fromCard from '../../card/reducers';
import * as fromExpansion from '../../expansion/reducers';

export const getSelectedSurveyCardStats = createSelector(
    fromSurvey.getSelectedSurvey,
    fromCard.getCardStatEntities,
    (survey, cardStatEntities) =>
        survey && survey.cardStats.map(id => cardStatEntities[id]),
);

export const getSelectedSurveyExpansionStat = createSelector(
    fromSurvey.getSelectedSurvey,
    fromExpansion.getExpansionStatEntities,
    (survey, expansionStatEntities) =>
        survey && expansionStatEntities[survey.expansionStat],
);
