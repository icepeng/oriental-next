export interface SurveyResponse {
    id: number;
    user: string;
    survey: number;
    cardResponses: string[];
    expansionResponse: number;
}

export interface CardResponse {
    id: string;
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
    cardId: string;
    power: number;
    generality: number;
    description: string;
}

export interface ExpansionResponseFromApi {
    fun: number;
    balance: number;
    description: string;
}
