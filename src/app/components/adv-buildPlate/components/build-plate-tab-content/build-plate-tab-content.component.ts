import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-build-plate-tab-content',
  templateUrl: './build-plate-tab-content.component.html',
  styleUrls: ['./build-plate-tab-content.component.scss'],
})
export class BuildPlateTabContentComponent implements OnChanges {
  @Input() content: any = {};
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
  }
}
