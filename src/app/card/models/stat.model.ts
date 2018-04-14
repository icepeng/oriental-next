export interface CardStat {
    id: string;
    card: string;
    survey: number;
    data: {
        power: number[];
        generality: number[];
        responseCount: number;
    };
}
