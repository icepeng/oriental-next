import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from '../core/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { SurveyCardFilterComponent } from './components/survey-card-filter.component';
import { SurveyGuideComponent } from './containers/survey-guide.component';
import { SurveyListComponent } from './containers/survey-list.component';
import { SurveyResponseListComponent } from './containers/survey-response-list.component';
import { SurveyResponseViewComponent } from './containers/survey-response-view.component';
import { SurveyWriteCardComponent } from './containers/survey-write-card.component';
import { SurveyWriteExpansionComponent } from './containers/survey-write-expansion.component';
import { SurveyWriteSubmitComponent } from './containers/survey-write-submit.component';
import { SurveyWriteComponent } from './containers/survey-write.component';
import { SurveyComponent } from './containers/survey.component';
import { reducers } from './reducers';
import { WriteCanDeactivateGuard } from './services/write-can-deactivate.guard';
import { WriteCardCanDeactivateGuard } from './services/write-card-can-deactivate.guard';
import { WriteExpansionCanDeactivateGuard } from './services/write-expansion-can-deactivate.guard';

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
        SurveyWriteCardComponent,
        SurveyWriteExpansionComponent,
        SurveyComponent,
        SurveyGuideComponent,
        SurveyListComponent,
        SurveyWriteComponent,
        SurveyResponseListComponent,
        SurveyResponseViewComponent,
        SurveyCardFilterComponent,
        SurveyWriteSubmitComponent,
    ],
})
export class SurveyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootSurveyModule,
            providers: [
                WriteCardCanDeactivateGuard,
                WriteCanDeactivateGuard,
                WriteExpansionCanDeactivateGuard,
            ],
        };
    }
}

@NgModule({
    imports: [
        SurveyModule,
        StoreModule.forFeature('survey', reducers),
        RouterModule.forChild([
            {
                path: 'surveys',
                component: SurveyComponent,
                children: [
                    {
                        path: 'guide',
                        component: SurveyGuideComponent,
                    },
                    {
                        path: 'list',
                        component: SurveyListComponent,
                    },
                    {
                        path: ':id/write',
                        component: SurveyWriteComponent,
                        canActivate: [AuthGuard],
                        canDeactivate: [WriteCanDeactivateGuard],
                        children: [
                            {
                                path: 'cards',
                                component: SurveyWriteCardComponent,
                                canDeactivate: [WriteCardCanDeactivateGuard],
                            },
                            {
                                path: 'expansion',
                                component: SurveyWriteExpansionComponent,
                                canDeactivate: [
                                    WriteExpansionCanDeactivateGuard,
                                ],
                            },
                            {
                                path: 'submit',
                                component: SurveyWriteSubmitComponent,
                            },
                            {
                                path: '',
                                redirectTo: 'cards',
                                pathMatch: 'full',
                            },
                        ],
                    },
                    {
                        path: ':id/responses',
                        component: SurveyResponseListComponent,
                    },
                    {
                        path: ':surveyId/responses/:id',
                        component: SurveyResponseViewComponent,
                    },
                    { path: '', redirectTo: 'guide', pathMatch: 'full' },
                ],
            },
        ]),
    ],
})
export class RootSurveyModule {}
