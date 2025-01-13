import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildPlateCanvasComponent } from './build-plate-canvas.component';

describe('BuildPlateCanvasComponent', () => {
  let component: BuildPlateCanvasComponent;
  let fixture: ComponentFixture<BuildPlateCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildPlateCanvasComponent]
    });
    fixture = TestBed.createComponent(BuildPlateCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
