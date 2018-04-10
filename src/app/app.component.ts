import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthAction from './core/actions/auth.actions';
import * as LocaleModal from './core/actions/locale-modal.actions';
import * as Expansion from './expansion/actions/expansion.actions';
import * as fromExpansion from './expansion/reducers';
import * as fromUser from './user/reducers';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    authedUser$ = this.store.select(fromUser.getAuthedUser);
    expansions$ = this.store.select(fromExpansion.getTotalExpansions);

    constructor(
        private router: Router,
        private store: Store<any>,
        public angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    ) {}

    ngOnInit() {
        this.store.dispatch(new Expansion.Load());
    }

    openLocaleModal() {
        this.store.dispatch(new LocaleModal.Open());
    }

    logout() {
        this.store.dispatch(new AuthAction.Logout());
    }

    login() {
        this.store.dispatch(new AuthAction.Login());
    }
}
