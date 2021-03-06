import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';

import { User } from '../../user/models/user.model';
import { Decoded } from '../models/token.model';
import { environment } from 'environments/environment';

@Injectable()
export class AuthService {
    constructor() {}

    login(): Promise<string> {
        return new Promise((resolve, reject) => {
            const receiveMessage = (event: any) => {
                if (event.origin.indexOf(environment.apiDomain) === -1) {
                    return;
                }
                window.removeEventListener('message', receiveMessage);
                resolve(event.data);
            };
            window.open(environment.authAddress);
            window.addEventListener('message', receiveMessage, false);
        });
    }

    decodeToken(token: string): Decoded<User> {
        const decoded = jwtDecode<Decoded<User>>(token);
        return {
            id: decoded.id,
            battletag: decoded.battletag,
            point: decoded.point,
            exp: decoded.exp,
        };
    }
}
