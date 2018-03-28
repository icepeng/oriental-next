import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as fromRoot from '../../reducers';
import { combineLatest, map } from 'rxjs/operators';

@Component({
    selector: 'app-card-image',
    templateUrl: './card-image.component.html',
    styles: [
        `
    .card-img {
      width: 100%;
    }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardImageComponent implements OnInit, OnChanges {
    @Input() id: string;

    imgLink$: Observable<string>;
    id$ = new BehaviorSubject<string>(null);

    constructor(private store: Store<any>) {}

    ngOnInit() {
        this.imgLink$ = this.store
            .select(fromRoot.getLocalCards)
            .pipe(
                combineLatest(this.id$),
                map(([cards, id]) => (id ? cards[id].imgLink : null)),
            );
    }

    ngOnChanges(changes: SimpleChanges) {
        this.id$.next(changes.id.currentValue);
    }
}
