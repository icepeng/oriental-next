import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import {
    ExpansionActionTypes,
    ExpansionActions,
} from '../../expansion/actions/expansion.actions';
import { CardStat } from '../models/stat.model';

export interface State extends EntityState<CardStat> {}

export const adapter: EntityAdapter<CardStat> = createEntityAdapter<CardStat>({
    selectId: (card: CardStat) => card.id,
    sortComparer: (a, b) => a.pid - b.pid,
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: ExpansionActions): State {
    switch (action.type) {
        case ExpansionActionTypes.LoadSuccess: {
            return {
                ...adapter.addAll(action.payload.cardStats, state),
            };
        }

        default: {
            return state;
        }
    }
}
