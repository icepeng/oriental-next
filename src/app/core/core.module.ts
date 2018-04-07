import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { LocaleModalComponent } from './containers/locale-modal.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { HttpAuth } from './services/http-auth.service';

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
            providers: [AuthService, AuthGuard, HttpAuth],
        };
    }
}
