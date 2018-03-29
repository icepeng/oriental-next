import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    styleUrls: ['./about.component.scss'],
    templateUrl: './about.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
