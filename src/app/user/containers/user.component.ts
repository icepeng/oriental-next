import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map, filter } from 'rxjs/operators';
import * as UserAction from '../actions/user.actions';
import * as fromUser from '../reducers';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `
            .content-container {
                max-width: 1048px;
            }
        `,
    ],
})
export class UserComponent implements OnInit {
    user$ = this.store.select(fromUser.getSelectedUser);
    battletag$: Observable<string>;

    @HostBinding('class.u-main-container') main = true;

    constructor(private route: ActivatedRoute, private store: Store<any>) {}

    ngOnInit() {
        this.route.paramMap.pipe(take(1)).subscribe(paramMap => {
            this.store.dispatch(new UserAction.Select(paramMap.get('id')));
        });
        this.battletag$ = this.user$.pipe(
            filter(x => !!x),
            map(x => x.battletag),
        );
    }
}
