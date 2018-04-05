import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { SharedModule } from '../shared/shared.module';
import { SurveyGuideComponent } from './containers/survey-guide.component';
import { SurveyListComponent } from './containers/survey-list.component';
import { SurveyResponseListComponent } from './containers/survey-response-list.component';
import { SurveyResponseViewComponent } from './containers/survey-response-view.component';
import { SurveyWriteCardComponent } from './containers/survey-write-card.component';
import { SurveyWriteExpansionComponent } from './containers/survey-write-expansion.component';
import { SurveyWriteComponent } from './containers/survey-write.component';
import { SurveyComponent } from './containers/survey.component';

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
    ],
})
export class SurveyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootSurveyModule,
            providers: [],
        };
    }
}

@NgModule({
    imports: [
        SurveyModule,
        // StoreModule.forFeature('estimate', fromSurvey.reducers),
        RouterModule.forChild([
            {
                path: 'survey',
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
