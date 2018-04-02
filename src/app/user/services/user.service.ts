import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable()
export class UserService {
    constructor() {}

    private mockApi() {
        return of({
            id: '1',
            battletag: 'iipeng#1234',
            estimates: [],
        });
    }

    getOne(): Observable<User> {
        return this.mockApi().pipe(map(data => data));
    }
}
