import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as LocaleModal from '../actions/locale-modal.actions';
import * as Localization from '../actions/localization.actions';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-locale-modal',
    templateUrl: './locale-modal.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocaleModalComponent implements OnInit {
    isOpen$ = this.store.select(fromRoot.getLocaleModalIsOpen);
    formGroup = new FormGroup({
        locale: new FormControl('ko-kr'),
    });

    constructor(private store: Store<any>) {}

    ngOnInit() {}

    approve() {
        this.store.dispatch(new Localization.Set(this.formGroup.value.locale));
    }

    cancel() {
        this.store.dispatch(new LocaleModal.Close());
    }
}
