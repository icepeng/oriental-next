import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';

import * as FormAction from '../actions/survey-form.actions';
import * as fromSurvey from '../reducers';

@Component({
    selector: 'app-survey-write-expansion',
    templateUrl: './survey-write-expansion.component.html',
    styleUrls: ['./survey-write-expansion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyWriteExpansionComponent implements OnInit {
    expansion$: Observable<string>;

    formGroup = new FormGroup({
        fun: new FormControl(null, Validators.required),
        balance: new FormControl(null, Validators.required),
        description: new FormControl(''),
    });

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
            .select(fromSurvey.getFormExpansion)
            .pipe(take(1))
            .subscribe(formExpansion => {
                if (!formExpansion) {
                    return this.formGroup.reset({
                        fun: null,
                        balance: null,
                        description: '',
                    });
                }
                this.formGroup.reset({
                    fun: formExpansion.fun,
                    balance: formExpansion.balance,
                    description: formExpansion.description,
                });
            });
    }

    onSubmit() {
        this.store.dispatch(
            new FormAction.SubmitExpansion({
                ...this.formGroup.value,
            }),
        );
        this.router.navigate(['../', 'submit'], { relativeTo: this.route });
    }
}
