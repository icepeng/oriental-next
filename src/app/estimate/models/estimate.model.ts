export interface Estimate {
    user: string;
    expansion: string;
    cardEstimates: string[];
    expansionEstimate: string;
}

export interface CardEstimate {
    card: string;
    power: number;
    generality: number;
    description: string;
}

export interface ExpansionEstimate {
    fun: number;
    balance: number;
    description: string;
}
