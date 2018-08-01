import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { combineLatest, map, switchMap, take } from 'rxjs/operators';
import * as fromSurvey from '../../survey/selectors/survey.selectors';
import * as ExpansionActions from '../actions/expansion.actions';
import { ExpansionResponseView } from '../models/response.model';
import * as fromExpansion from '../reducers';
import { ExpansionService } from '../services/expansion.service';

@Component({
    selector: 'app-expansion-detail',
    templateUrl: './expansion-detail.component.html',
    styles: [
        `
            .expansion-img {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .expansion-img img {
                max-height: 240px;
            }
            .wrapper {
                max-width: 1048px;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionDetailComponent implements OnInit {
    selectedId$ = this.store.select(fromExpansion.getSelectedExpansionId);
    stats$ = this.store.select(fromExpansion.getSelectedExpansionStats);
    surveyEntities$ = this.store.select(fromSurvey.getSurveyEntities);
    isStatAvailable$: Observable<boolean>;
    responses$: Observable<ExpansionResponseView[]>;
    refresh$ = new BehaviorSubject<string>('click');

    constructor(
        private store: Store<any>,
        private route: ActivatedRoute,
        private expansionService: ExpansionService,
    ) {}

    ngOnInit() {
        this.route.paramMap
            .pipe(take(1))
            .subscribe(params =>
                this.store.dispatch(
                    new ExpansionActions.Select(params.get('id')),
                ),
            );
        this.responses$ = this.selectedId$.pipe(
            combineLatest(this.refresh$),
            switchMap(([id]) => this.expansionService.getRandomResponses(id)),
        );
        this.isStatAvailable$ = this.stats$.pipe(
            map(stats => stats.length > 0),
        );
    }
}
