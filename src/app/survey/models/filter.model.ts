import { Classes, Rarity } from '../../card/models/card.model';

export interface SurveyCardFilter {
    class: Classes | 'Neutral' | 'ALL';
    rarity: Rarity | 'ALL';
    cost: string | 'ALL';
    isAnswered: 'Y' | 'N' | 'ALL';
}
