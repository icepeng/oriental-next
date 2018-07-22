export interface ExpansionStat {
    id: number;
    survey: number;
    data: {
        fun: number[];
        balance: number[];
        responseCount: number;
    };
}
