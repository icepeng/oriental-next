export interface Survey {
    id: number;
    expansion: string;
    startTime: string;
    endTime: string | null;
    isPreRelease: boolean;
    status: 'ongoing' | 'closed';
    cardStats: string[];
    expansionStat: number | null;
}
