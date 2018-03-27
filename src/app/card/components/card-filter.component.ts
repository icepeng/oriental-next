import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit,
    Output,
    EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { Classes, Rarity } from '../models/card.model';
import { CardFilter } from '../models/filter.model';

@Component({
    selector: 'app-card-filter',
    templateUrl: './card-filter.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFilterComponent implements OnInit, OnDestroy {
    @Input()
    set filter(value: CardFilter) {
        if (this.formGroup.dirty) {
            return;
        }
        this.formGroup.reset(value);
    }
    @Output('filterChange') filterChange = new EventEmitter<CardFilter>();

    classFilter: (Classes | 'Neutral')[] = [
        'Mage',
        'Warlock',
        'Shaman',
        'Paladin',
        'Preist',
        'Rogue',
        'Druid',
        'Hunter',
        'Warrior',
    ];
    costFilter = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    rarityFilter: Rarity[] = ['Common', 'Rare', 'Epic', 'Legendary'];
    formGroup = new FormGroup({
        class: new FormControl(),
        cost: new FormControl(),
        rarity: new FormControl(),
        sortColumn: new FormControl(),
        sortOrder: new FormControl(),
    });
    unsubscribe$: Subject<void> = new Subject<void>();

    constructor() {}

    ngOnInit() {
        this.formGroup.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(value => this.filterChange.emit(value));
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
