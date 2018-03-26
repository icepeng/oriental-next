import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { StoreModule } from '@ngrx/store';

import * as fromCard from './reducers';
import { CardListComponent } from './containers/card-list.component';
import { CardDetailComponent } from './containers/card-detail.component';

@NgModule({
    imports: [CommonModule, ClarityModule, RouterModule],
    declarations: [CardListComponent, CardDetailComponent],
})
export class CardModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootCardModule,
            providers: [],
        };
    }
}

@NgModule({
    imports: [
        CardModule,
        StoreModule.forFeature('card', fromCard.reducers),
        RouterModule.forChild([
            {
                path: 'cards',
                children: [
                    {
                        path: ':id',
                        component: CardDetailComponent,
                    },
                    {
                        path: '',
                        component: CardListComponent,
                    },
                ],
            },
        ]),
    ],
})
export class RootCardModule {}
