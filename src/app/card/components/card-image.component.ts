import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardImageComponent implements OnInit {
  @Input() id: string;

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

}
