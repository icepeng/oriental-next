import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { UserActionTypes, UserActions } from '../../user/actions/user.actions';
import {
    AddSuccess,
    EditSuccess,
    SurveySubmitActionTypes,
    SurveySubmitActions,
} from '../actions/submit.actions';
import { CardResponse } from '../models/response.model';

export interface State extends EntityState<CardResponse> {
    selectedId: string | null;
}

export const adapter: EntityAdapter<CardResponse> = createEntityAdapter<
    CardResponse
>({
    selectId: (cardResponse: CardResponse) => cardResponse.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedId: null,
});

function buildCardResponses(action: AddSuccess | EditSuccess) {
    return action.payload.form.cardResponses.map<CardResponse>(x => ({
        id: `${x.card}-${action.payload.id}`,
        card: x.card,
        description: x.description,
        generality: x.generality,
        power: x.power,
    }));
}

export function reducer(
    state = initialState,
    action: UserActions | SurveySubmitActions,
): State {
    switch (action.type) {
        case UserActionTypes.LoadSuccess: {
            return {
                ...adapter.addMany(action.payload.cardResponses, state),
                selectedId: state.selectedId,
            };
        }

        case SurveySubmitActionTypes.AddSuccess: {
            return {
                ...adapter.addMany(buildCardResponses(action), state),
                selectedId: state.selectedId,
            };
        }

        case SurveySubmitActionTypes.EditSuccess: {
            return {
                ...adapter.upsertMany(
                    buildCardResponses(action).map(x => ({
                        id: x.id,
                        changes: x,
                    })),
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
