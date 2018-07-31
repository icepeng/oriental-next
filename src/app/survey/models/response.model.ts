export interface SurveyResponse {
    id: number;
    user: string;
    survey: number;
    cardResponses: string[];
    expansionResponse: number;
}

export interface CardResponse {
    id: string;
    pid: number;
    card: string;
    power: number;
    generality: number;
    description: string;
}

export interface ExpansionResponse {
    id: number;
    pid: number;
    fun: number;
    balance: number;
    description: string;
}

export interface ResponseFromApi {
    id: number;
    surveyId: number;
    cardResponses: CardResponseFromApi[];
    expansionResponse: ExpansionResponseFromApi | null;
}

export interface CardResponseFromApi {
    id: number;
    responseId: number;
    cardId: string;
    power: number;
    generality: number;
    description: string;
}

export interface ExpansionResponseFromApi {
    id: number;
    responseId: number;
    fun: number;
    balance: number;
    description: string;
}
