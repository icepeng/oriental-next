import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedModule } from '../shared/shared.module';
import { ExpansionBasicChartComponent } from './components/expansion-basic-chart.component';
import { ExpansionDetailComponent } from './containers/expansion-detail.component';
import { ExpansionListComponent } from './containers/expansion-list.component';
import { ExpansionComponent } from './containers/expansion.component';
import { ExpansionEffects } from './effects/expansion.effects';
import * as fromExpansion from './reducers';
import { ExpansionService } from './services/expansion.service';
import { ExpansionRandomResponseComponent } from './components/expansion-random-response.component';

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
        ExpansionBasicChartComponent,
        ExpansionComponent,
        ExpansionRandomResponseComponent,
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
                        path: ':id',
                        component: ExpansionDetailComponent,
                    },
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                ],
            },
        ]),
    ],
})
export class RootExpansionModule {}
