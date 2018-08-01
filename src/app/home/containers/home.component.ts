import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
    templateUrl: './home.component.html',
    styles: [
        `
            .home {
                display: flex;
                height: 80vh;
                width: 100%;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
            }

            .btn {
                margin-top: 24px;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    @HostBinding('class.u-main-container') main = true;
}
