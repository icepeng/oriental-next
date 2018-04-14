import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxEchartsModule } from 'ngx-echarts';
import { AuthGuard } from '../core/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { CardResponseRatioComponent } from './components/card-response-ratio.component';
import { SurveyCardFilterComponent } from './components/survey-card-filter.component';
import { SurveyGuideComponent } from './components/survey-guide.component';
import { SurveyResponseViewCardFilterComponent } from './components/survey-response-view-card-filter.component';
import { SurveyStatCardsComponent } from './components/survey-stat-cards.component';
import { SurveyListComponent } from './containers/survey-list.component';
import { SurveyPrepareComponent } from './containers/survey-prepare.component';
import { SurveyResponseViewCardListComponent } from './containers/survey-response-view-card-list.component';
import { SurveyResponseViewCardComponent } from './containers/survey-response-view-card.component';
import { SurveyResponseViewExpansionComponent } from './containers/survey-response-view-expansion.component';
import { SurveyResponseViewSummaryComponent } from './containers/survey-response-view-summary.component';
import { SurveyResponseViewComponent } from './containers/survey-response-view.component';
import { SurveyResultResponseListComponent } from './containers/survey-result-response-list.component';
import { SurveyResultSummaryComponent } from './containers/survey-result-summary.component';
import { SurveyResultComponent } from './containers/survey-result.component';
import { SurveyWriteCardComponent } from './containers/survey-write-card.component';
import { SurveyWriteExpansionComponent } from './containers/survey-write-expansion.component';
import { SurveyWriteReviewComponent } from './containers/survey-write-review.component';
import { SurveyWriteComponent } from './containers/survey-write.component';
import { SurveyComponent } from './containers/survey.component';
import { SurveyFormEffects } from './effects/survey-form.effects';
import { SurveyPrepareEffects } from './effects/survey-prepare.effects';
import { ResponseEffects } from './effects/survey-response.effects';
import { reducers } from './reducers';
import { ResponseGuard } from './services/response-guard.service';
import { ResponseService } from './services/response.service';
import { SurveyService } from './services/survey.service';
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
        NgxEchartsModule,
    ],
    declarations: [
        SurveyWriteCardComponent,
        SurveyWriteExpansionComponent,
        SurveyComponent,
        SurveyGuideComponent,
        SurveyListComponent,
        SurveyWriteComponent,
        SurveyResponseViewComponent,
        SurveyCardFilterComponent,
        SurveyWriteReviewComponent,
        CardResponseRatioComponent,
        SurveyPrepareComponent,
        SurveyResponseViewSummaryComponent,
        SurveyResponseViewCardListComponent,
        SurveyResponseViewCardComponent,
        SurveyResponseViewExpansionComponent,
        SurveyResponseViewCardFilterComponent,
        SurveyResultComponent,
        SurveyResultSummaryComponent,
        SurveyResultResponseListComponent,
        SurveyStatCardsComponent,
    ],
})
export class SurveyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootSurveyModule,
            providers: [
                SurveyService,
                ResponseService,
                WriteCardCanDeactivateGuard,
                WriteExpansionCanDeactivateGuard,
                ResponseGuard,
            ],
        };
    }
}

@NgModule({
    imports: [
        SurveyModule,
        StoreModule.forFeature('survey', reducers),
        EffectsModule.forFeature([
            SurveyFormEffects,
            SurveyPrepareEffects,
            ResponseEffects,
        ]),
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
                        path: ':surveyId/prepare',
                        component: SurveyPrepareComponent,
                        canActivate: [AuthGuard],
                    },
                    {
                        path: ':surveyId/responses/:id/write',
                        component: SurveyWriteComponent,
                        canActivate: [AuthGuard],
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
                                path: 'review',
                                component: SurveyWriteReviewComponent,
                            },
                            {
                                path: '',
                                redirectTo: 'cards',
                                pathMatch: 'full',
                            },
                        ],
                    },
                    {
                        path: ':surveyId/result',
                        component: SurveyResultComponent,
                        children: [
                            {
                                path: 'summary',
                                component: SurveyResultSummaryComponent,
                            },
                            {
                                path: 'responses',
                                component: SurveyResultResponseListComponent,
                            },
                            {
                                path: '',
                                redirectTo: 'summary',
                                pathMatch: 'full',
                            },
                        ],
                    },
                    {
                        path: ':surveyId/responses/:responseId/view',
                        component: SurveyResponseViewComponent,
                        canActivate: [ResponseGuard],
                        children: [
                            {
                                path: 'cards/:cardId',
                                component: SurveyResponseViewCardComponent,
                            },
                            {
                                path: 'cards',
                                component: SurveyResponseViewCardListComponent,
                            },
                            {
                                path: 'expansion',
                                component: SurveyResponseViewExpansionComponent,
                            },
                            {
                                path: 'summary',
                                component: SurveyResponseViewSummaryComponent,
                            },
                            {
                                path: '',
                                redirectTo: 'summary',
                                pathMatch: 'full',
                            },
                        ],
                    },
                    { path: '', redirectTo: 'guide', pathMatch: 'full' },
                ],
            },
        ]),
    ],
})
export class RootSurveyModule {}
