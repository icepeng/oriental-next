import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromResponse from '../selectors/response.selectors';

@Component({
    selector: 'app-survey-write-review',
    templateUrl: './survey-write-review.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyWriteReviewComponent implements OnInit {
    cardResponses$ = this.store.select(fromResponse.getSelectedResponseCardResponses);
    cardMin$: Observable<boolean>;
    expansionRequired$: Observable<boolean>;

    constructor(private store: Store<any>, private router: Router) {}

    ngOnInit() {}

    onSubmit() {}
}
