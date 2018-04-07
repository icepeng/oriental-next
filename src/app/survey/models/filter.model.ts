import { Classes, Rarity } from '../../card/models/card.model';

export interface SurveyCardFilter {
    class: Classes | 'Neutral' | 'ALL';
    rarity: Rarity | 'ALL';
    cost: string | 'ALL';
    nullOnly: boolean;
}
