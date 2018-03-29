import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Expansion from './expansion/actions/expansion.actions';
import * as LocaleModal from './core/actions/locale-modal.actions';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private router: Router, private store: Store<any>) {}

    ngOnInit() {
        this.store.dispatch(new Expansion.Load());
    }

    openLocaleModal() {
        this.store.dispatch(new LocaleModal.Open());
    }
}
