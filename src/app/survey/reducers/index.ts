import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromCardResponse from './response-card.reducer';
import * as fromExpansionResponse from './response-expansion.reducer';
import * as fromResponseView from './response-view.reducer';
import * as fromResponse from './response.reducer';
import * as fromForm from './survey-form.reducer';
import * as fromPrepare from './survey-prepare.reducer';
import * as fromSurvey from './survey.reducer';

export interface SurveyState {
    survey: fromSurvey.State;
    form: fromForm.State;
    responseView: fromResponseView.State;
    response: fromResponse.State;
    cardResponse: fromCardResponse.State;
    expansionResponse: fromExpansionResponse.State;
    prepare: fromPrepare.State;
}

export interface State extends fromRoot.State {
    survey: SurveyState;
}

export const reducers: ActionReducerMap<SurveyState> = {
    survey: fromSurvey.reducer,
    form: fromForm.reducer,
    responseView: fromResponseView.reducer,
    response: fromResponse.reducer,
    cardResponse: fromCardResponse.reducer,
    expansionResponse: fromExpansionResponse.reducer,
    prepare: fromPrepare.reducer,
};

export const getSurveyState = createFeatureSelector<SurveyState>('survey');
