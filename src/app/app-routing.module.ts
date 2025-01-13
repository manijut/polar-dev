import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvBuildPlateComponent } from './components/adv-buildPlate/adv-build-plate.component';
import { ThreeMFViewerComponent } from './components/three-mfviewer/three-mfviewer.component';
import { RotationalTestingComponent } from './components/rotational-testing/rotational-testing.component';

const routes: Routes = [
  { path: '', component: AdvBuildPlateComponent },
  { path: 'three', component: ThreeMFViewerComponent },
  { path: 'rotate', component: RotationalTestingComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
