export interface CardEvaluation {
    card: string;
    user: string;
    tier: number;
    generality: number;
    description: string;
}

export interface ExpansionEvaluation {
    expansion: string;
    user: string;
    description: string;
    cardEvaluations: string[];
}
