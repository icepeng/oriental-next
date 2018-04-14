import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LocalCardImageDirective } from './local-card-image.directive';
import { LocalCardDirective } from './local-card.directive';
import { LocalExpansionImageDirective } from './local-expansion-image.directive';
import { LocalExpansionDirective } from './local-expansion.directive';
import { LocalUIDirective } from './local-ui.directive';
import { CardNavigateComponent } from './card-navigate.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, ClarityModule],
    exports: [
        LocalCardImageDirective,
        LocalCardDirective,
        LocalExpansionDirective,
        LocalExpansionImageDirective,
        LocalUIDirective,
        CardNavigateComponent,
    ],
    declarations: [
        LocalCardImageDirective,
        LocalCardDirective,
        LocalExpansionDirective,
        LocalExpansionImageDirective,
        LocalUIDirective,
        CardNavigateComponent,
    ],
})
export class SharedModule {}
