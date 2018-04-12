import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedModule } from '../shared/shared.module';
import { UserResponseListComponent } from './containers/user-response-list.component';
import { UserComponent } from './containers/user.component';
import { UserEffects } from './effects/user.effects';
import * as fromUser from './reducers';
import { UserService } from './services/user.service';

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        RouterModule,
        NgxEchartsModule,
        SharedModule,
    ],
    declarations: [UserComponent, UserResponseListComponent],
})
export class UserModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootUserModule,
            providers: [UserService],
        };
    }
}

@NgModule({
    imports: [
        UserModule,
        StoreModule.forFeature('user', fromUser.reducers),
        EffectsModule.forFeature([UserEffects]),
        RouterModule.forChild([
            {
                path: 'users/:id',
                component: UserComponent,
                children: [
                    { path: 'responses', component: UserResponseListComponent },
                    { path: '', redirectTo: 'responses', pathMatch: 'full' },
                ],
            },
        ]),
    ],
})
export class RootUserModule {}
