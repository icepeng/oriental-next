import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';
import * as fromSurvey from '../../survey/selectors/survey.selectors';
import * as ExpansionActions from '../actions/expansion.actions';
import * as fromExpansion from '../reducers';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-expansion-detail',
    templateUrl: './expansion-detail.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionDetailComponent implements OnInit {
    selectedId$ = this.store.select(fromExpansion.getSelectedExpansionId);
    stats$ = this.store.select(fromExpansion.getSelectedExpansionStats);
    surveyEntities$ = this.store.select(fromSurvey.getSurveyEntities);
    isStatAvailable$: Observable<boolean>;

    constructor(private store: Store<any>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap
            .pipe(take(1))
            .subscribe(params =>
                this.store.dispatch(
                    new ExpansionActions.Select(params.get('id')),
                ),
            );
        this.isStatAvailable$ = this.stats$.pipe(
            map(stats => stats.length > 0),
        );
    }
}
