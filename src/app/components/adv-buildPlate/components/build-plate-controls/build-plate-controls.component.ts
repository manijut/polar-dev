import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-build-plate-controls',
  templateUrl: './build-plate-controls.component.html',
  styleUrls: ['./build-plate-controls.component.scss'],
})
export class BuildPlateControlsComponent implements OnChanges {
  @Input() data: any = {};

  constructor() {}

  ngOnChanges() {
  }
}
