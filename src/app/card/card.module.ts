import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { CardFilterComponent } from './components/card-filter.component';
import { CardNavigateComponent } from './components/card-navigate.component';
import { CardDetailComponent } from './containers/card-detail.component';
import { CardListComponent } from './containers/card-list.component';
import { CardSummaryComponent } from './containers/card-summary.component';
import { CardComponent } from './containers/card.component';
import * as fromCard from './reducers';

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    declarations: [
        CardListComponent,
        CardDetailComponent,
        CardComponent,
        CardFilterComponent,
        CardNavigateComponent,
        CardSummaryComponent,
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
                        path: 'summary',
                        component: CardSummaryComponent,
                    },
                    {
                        path: ':id',
                        component: CardDetailComponent,
                    },
                    { path: '', redirectTo: 'summary', pathMatch: 'full' },
                ],
            },
        ]),
    ],
})
export class RootCardModule {}
