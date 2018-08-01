import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { HomeComponent } from './containers/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [CommonModule, SharedModule, RouterModule, ClarityModule],
    declarations: [HomeComponent],
})
export class HomeModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootHomeModule,
            providers: [],
        };
    }
}

@NgModule({
    imports: [
        HomeModule,
        RouterModule.forChild([
            {
                path: 'home',
                component: HomeComponent,
            },
        ]),
    ],
})
export class RootHomeModule {}
