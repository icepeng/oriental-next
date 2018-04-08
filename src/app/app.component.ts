import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AuthAction from './core/actions/auth.actions';
import * as LocaleModal from './core/actions/locale-modal.actions';
import * as Expansion from './expansion/actions/expansion.actions';
import * as fromUser from './user/reducers';
import * as fromExpansion from './expansion/reducers';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    authedUser$ = this.store.select(fromUser.getAuthedUser);
    expansions$ = this.store.select(fromExpansion.getTotalExpansions);

    constructor(private router: Router, private store: Store<any>) {}

    ngOnInit() {
        this.store.dispatch(new Expansion.Load());
        this.store.dispatch(
            new AuthAction.LoginSuccess({
                token:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2NTgxMjQ3IiwiYmF0dGxldGFnIjoiUHJvZGlneSMzMTI4MSIsImlhdCI6MTUyMzIwMTg2MiwiZXhwIjoxNTIzMjE2MjYyfQ.Shi36lEEBsq3k2sRU9dmv314PaQZFErdc4pdy4tH5pU',
                decoded: {
                    id: '16581247',
                    battletag: 'Prodigy#31281',
                    exp: 123123123123
                },
            }),
        );
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
