import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { EffectsModule } from '@ngrx/effects';
import {
    RouterStateSerializer,
    StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'environments/environment';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { CardModule } from './card/card.module';
import { CoreModule } from './core/core.module';
import { EstimateModule } from './estimate/estimate.module';
import { ExpansionModule } from './expansion/expansion.module';
import { HomeModule } from './home/home.module';
import { metaReducers, reducers } from './reducers';
import { appRoutes } from './routes';
import { SharedModule } from './shared/shared.module';
import { CustomRouterStateSerializer } from './shared/utils';
import { SurveyModule } from './survey/survey.module';

@NgModule({
    declarations: [AppComponent, AboutComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ClarityModule,
        RouterModule.forRoot(appRoutes),
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
        }),
        StoreDevtoolsModule.instrument({
            name: 'Oriental Salad Store DevTools',
            logOnly: environment.production,
        }),
        EffectsModule.forRoot([]),
        SharedModule,
        HomeModule.forRoot(),
        ExpansionModule.forRoot(),
        CardModule.forRoot(),
        EstimateModule.forRoot(),
        SurveyModule.forRoot(),
        CoreModule.forRoot(),
    ],
    providers: [
        {
            provide: RouterStateSerializer,
            useClass: CustomRouterStateSerializer,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
