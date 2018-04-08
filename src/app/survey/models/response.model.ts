export interface SurveyResponse {
    id: number;
    user: string;
    survey: number;
    cardResponses: number[];
    expansionResponse: number;
}

export interface CardResponse {
    id: number;
    card: string;
    power: number;
    generality: number;
    description: string;
}

export interface ExpansionResponse {
    id: number;
    fun: number;
    balance: number;
    description: string;
}

export interface ResponseFromApi {
    id: number;
    user: string;
    surveyId: number;
    cardResponses: CardResponseFromApi[];
    expansionResponse: ExpansionResponse;
}

export interface CardResponseFromApi {
    id: number;
    cardId: string;
    power: number;
    generality: number;
    description: string;
}
