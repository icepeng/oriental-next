import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { StoreModule } from '@ngrx/store';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedModule } from '../shared/shared.module';
import { CardBasicChartComponent } from './components/card-basic-chart.component';
import { CardFilterComponent } from './components/card-filter.component';
import { CardDetailComponent } from './containers/card-detail.component';
import { CardListComponent } from './containers/card-list.component';
import { CardComponent } from './containers/card.component';
import * as fromCard from './reducers';
import { CardRandomResponseComponent } from './components/card-random-response.component';
import { CardService } from './services/card.service';

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxEchartsModule,
    ],
    declarations: [
        CardListComponent,
        CardDetailComponent,
        CardComponent,
        CardFilterComponent,
        CardBasicChartComponent,
        CardRandomResponseComponent,
    ],
})
export class CardModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootCardModule,
            providers: [CardService],
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
