import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
    combineLatest,
    filter,
    map,
    take,
    takeUntil,
    withLatestFrom,
} from 'rxjs/operators';
import * as AuthAction from '../../core/actions/auth.actions';
import * as fromRoot from '../../reducers';
import * as fromUser from '../../user/reducers';
import * as ArchiveAction from '../actions/archive.actions';
import * as ResponseAction from '../actions/response.actions';
import * as fromArchiveForm from '../selectors/archive-form.selectors';
import * as fromResponse from '../selectors/response.selectors';
import * as fromResponseView from '../selectors/view.selectors';

@Component({
    selector: 'app-survey-response-view-card',
    templateUrl: './survey-response-view-card.component.html',
    styleUrls: ['./survey-write-card.component.scss'],
    styles: [
        `
            .archive-actions {
                margin-top: 12px;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyResponseViewCardComponent implements OnInit, OnDestroy {
    selectedCardResponse$ = this.store.select(
        fromResponse.getSelectedCardResponse,
    );
    total$ = this.store.select(fromResponseView.getFilteredCardResponsesTotal);
    index$ = this.store.select(fromResponseView.getSelectedCardResponseIndex);
    archives$ = this.store.select(fromResponse.getSelectedCardResponseArchives);
    isLoggedIn$ = this.store.select(fromRoot.getLoggedIn);
    isLoading$ = this.store.select(fromArchiveForm.getArchiveFormIsLoading);
    isModalOpen$ = this.store.select(fromArchiveForm.getArchiveFormIsOpen);
    unsubscribe$: Subject<void> = new Subject<void>();

    points$: Observable<{ current: number; cost: number; result: number }>;
    canArchive$: Observable<boolean>;
    formGroup = new FormGroup({
        description: new FormControl('', Validators.required),
    });

    constructor(
        private store: Store<any>,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.route.paramMap
            .pipe(
                combineLatest(
                    this.store.select(fromResponse.getSelectedResponseId),
                ),
                takeUntil(this.unsubscribe$),
            )
            .subscribe(([paramMap, responseId]) => {
                this.store.dispatch(
                    new ResponseAction.SelectCard(
                        `${paramMap.get('cardId')}-${responseId}`,
                    ),
                );
                this.store.dispatch(new ArchiveAction.Close());
            });
        this.points$ = this.store.select(fromUser.getAuthedUser).pipe(
            filter(user => !!user),
            map(user => {
                return {
                    current: user.point,
                    cost: environment.POINT_REQUIRED_ARCHIVE,
                    result: user.point - environment.POINT_REQUIRED_ARCHIVE,
                };
            }),
        );
        this.canArchive$ = this.points$.pipe(map(points => points.result >= 0));
    }

    onPrev() {
        this.store
            .select(fromResponseView.getFilteredCardResponses)
            .pipe(
                withLatestFrom(this.index$),
                take(1),
            )
            .subscribe(([cardResponses, index]) => {
                if (index <= 0) {
                    return;
                }
                this.router.navigate(['../', cardResponses[index - 1].card], {
                    relativeTo: this.route,
                });
            });
    }

    onNext() {
        this.store
            .select(fromResponseView.getFilteredCardResponses)
            .pipe(
                withLatestFrom(this.index$, this.total$),
                take(1),
            )
            .subscribe(([cardResponses, index, total]) => {
                if (index + 1 >= total) {
                    return;
                }
                this.router.navigate(['../', cardResponses[index + 1].card], {
                    relativeTo: this.route,
                });
            });
    }

    openArchiveForm() {
        this.formGroup.reset({
            description: '',
        });
        this.store.dispatch(new ArchiveAction.Open());
    }

    closeArchiveForm() {
        this.store.dispatch(new ArchiveAction.Close());
    }

    login() {
        this.store.dispatch(new AuthAction.Login());
    }

    submitArchive() {
        this.selectedCardResponse$.pipe(take(1)).subscribe(cardResponse => {
            this.store.dispatch(
                new ArchiveAction.Submit({
                    description: this.formGroup.value.description,
                    cardResponse: cardResponse.pid,
                }),
            );
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
