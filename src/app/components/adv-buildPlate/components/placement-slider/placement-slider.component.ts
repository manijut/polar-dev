import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-placement-slider',
  templateUrl: './placement-slider.component.html',
  styleUrls: ['./placement-slider.component.scss'],
})
export class PlacementSliderComponent implements OnChanges {
  @Input() data: any = {};
  @Input() classes: any = {};


  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.data, 'placement');
  }
}
