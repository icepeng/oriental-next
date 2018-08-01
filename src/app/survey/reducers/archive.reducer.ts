import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { UserActions, UserActionTypes } from '../../user/actions/user.actions';
import {
    ResponseActionTypes,
    ResponseActions,
} from '../actions/response.actions';
import { SurveySubmitActions } from '../actions/submit.actions';
import { Archive } from '../models/archive.model';
import { ArchiveActions, ArchiveActionTypes } from '../actions/archive.actions';

export interface State extends EntityState<Archive> {}

export const adapter: EntityAdapter<Archive> = createEntityAdapter<Archive>({
    selectId: (cardResponse: Archive) => cardResponse.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState();

export function reducer(
    state = initialState,
    action: ArchiveActions | UserActions | ResponseActions,
): State {
    switch (action.type) {
        case ArchiveActionTypes.SubmitSuccess: {
            return {
                ...adapter.addOne(
                    {
                        cardResponse: action.payload.cardResponse,
                        user: action.payload.user,
                        description: action.payload.description,
                        id: action.payload.id,
                    },
                    state,
                ),
            };
        }

        case ResponseActionTypes.LoadOneSuccess: {
            return {
                ...adapter.addMany(action.payload.archives, state),
            };
        }

        case UserActionTypes.LoadSuccess: {
            return {
                ...adapter.addMany(action.payload.archives, state),
            };
        }

        default: {
            return state;
        }
    }
}
