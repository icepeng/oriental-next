export interface Survey {
    id: string;
    expansion: string;
    startTime: string;
    endTime: string | null;
    isPreRelease: boolean;
    status: 'ongoing' | 'closed';
}
