import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DummyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
