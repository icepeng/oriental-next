import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-survey-success',
  templateUrl: './survey-success.component.html',
  styles: [`
  .wrapper {
    padding-top: 240px;
    text-align: center;
  }

  .btn {
      margin-top: 24px;
  }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurveySuccessComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
