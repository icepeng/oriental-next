import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styles: [
        `.content-area {
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;
    max-width: 1056px;
    margin: 0 auto;
  }
  `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
