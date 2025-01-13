import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-camera-controls',
  templateUrl: './camera-controls.component.html',
  styleUrls: ['./camera-controls.component.scss'],
})
export class CameraControlsComponent implements OnChanges {
  @Input() data: any = {};

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {}
}
