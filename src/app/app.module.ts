import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdvBuildPlateModule } from './components/adv-buildPlate/adv-build-plate.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThreeMFViewerComponent } from './components/three-mfviewer/three-mfviewer.component';
import { RotationalTestingComponent } from './components/rotational-testing/rotational-testing.component';

@NgModule({
  declarations: [AppComponent, ThreeMFViewerComponent, RotationalTestingComponent],
  imports: [
    CoreModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AdvBuildPlateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
