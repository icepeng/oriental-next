import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
    ExpansionActionTypes,
    LoadFailure,
    LoadSuccess,
} from '../actions/expansion.actions';
import { Expansion } from '../models/expansion.model';
import { ExpansionService } from '../services/expansion.service';

@Injectable()
export class ExpansionEffects {
    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(ExpansionActionTypes.Load)
        .pipe(
            switchMap(() =>
                this.expansionService
                    .getAll()
                    .pipe(
                        map(res => new LoadSuccess(res)),
                        catchError(error => of(new LoadFailure(error))),
                    ),
            ),
        );

    constructor(
        private actions$: Actions,
        private expansionService: ExpansionService,
    ) {}
}
