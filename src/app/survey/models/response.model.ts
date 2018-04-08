export interface SurveyResponse {
    id: string;
    user: string;
    survey: string;
    cardResponses: string[];
    expansionResponse: string;
}

export interface CardResponse {
    id: string;
    card: string;
    power: number;
    generality: number;
    description: string;
}

export interface ExpansionResponse {
    id: string;
    fun: number;
    balance: number;
    description: string;
}

export interface ResponseFromApi {
    id: string;
    user: string;
    surveyId: string;
    cardResponses: CardResponse[];
    expansionResponse: ExpansionResponse;
}
