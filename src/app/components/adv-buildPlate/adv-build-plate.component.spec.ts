import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvBuildPlateComponent } from './adv-build-plate.component';

describe('AdvBuildPlateComponent', () => {
  let component: AdvBuildPlateComponent;
  let fixture: ComponentFixture<AdvBuildPlateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvBuildPlateComponent]
    });
    fixture = TestBed.createComponent(AdvBuildPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
