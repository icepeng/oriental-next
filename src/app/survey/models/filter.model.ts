import { Classes, Rarity } from '../../card/models/card.model';

export interface SurveyCardFilter {
    class: Classes | 'NEUTRAL' | 'ALL';
    rarity: Rarity | 'ALL';
    cost: string | 'ALL';
    nullOnly: boolean;
}
