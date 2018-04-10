import { HttpClientModule } from '@angular/common/http';
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
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { environment } from 'environments/environment';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { CardModule } from './card/card.module';
import { CoreModule } from './core/core.module';
import { AuthEffects } from './core/effects/auth.effects';
import { ExpansionModule } from './expansion/expansion.module';
import { HomeModule } from './home/home.module';
import { metaReducers, reducers } from './reducers';
import { appRoutes } from './routes';
import { SharedModule } from './shared/shared.module';
import { CustomRouterStateSerializer } from './shared/utils';
import { SurveyModule } from './survey/survey.module';
import { UserModule } from './user/user.module';

@NgModule({
    declarations: [AppComponent, AboutComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ClarityModule,
        RouterModule.forRoot(appRoutes),
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
        }),
        // StoreDevtoolsModule.instrument({
        //     name: 'Oriental Salad Store DevTools',
        //     logOnly: environment.production,
        // }),
        EffectsModule.forRoot([AuthEffects]),
        Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
        SharedModule,
        HomeModule.forRoot(),
        ExpansionModule.forRoot(),
        CardModule.forRoot(),
        SurveyModule.forRoot(),
        CoreModule.forRoot(),
        UserModule.forRoot(),
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
