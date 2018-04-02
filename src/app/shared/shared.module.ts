import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LocalCardImageDirective } from './local-card-image.directive';
import { LocalCardDirective } from './local-card.directive';
import { LocalExpansionImageDirective } from './local-expansion-image.directive';
import { LocalExpansionDirective } from './local-expansion.directive';
import { LocalUIDirective } from './local-ui.directive';

@NgModule({
    imports: [CommonModule],
    exports: [
        LocalCardImageDirective,
        LocalCardDirective,
        LocalExpansionDirective,
        LocalExpansionImageDirective,
        LocalUIDirective,
    ],
    declarations: [
        LocalCardImageDirective,
        LocalCardDirective,
        LocalExpansionDirective,
        LocalExpansionImageDirective,
        LocalUIDirective,
    ],
})
export class SharedModule {}
