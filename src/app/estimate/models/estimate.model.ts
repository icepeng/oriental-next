export interface Estimate {
    id: string;
    user: string;
    survey: string;
    cardEstimates: string[];
    expansionEstimate: string;
}

export interface CardEstimate {
    id: string;
    card: string;
    power: number;
    generality: number;
    description: string;
}

export interface ExpansionEstimate {
    id: string;
    fun: number;
    balance: number;
    description: string;
}
