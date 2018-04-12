import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { UserActionTypes, UserActions } from '../../user/actions/user.actions';
import {
    SubmitSuccess,
    SurveySubmitActionTypes,
    SurveySubmitActions,
} from '../actions/submit.actions';
import { SurveyResponse } from '../models/response.model';
import {
    ResponseActions,
    ResponseActionTypes,
} from '../actions/response.actions';

export interface State extends EntityState<SurveyResponse> {
    selectedId: number | null;
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

function buildResponse(action: SubmitSuccess) {
    return {
        id: action.payload.id,
        user: action.payload.user,
        survey: action.payload.survey,
        cardResponses: [],
        expansionResponse: null,
    };
}

export function reducer(
    state = initialState,
    action: UserActions | SurveySubmitActions | ResponseActions,
): State {
    switch (action.type) {
        case ResponseActionTypes.Select: {
            return {
                ...state,
                selectedId: action.payload,
            };
        }

        case ResponseActionTypes.LoadOneSuccess: {
            return {
                ...adapter.addOne(action.payload.response, state),
                selectedId: state.selectedId,
            };
        }

        case UserActionTypes.LoadSuccess: {
            return {
                ...adapter.addMany(action.payload.responses, state),
                selectedId: state.selectedId,
            };
        }

        case SurveySubmitActionTypes.SubmitSuccess: {
            return {
                ...adapter.addOne(buildResponse(action), state),
                selectedId: state.selectedId,
            };
        }

        case SurveySubmitActionTypes.SubmitCardSuccess: {
            const cardResponses =
                state.entities[action.payload.response].cardResponses;
            const cardResponseId = `${action.payload.form.card}-${
                action.payload.response
            }`;
            return {
                ...adapter.updateOne(
                    {
                        id: action.payload.response,
                        changes: {
                            cardResponses: cardResponses.find(
                                x => x === cardResponseId,
                            )
                                ? cardResponses
                                : [...cardResponses, cardResponseId],
                        },
                    },
                    state,
                ),
                selectedId: state.selectedId,
            };
        }

        case SurveySubmitActionTypes.SubmitExpansionSuccess: {
            return {
                ...adapter.updateOne(
                    {
                        id: action.payload.response,
                        changes: { expansionResponse: action.payload.response },
                    },
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
