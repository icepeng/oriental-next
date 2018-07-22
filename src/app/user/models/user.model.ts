import { ResponseFromApi } from '../../survey/models/response.model';

export interface User {
    id: string;
    battletag: string;
    point: number;
}

export interface UserFromApi {
    user: {
        id: string;
        battletag: string;
        point: number;
        responses: ResponseFromApi[];
    };
}
