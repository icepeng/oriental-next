import {
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    HostBinding,
    SimpleChanges,
    ChangeDetectorRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { Subject } from 'rxjs/Subject';
import { takeUntil, combineLatest, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Directive({
    selector: '[appLocalCardImg]',
})
export class LocalCardImageDirective implements OnInit, OnChanges, OnDestroy {
    @Input() id: string;
    @HostBinding('attr.src') src: string;

    id$ = new BehaviorSubject<string>(null);
    unsubscribe$: Subject<void> = new Subject<void>();

    constructor(private store: Store<any>, private _ref: ChangeDetectorRef) {}

    ngOnInit() {
        this.store
            .select(fromRoot.getLocalCards)
            .pipe(
                combineLatest(this.id$),
                map(([cards, id]) => cards[id].imgLink),
                takeUntil(this.unsubscribe$),
            )
            .subscribe(imgLink => {
                this.src = imgLink;
                this._ref.markForCheck();
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.id$.next(changes.id.currentValue);
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
