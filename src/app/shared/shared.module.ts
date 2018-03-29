import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LocalCardDirective } from './local-card.directive';
import { LocalUIDirective } from './local-ui.directive';

@NgModule({
    imports: [CommonModule],
    exports: [LocalCardDirective, LocalUIDirective],
    declarations: [LocalCardDirective, LocalUIDirective],
})
export class SharedModule {}
