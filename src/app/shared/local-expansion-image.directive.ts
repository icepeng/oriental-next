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
    selector: '[appLocalExpansionImg]',
})
export class LocalExpansionImageDirective implements OnInit, OnChanges, OnDestroy {
    @Input() code: string;
    @HostBinding('attr.src') src: string;

    code$ = new BehaviorSubject<string>(null);
    unsubscribe$: Subject<void> = new Subject<void>();

    constructor(private store: Store<any>, private _ref: ChangeDetectorRef) {}

    ngOnInit() {
        this.store
            .select(fromRoot.getLocalExpansions)
            .pipe(
                combineLatest(this.code$),
                map(([expansions, code]) => expansions[code].imgLink),
                takeUntil(this.unsubscribe$),
            )
            .subscribe(imgLink => {
                this.src = imgLink;
                this._ref.markForCheck();
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.code$.next(changes.code.currentValue);
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
