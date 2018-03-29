import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { StoreModule } from '@ngrx/store';

import { CardFilterComponent } from './components/card-filter.component';
import { CardDetailComponent } from './containers/card-detail.component';
import { CardListComponent } from './containers/card-list.component';
import { CardComponent } from './containers/card.component';
import { LocalCardDirective } from './local-card.directive';
import * as fromCard from './reducers';

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        CardListComponent,
        CardDetailComponent,
        CardComponent,
        CardFilterComponent,
        LocalCardDirective,
    ],
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
                component: CardComponent,
                children: [
                    {
                        path: 'list',
                        component: CardListComponent,
                    },
                    {
                        path: ':id',
                        component: CardDetailComponent,
                    },
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                ],
            },
        ]),
    ],
})
export class RootCardModule {}
