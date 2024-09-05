import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildPlateTabContentComponent } from './build-plate-tab-content.component';

describe('BuildPlateTabContentComponent', () => {
  let component: BuildPlateTabContentComponent;
  let fixture: ComponentFixture<BuildPlateTabContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildPlateTabContentComponent]
    });
    fixture = TestBed.createComponent(BuildPlateTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
