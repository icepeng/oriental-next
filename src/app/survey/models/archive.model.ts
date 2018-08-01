export interface Archive {
    id: number;
    description: string;
    cardResponse: number;
    user: string;
}

export interface ArchiveView {
    id: number;
    description: string;
    userId: string;
    battletag: string;
    cardResponse: {
        battletag: string;
        userId: string;
        responseId: number;
        surveyId: number;
        cardId: string;
        power: number;
        generality: number;
        description: string;
    };
}