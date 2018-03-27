import { Classes, Rarity } from './card.model';

export interface CardFilter {
    class: Classes | 'Neutral' | 'ALL';
    rarity: Rarity | 'ALL';
    cost: string | 'ALL';
    sortColumn: 'power' | 'generality';
    sortOrder: 'ASC' | 'DESC';
}
