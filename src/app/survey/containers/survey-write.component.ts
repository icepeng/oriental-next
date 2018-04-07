import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

import * as FilterAction from '../actions/filter.actions';
import * as SurveyAction from '../actions/survey.actions';

@Component({
    selector: 'app-survey-write',
    templateUrl: './survey-write.component.html',
    styles: [`.wrapper { max-width: 1056px; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyWriteComponent implements OnInit {
    constructor(private store: Store<any>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap
            .pipe(map(paramMap => paramMap.get('id')), take(1))
            .subscribe(id => this.store.dispatch(new SurveyAction.Select(id)));
        this.store.dispatch(new FilterAction.ResetFilter());
    }
}
