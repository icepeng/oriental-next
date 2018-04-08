export interface Card {
    id: string;
    expansion: string;
    class: Classes | 'NEUTRAL';
    rarity: Rarity;
    cost: number;
    stat?: {
        power: number;
        generality: number;
    };
}

export type Classes =
    | 'MAGE'
    | 'WARLOCK'
    | 'SHAMAN'
    | 'PALADIN'
    | 'PRIEST'
    | 'ROGUE'
    | 'DRUID'
    | 'HUNTER'
    | 'WARRIOR';
export type Rarity = 'FREE' | 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
