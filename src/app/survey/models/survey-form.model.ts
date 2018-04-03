export interface SurveyForm {
    survey: string;
    cardEstimates: {
        card: string;
        power: number;
        generality: number;
        description: string;
    }[];
    expansionEstimate: {
        fun: number;
        balance: number;
        description: string;
    };
}
