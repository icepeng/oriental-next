export interface CardStat {
    id: string;
    pid: number;
    card: string;
    survey: number;
    data: {
        power: number[];
        generality: number[];
        responseCount: number;
    };
}
