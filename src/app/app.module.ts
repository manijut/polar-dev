import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdvBuildPlateModule } from './components/adv-buildPlate/adv-build-plate.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AdvBuildPlateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
