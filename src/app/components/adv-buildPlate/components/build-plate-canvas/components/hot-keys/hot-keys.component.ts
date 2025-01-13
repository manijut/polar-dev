import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hot-keys',
  templateUrl: './hot-keys.component.html',
  styleUrls: ['./hot-keys.component.scss'],
})
export class HotKeysComponent implements OnChanges {
  @Input() data: any = {};
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {}
}
