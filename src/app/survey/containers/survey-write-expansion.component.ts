import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest, map, take } from 'rxjs/operators';
import * as SubmitAction from '../actions/submit.actions';
import * as fromForm from '../selectors/form.selectors';
import * as fromResponse from '../selectors/response.selectors';
import * as fromSurvey from '../selectors/survey.selectors';

@Component({
    selector: 'app-survey-write-expansion',
    templateUrl: './survey-write-expansion.component.html',
    styleUrls: ['./survey-write-expansion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyWriteExpansionComponent implements OnInit {
    isLoading$ = this.store.select(fromForm.getFormIsLoading);

    expansion$: Observable<string>;

    formGroup = new FormGroup({
        fun: new FormControl(null, Validators.required),
        balance: new FormControl(null, Validators.required),
        description: new FormControl(''),
    });
    submit = false;

    constructor(
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.expansion$ = this.store
            .select(fromSurvey.getSelectedSurvey)
            .pipe(map(survey => survey.expansion));
        this.store
            .select(fromResponse.getSelectedExpansionResponse)
            .pipe(take(1))
            .subscribe(expansionResponse => {
                console.log(expansionResponse);
                if (!expansionResponse) {
                    return this.formGroup.reset({
                        fun: null,
                        balance: null,
                        description: '',
                    });
                }
                this.formGroup.reset({
                    fun: expansionResponse.fun,
                    balance: expansionResponse.balance,
                    description: expansionResponse.description,
                });
            });
    }

    onSubmit() {
        this.store
            .select(fromSurvey.getSelectedSurveyId)
            .pipe(
                combineLatest(
                    this.store.select(fromResponse.getSelectedResponseId),
                    this.isLoading$,
                ),
                take(1),
            )
            .subscribe(([survey, response, isLoading]) => {
                if (this.formGroup.invalid || isLoading) {
                    return;
                }
                this.store.dispatch(
                    new SubmitAction.SubmitExpansion({
                        form: this.formGroup.value,
                        survey,
                        response,
                    }),
                );
                this.submit = true;
                this.router.navigate(['../', 'review'], {
                    relativeTo: this.route,
                });
            });
    }
}
