import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    OnInit,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ArchiveView } from '../../survey/models/archive.model';
import { ArchiveService } from '../../survey/services/archive.service';

@Component({
    templateUrl: './home.component.html',
    styles: [
        `
            .home {
                display: flex;
                height: 80vh;
                width: 100%;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
            }

            .archives {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
            }

            .discord {
                margin-top: 96px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
            }

            .archives-wrapper {
                width: 100%;
                max-width: 800px;
            }

            .btn {
                margin-top: 24px;
            }

            .card-img img {
                max-height: 240px;
                width: auto;
                margin: 12px auto;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    @HostBinding('class.u-main-container') main = true;

    recentArchives$: Observable<(ArchiveView)[]>;

    constructor(private archiveService: ArchiveService) {}

    ngOnInit() {
        this.recentArchives$ = this.archiveService.getRecent();
    }
}
