export interface SurveyForm {
    survey: string;
    cardEstimates: SurveyCardForm[];
    expansionEstimate: SurveyExpansionForm;
}

export interface SurveyCardForm {
    card: string;
    power: number;
    generality: number;
    description: string;
}

export interface SurveyExpansionForm {
    fun: number;
    balance: number;
    description: string;
}
