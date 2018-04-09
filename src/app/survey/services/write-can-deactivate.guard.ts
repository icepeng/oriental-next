import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { SurveyWriteComponent } from '../containers/survey-write.component';
import * as fromSurvey from '../reducers';

@Injectable()
export class WriteCanDeactivateGuard
    implements CanDeactivate<SurveyWriteComponent> {
    constructor(private store: Store<any>) {}
    canDeactivate(
        component: SurveyWriteComponent,
    ): Observable<boolean> | boolean {
        return this.store.select(fromSurvey.getFormDirty).pipe(
            switchMap(dirty => {
                if (!dirty) {
                    return of(true);
                }
                const confirmation = window.confirm(
                    '저장하지 않은 기록이 삭제됩니다. 계속 하시겠습니까??',
                );
                return of(confirmation);
            }),
        );
    }
}
