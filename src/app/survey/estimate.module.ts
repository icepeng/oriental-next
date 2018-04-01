import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { SharedModule } from '../shared/shared.module';
import { EstimateListComponent } from './containers/estimate-list.component';
import { EstimateSummaryComponent } from './containers/estimate-summary.component';
import { EstimateComponent } from './containers/estimate.component';

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
        EstimateListComponent,
        EstimateComponent,
        EstimateSummaryComponent,
    ],
})
export class EstimateModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootEstimateModule,
            providers: [],
        };
    }
}

@NgModule({
    imports: [
        EstimateModule,
        // StoreModule.forFeature('estimate', fromEstimate.reducers),
        RouterModule.forChild([
            {
                path: 'estimates',
                component: EstimateComponent,
                children: [
                    {
                        path: 'list',
                        component: EstimateListComponent,
                    },
                    {
                        path: 'summary',
                        component: EstimateSummaryComponent,
                    },
                    // {
                    //     path: ':id',
                    //     component: EstimateDetailComponent,
                    // },
                    { path: '', redirectTo: 'summary', pathMatch: 'full' },
                ],
            },
        ]),
    ],
})
export class RootEstimateModule {}
