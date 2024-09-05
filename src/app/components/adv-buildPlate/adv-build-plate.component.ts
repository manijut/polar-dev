import { Component } from '@angular/core';
import { initialState } from './schema/schema';

@Component({
  selector: 'app-adv-build-plate',
  templateUrl: './adv-build-plate.component.html',
  styleUrls: ['./adv-build-plate.component.scss'],
})
export class AdvBuildPlateComponent {
  public renderContent: any = initialState;

  constructor() {
  }
}
