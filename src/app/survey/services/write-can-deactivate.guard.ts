import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { SurveyWriteComponent } from '../containers/survey-write.component';

@Injectable()
export class WriteCanDeactivateGuard
    implements CanDeactivate<SurveyWriteComponent> {
    canDeactivate(
        component: SurveyWriteComponent,
    ): Observable<boolean> | boolean {
        const confirmation = window.confirm(
            '저장하지 않은 기록이 삭제됩니다. 계속 하시겠습니까??',
        );
        return of(confirmation);
    }
}
