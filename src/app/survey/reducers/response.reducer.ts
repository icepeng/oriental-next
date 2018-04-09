import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { UserActionTypes, UserActions } from '../../user/actions/user.actions';
import {
    AddSuccess,
    EditSuccess,
    SurveySubmitActionTypes,
    SurveySubmitActions,
} from '../actions/submit.actions';
import { SurveyResponse } from '../models/response.model';

export interface State extends EntityState<SurveyResponse> {
    selectedId: string | null;
}

export const adapter: EntityAdapter<SurveyResponse> = createEntityAdapter<
    SurveyResponse
>({
    selectId: (response: SurveyResponse) => response.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedId: null,
});

function buildResponse(action: AddSuccess | EditSuccess) {
    return {
        id: action.payload.id,
        user: action.payload.user,
        survey: action.payload.survey,
        cardResponses: action.payload.form.cardResponses.map(
            x => `${x.card}-${action.payload.id}`,
        ),
        expansionResponse: action.payload.id,
    };
}

export function reducer(
    state = initialState,
    action: UserActions | SurveySubmitActions,
): State {
    switch (action.type) {
        case UserActionTypes.LoadSuccess: {
            return {
                ...adapter.addMany(action.payload.responses, state),
                selectedId: state.selectedId,
            };
        }

        case SurveySubmitActionTypes.AddSuccess: {
            return {
                ...adapter.addOne(buildResponse(action), state),
                selectedId: state.selectedId,
            };
        }

        case SurveySubmitActionTypes.EditSuccess: {
            return {
                ...adapter.updateOne(
                    { id: action.payload.id, changes: buildResponse(action) },
                    state,
                ),
                selectedId: state.selectedId,
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedId;
