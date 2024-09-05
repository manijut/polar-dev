import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementSliderComponent } from './placement-slider.component';

describe('PlacementSliderComponent', () => {
  let component: PlacementSliderComponent;
  let fixture: ComponentFixture<PlacementSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlacementSliderComponent]
    });
    fixture = TestBed.createComponent(PlacementSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
