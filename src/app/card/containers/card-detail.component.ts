import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
    combineLatest,
    map,
    switchMap,
    take,
    takeUntil,
    withLatestFrom,
} from 'rxjs/operators';
import * as fromSurvey from '../../survey/selectors/survey.selectors';
import * as CardActions from '../actions/card.actions';
import { CardResponseView } from '../models/response.model';
import * as fromCard from '../reducers';
import { CardService } from '../services/card.service';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.component.html',
    styles: [
        `
            .wrapper {
                max-width: 1056px;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDetailComponent implements OnInit, OnDestroy {
    selectedId$ = this.store.select(fromCard.getSelectedCardId);
    total$ = this.store.select(fromCard.getFilteredCardsTotal);
    index$ = this.store.select(fromCard.getSelectedCardIndex);
    stats$ = this.store.select(fromCard.getSelectedCardStats);
    surveyEntities$ = this.store.select(fromSurvey.getSurveyEntities);

    isStatAvailable$: Observable<boolean>;
    responses$: Observable<CardResponseView[]>;
    refresh$ = new BehaviorSubject<string>('click');

    unsubscribe$ = new Subject<void>();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<any>,
        private cardService: CardService,
    ) {}

    ngOnInit() {
        this.route.paramMap
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(params =>
                this.store.dispatch(new CardActions.Select(params.get('id'))),
            );
        this.responses$ = this.selectedId$.pipe(
            combineLatest(this.refresh$),
            switchMap(([id]) => this.cardService.getRandomResponses(id)),
        );
        this.isStatAvailable$ = this.stats$.pipe(
            map(stats => stats.length > 0),
        );
    }

    onPrev() {
        this.store
            .select(fromCard.getFilteredCards)
            .pipe(
                withLatestFrom(this.index$),
                take(1),
            )
            .subscribe(([cards, index]) => {
                if (index <= 0) {
                    return;
                }
                this.router.navigate(['../', cards[index - 1].id], {
                    relativeTo: this.route,
                });
            });
    }

    onNext() {
        this.store
            .select(fromCard.getFilteredCards)
            .pipe(
                withLatestFrom(this.index$, this.total$),
                take(1),
            )
            .subscribe(([cards, index, total]) => {
                if (index + 1 >= total) {
                    return;
                }
                this.router.navigate(['../', cards[index + 1].id], {
                    relativeTo: this.route,
                });
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
