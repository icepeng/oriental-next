import { ResponseFromApi } from '../../survey/models/response.model';

export interface User {
    id: string;
    battletag: string;
}

export interface UserFromApi {
    user: {
        id: string;
        battletag: string;
        responses: ResponseFromApi[];
    };
}
