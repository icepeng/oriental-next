import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';

import { User } from '../../user/models/user.model';
import { Decoded } from '../models/token.model';

@Injectable()
export class AuthService {
    constructor() {}

    login(): Promise<string> {
        return new Promise((resolve, reject) => {
            const receiveMessage = (event: any) => {
                window.removeEventListener('message', receiveMessage);
                resolve(event.data);
            };
            window.open(
                // TODO: change link on production
                // tslint:disable-next-line:max-line-length
                'https://kr.battle.net/login/ko/?ref=https://kr.battle.net/oauth/authorize?response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Flocalhost:3002%252Fapi%252Fv1%252Fauth%252Fbnet%252Fcallback%26client_id%3Dhmvrryh5b4c75r74mrheqvcfu84g7n2q&app=oauth',
            );
            window.addEventListener('message', receiveMessage);
        });
    }

    decodeToken(token: string): Decoded<User> {
        const decoded = jwtDecode<Decoded<User>>(token);
        return {
            id: decoded.id,
            battletag: decoded.battletag,
            exp: decoded.exp,
        };
    }
}
