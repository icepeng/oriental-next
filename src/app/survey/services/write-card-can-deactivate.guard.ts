import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { SurveyWriteCardComponent } from '../containers/survey-write-card.component';
import * as fromForm from '../selectors/form.selectors';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class WriteCardCanDeactivateGuard
    implements CanDeactivate<SurveyWriteCardComponent> {
    constructor(private store: Store<any>) {}

    canDeactivate(
        component: SurveyWriteCardComponent,
    ): Observable<boolean> | boolean {
        return this.store.select(fromForm.getFormSelectedCardId).pipe(
            switchMap(id => {
                if (!id) {
                    return of(true);
                }
                const confirmation = window.confirm(
                    '저장하지 않은 카드 평가가 존재합니다. 계속 하시겠습니까??',
                );
                return of(confirmation);
            }),
        );
    }
}
