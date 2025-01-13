import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-build-plate-canvas',
  templateUrl: './build-plate-canvas.component.html',
  styleUrls: ['./build-plate-canvas.component.scss'],
})
export class BuildPlateCanvasComponent implements OnChanges {
  @Input() data: any = {};
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.data, 'canvas');
  }
}
