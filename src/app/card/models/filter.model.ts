import { Classes, Rarity } from './card.model';

export interface CardFilter {
    class: Classes | 'NEUTRAL' | 'ALL';
    rarity: Rarity | 'ALL';
    cost: string | 'ALL';
}
