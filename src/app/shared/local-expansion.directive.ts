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
import { takeUntil, combineLatest, map, filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Directive({
    selector: '[appLocalExpansion]',
})
export class LocalExpansionDirective implements OnInit, OnChanges, OnDestroy {
    @Input() code: string;
    @Input() prop: string;
    @HostBinding('innerText') text: string;

    code$ = new BehaviorSubject<string>(null);
    prop$ = new BehaviorSubject<string>(null);
    unsubscribe$: Subject<void> = new Subject<void>();

    constructor(private store: Store<any>, private _ref: ChangeDetectorRef) {}

    ngOnInit() {
        this.store
            .select(fromRoot.getLocalExpansions)
            .pipe(
                combineLatest(this.code$, this.prop$),
                filter(([expansions, code, prop]) => !!code && !!prop),
                map(([expansions, code, prop]) => expansions[code][prop]),
                takeUntil(this.unsubscribe$),
            )
            .subscribe(text => {
                this.text = text;
                this._ref.markForCheck();
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.code) {
            this.code$.next(changes.code.currentValue);
        }
        if (changes.prop) {
            this.prop$.next(changes.prop.currentValue);
        }
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
