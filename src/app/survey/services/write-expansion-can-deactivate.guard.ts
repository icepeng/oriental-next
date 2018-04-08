import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { SurveyWriteExpansionComponent } from '../containers/survey-write-expansion.component';
import * as fromSurvey from '../reducers';

@Injectable()
export class WriteExpansionCanDeactivateGuard
    implements CanDeactivate<SurveyWriteExpansionComponent> {
    constructor(private store: Store<any>) {}

    canDeactivate(
        component: SurveyWriteExpansionComponent,
    ): Observable<boolean> | boolean {
        if (!component.formGroup.dirty || component.submit) {
            return true;
        }
        const confirmation = window.confirm(
            '저장하지 않은 확장팩 평가가 존재합니다. 계속 하시겠습니까??',
        );
        return of(confirmation);
    }
}
