import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LocaleModalComponent } from './containers/locale-modal.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ClarityModule],
    exports: [LocaleModalComponent],
    declarations: [LocaleModalComponent],
    providers: [],
})
export class CoreModule {
    static forRoot() {
        return {
            ngModule: CoreModule,
            providers: [],
        };
    }
}
