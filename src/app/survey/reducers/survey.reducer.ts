import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import {
    ExpansionActionTypes,
    ExpansionActions,
} from '../../expansion/actions/expansion.actions';
import { SurveyActionTypes, SurveyActions } from '../actions/survey.actions';
import { Survey } from '../models/survey.model';

export interface State extends EntityState<Survey> {
    selectedId: number | null;
}

export const adapter: EntityAdapter<Survey> = createEntityAdapter<Survey>({
    selectId: (survey: Survey) => survey.id,
    sortComparer: (a, b) => b.id - a.id,
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
