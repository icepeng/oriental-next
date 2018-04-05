export interface Card {
    id: string;
    expansion: string;
    class: Classes | 'Neutral';
    rarity: Rarity;
    cost: number;
    stat?: {
        power: number;
        generality: number;
    };
}

export type Classes =
    | 'Mage'
    | 'Warlock'
    | 'Shaman'
    | 'Paladin'
    | 'Preist'
    | 'Rogue'
    | 'Druid'
    | 'Hunter'
    | 'Warrior';
export type Rarity = 'Free' | 'Common' | 'Rare' | 'Epic' | 'Legendary';
