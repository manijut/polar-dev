import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildPlateTabComponent } from './build-plate-tab.component';

describe('BuildPlateTabComponent', () => {
  let component: BuildPlateTabComponent;
  let fixture: ComponentFixture<BuildPlateTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildPlateTabComponent]
    });
    fixture = TestBed.createComponent(BuildPlateTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
