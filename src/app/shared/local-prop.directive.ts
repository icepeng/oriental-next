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
    selector: '[appLocalProp]',
})
export class LocalPropDirective implements OnInit, OnChanges, OnDestroy {
    @Input() appLocalProp: number;
    @Input() prop: string;
    @HostBinding('innerText') text: string;

    plain$ = new BehaviorSubject<string>(null);
    unsubscribe$: Subject<void> = new Subject<void>();

    constructor(private store: Store<any>, private _ref: ChangeDetectorRef) {}

    ngOnInit() {
        this.store
            .select(fromRoot.getLocalPropName)
            .pipe(
                combineLatest(this.plain$),
                map(([propName, plain]) => propName[this.prop][this.appLocalProp]),
                takeUntil(this.unsubscribe$),
            )
            .subscribe(text => {
                this.text = text || this.appLocalProp;
                this._ref.markForCheck();
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.plain$.next(changes.appLocalProp.currentValue);
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
