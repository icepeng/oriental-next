import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { SharedModule } from '../shared/shared.module';
import { SurveyCardComponent } from './containers/survey-card.component';
import { SurveyExpansionComponent } from './containers/survey-expansion.component';
import { SurveyComponent } from './containers/survey.component';
import { SurveyGuideComponent } from './containers/survey-guide.component';

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
        SurveyCardComponent,
        SurveyExpansionComponent,
        SurveyComponent,
        SurveyGuideComponent,
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
                        path: 'cards',
                        component: SurveyCardComponent,
                    },
                    {
                        path: 'expansion',
                        component: SurveyExpansionComponent,
                    },
                    { path: '', redirectTo: 'guide', pathMatch: 'full' },
                ],
            },
        ]),
    ],
})
export class RootSurveyModule {}
