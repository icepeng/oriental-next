import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: './home.component.html',
    styles: [
        `
    .home {
        padding-top: 240px;
        text-align: center;
    }

    .btn {
        margin-top: 24px;
    }`,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
