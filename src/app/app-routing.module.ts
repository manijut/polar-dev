import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvBuildPlateComponent } from './components/adv-buildPlate/adv-build-plate.component';

const routes: Routes = [{ path: '', component: AdvBuildPlateComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
