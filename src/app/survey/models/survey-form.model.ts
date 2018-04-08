export interface SurveyForm {
    cardResponses: SurveyCardForm[];
    expansionResponse: SurveyExpansionForm;
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
