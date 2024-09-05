import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bp-slider',
  templateUrl: './bp-slider.component.html',
  styleUrls: ['./bp-slider.component.scss'],
})
export class BpSliderComponent implements OnChanges {
  @Input() data: any = {};
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {}
}
