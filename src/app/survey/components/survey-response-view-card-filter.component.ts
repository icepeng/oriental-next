import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Classes, Rarity } from '../../card/models/card.model';
import { ResponseViewCardFilter } from '../models/filter.model';

@Component({
    selector: 'app-survey-response-view-card-filter',
    templateUrl: './survey-response-view-card-filter.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyResponseViewCardFilterComponent implements OnInit, OnDestroy {
    @Input()
    set filter(value: ResponseViewCardFilter) {
        if (this.formGroup.dirty) {
            return;
        }
        this.formGroup.reset(value);
    }
    @Output('filterChange')
    filterChange = new EventEmitter<ResponseViewCardFilter>();

    classFilter: (Classes | 'NEUTRAL')[] = [
        'MAGE',
        'WARLOCK',
        'SHAMAN',
        'PALADIN',
        'PRIEST',
        'ROGUE',
        'DRUID',
        'HUNTER',
        'WARRIOR',
        'NEUTRAL',
    ];
    costFilter = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    rarityFilter: Rarity[] = ['COMMON', 'RARE', 'EPIC', 'LEGENDARY'];
    formGroup = new FormGroup({
        class: new FormControl(),
        cost: new FormControl(),
        rarity: new FormControl(),
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
