import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bp-slide-toggle',
  templateUrl: './bp-slide-toggle.component.html',
  styleUrls: ['./bp-slide-toggle.component.scss'],
})
export class BpSlideToggleComponent implements OnChanges {
  @Input() data: any = {};
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {}
}
