import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import {
    ExpansionActionTypes,
    ExpansionActions,
} from '../../expansion/actions/expansion.actions';
import { ExpansionStat } from '../models/stat.model';

export interface State extends EntityState<ExpansionStat> {}

export const adapter: EntityAdapter<ExpansionStat> = createEntityAdapter<
    ExpansionStat
>({
    selectId: (card: ExpansionStat) => card.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: ExpansionActions): State {
    switch (action.type) {
        case ExpansionActionTypes.LoadSuccess: {
            return {
                ...adapter.addAll(action.payload.expansionStats, state),
            };
        }

        default: {
            return state;
        }
    }
}
