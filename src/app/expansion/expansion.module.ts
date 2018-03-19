import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ExpansionDetailComponent } from './containers/expansion-detail.component';
import { ExpansionListComponent } from './containers/expansion-list.component';
import { ExpansionEffects } from './effects/expansion.effects';
import * as fromExpansion from './reducers';
import { ExpansionService } from './services/expansion.service';

@NgModule({
    imports: [CommonModule, ClarityModule, RouterModule],
    declarations: [ExpansionListComponent, ExpansionDetailComponent],
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
                children: [
                    {
                        path: ':id',
                        component: ExpansionDetailComponent,
                    },
                    {
                        path: '',
                        component: ExpansionListComponent,
                    },
                ],
            },
        ]),
    ],
})
export class RootExpansionModule {}
