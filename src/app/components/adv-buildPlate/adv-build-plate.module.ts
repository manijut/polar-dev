import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { AdvBuildPlateComponent } from './adv-build-plate.component';
import { BuildPlateTabComponent } from './components/build-plate-tab/build-plate-tab.component';
import { BuildPlateTabContentComponent } from './components/build-plate-tab-content/build-plate-tab-content.component';
import { BuildPlateControlsComponent } from './components/build-plate-controls/build-plate-controls.component';
import { BpButtonComponent } from './directives/bp-button/bp-button.component';
import { BpSelectComponent } from './directives/bp-select/bp-select.component';
import { BpInputComponent } from './directives/bp-input/bp-input.component';
import { BpSliderComponent } from './directives/bp-slider/bp-slider.component';
import { BpCustomIconButtonComponent } from './directives/bp-custom-icon-button/bp-custom-icon-button.component';
import { BpSlideToggleComponent } from './directives/bp-slide-toggle/bp-slide-toggle.component';
import { PlacementSliderComponent } from './components/placement-slider/placement-slider.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { BpCheckboxComponent } from './directives/bp-checkbox/bp-checkbox.component';
import { RequestTabContentComponent } from './components/request-tab-content/request-tab-content.component';

@NgModule({
  declarations: [
    AdvBuildPlateComponent,
    BuildPlateTabComponent,
    BuildPlateTabContentComponent,
    BuildPlateControlsComponent,
    BpButtonComponent,
    BpSelectComponent,
    BpInputComponent,
    BpSliderComponent,
    BpCustomIconButtonComponent,
    BpSlideToggleComponent,
    PlacementSliderComponent,
    BpCheckboxComponent,
    RequestTabContentComponent,
  ],
  imports: [CoreModule, CommonModule, NgxSliderModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdvBuildPlateModule {}
