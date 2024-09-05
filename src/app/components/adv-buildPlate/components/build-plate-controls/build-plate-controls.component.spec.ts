import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildPlateControlsComponent } from './build-plate-controls.component';

describe('BuildPlateControlsComponent', () => {
  let component: BuildPlateControlsComponent;
  let fixture: ComponentFixture<BuildPlateControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildPlateControlsComponent]
    });
    fixture = TestBed.createComponent(BuildPlateControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
