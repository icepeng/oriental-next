import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { StoreModule } from '@ngrx/store';

import * as fromCard from './reducers';

@NgModule({
    imports: [CommonModule, ClarityModule, RouterModule],
    declarations: [],
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
    imports: [CardModule, StoreModule.forFeature('card', fromCard.reducers)],
})
export class RootCardModule {}
