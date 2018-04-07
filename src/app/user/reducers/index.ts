import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromUser from './user.reducer';

export interface UserState {
    user: fromUser.State;
}

export interface State extends fromRoot.State {
    user: UserState;
}

export const reducers: ActionReducerMap<UserState> = {
    user: fromUser.reducer,
};

export const getUserState = createFeatureSelector<UserState>('user');

export const getUserEntitiesState = createSelector(
    getUserState,
    state => state.user,
);

export const getSelectedUserId = createSelector(
    getUserEntitiesState,
    fromUser.getSelectedId,
);

export const getAuthedUserId = createSelector(
    getUserEntitiesState,
    fromUser.getAuthedId,
);

export const {
    selectIds: getUserIds,
    selectEntities: getUserEntities,
    selectAll: getAllUsers,
    selectTotal: getTotalUsers,
} = fromUser.adapter.getSelectors(getUserEntitiesState);

export const getSelectedUser = createSelector(
    getUserEntities,
    getSelectedUserId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    },
);

export const getAuthedUser = createSelector(
    getUserEntities,
    getAuthedUserId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    },
);
