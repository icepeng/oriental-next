import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as fromUser from '../../user/reducers';
import {
    ArchiveActionTypes,
    Submit,
    SubmitFailure,
    SubmitSuccess,
} from '../actions/archive.actions';
import { ArchiveService } from '../services/archive.service';

@Injectable()
export class ArchiveEffects {
    @Effect()
    submit$: Observable<Action> = this.actions$
        .ofType(ArchiveActionTypes.Submit)
        .pipe(
            map((action: Submit) => action.payload),
            switchMap(payload =>
                this.archiveService
                    .submit({
                        description: payload.description,
                        cardResponse: payload.cardResponse,
                    })
                    .pipe(
                        withLatestFrom(
                            this.store.select(fromUser.getAuthedUserId),
                        ),
                        map(
                            ([res, user]) =>
                                new SubmitSuccess({
                                    user,
                                    id: res.id,
                                    point: res.point,
                                    cardResponse: payload.cardResponse,
                                    description: payload.description,
                                }),
                        ),
                        catchError(error => of(new SubmitFailure(error))),
                    ),
            ),
        );

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private archiveService: ArchiveService,
    ) {}
}
