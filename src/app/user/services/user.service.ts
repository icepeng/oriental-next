import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpAuth } from '../../core/services/http-auth.service';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    constructor(private http: HttpAuth) {}

    getOne(id: string): Observable<User> {
        return this.http.get<User>(`https://localhost:3002/api/v1/users/${id}`);
    }
}
