import { User } from '../../user/models/user.model';

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
    archives: number[];
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
    archives: ArchiveFromApi[];
}

export interface ExpansionResponseFromApi {
    id: number;
    responseId: number;
    fun: number;
    balance: number;
    description: string;
}

export interface ArchiveFromApi {
    id: number;
    description: string;
    cardResponseId: number;
    userId: string;
    user: User;
}
