import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dimension',
  templateUrl: './dimension.component.html',
  styleUrls: ['./dimension.component.scss'],
})
export class DimensionComponent implements OnChanges {
  @Input() data: any = {};
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {}
}
