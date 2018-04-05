import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { SurveyActions, SurveyActionTypes } from '../actions/survey.actions';
import { Survey } from '../models/survey.model';
import {
    ExpansionActions,
    ExpansionActionTypes,
} from '../../expansion/actions/expansion.actions';

export interface State extends EntityState<Survey> {
    selectedId: string | null;
}

export const adapter: EntityAdapter<Survey> = createEntityAdapter<Survey>({
    selectId: (survey: Survey) => survey.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedId: null,
});

export function reducer(
    state = initialState,
    action: SurveyActions | ExpansionActions,
): State {
    switch (action.type) {
        case ExpansionActionTypes.LoadSuccess: {
            return {
                ...adapter.addAll(action.payload.surveys, state),
                selectedId: state.selectedId,
            };
        }

        case SurveyActionTypes.Select: {
            return {
                ...state,
                selectedId: action.payload,
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedId;
