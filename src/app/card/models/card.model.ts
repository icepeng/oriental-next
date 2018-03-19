export interface Card {
  id: string;
  name: string;
  class: string;
  cost: number;
  stat?: {
    tier: number;
    generality: number;
  }
}
