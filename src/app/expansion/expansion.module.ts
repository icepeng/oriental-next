import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxEchartsModule } from 'ngx-echarts';

import { CardAverageChartComponent } from './components/card-average-chart.component';
import { ExpansionRatingChartComponent } from './components/expansion-rating-chart.component';
import { ExpansionDetailComponent } from './containers/expansion-detail.component';
import { ExpansionListComponent } from './containers/expansion-list.component';
import { ExpansionSummaryComponent } from './containers/expansion-summary.component';
import { ExpansionComponent } from './containers/expansion.component';
import { ExpansionEffects } from './effects/expansion.effects';
import * as fromExpansion from './reducers';
import { ExpansionService } from './services/expansion.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        RouterModule,
        NgxEchartsModule,
        SharedModule,
    ],
    declarations: [
        ExpansionListComponent,
        ExpansionDetailComponent,
        ExpansionRatingChartComponent,
        CardAverageChartComponent,
        ExpansionComponent,
        ExpansionSummaryComponent,
    ],
})
export class ExpansionModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootExpansionModule,
            providers: [ExpansionService],
        };
    }
}

@NgModule({
    imports: [
        ExpansionModule,
        StoreModule.forFeature('expansion', fromExpansion.reducers),
        EffectsModule.forFeature([ExpansionEffects]),
        RouterModule.forChild([
            {
                path: 'expansions',
                component: ExpansionComponent,
                children: [
                    {
                        path: 'list',
                        component: ExpansionListComponent,
                    },
                    {
                        path: 'summary',
                        component: ExpansionSummaryComponent,
                    },
                    {
                        path: ':id',
                        component: ExpansionDetailComponent,
                    },
                    {
                        path: '',
                        redirectTo: 'summary',
                        pathMatch: 'full',
                    },
                ],
            },
        ]),
    ],
})
export class RootExpansionModule {}
