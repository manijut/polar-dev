import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-build-plate-tab',
  templateUrl: './build-plate-tab.component.html',
  styleUrls: ['./build-plate-tab.component.scss'],
})
export class BuildPlateTabComponent {
  @Input() data: any[] = [];

  constructor() {}
}
