import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionComponent } from './dimension.component';

describe('DimensionComponent', () => {
  let component: DimensionComponent;
  let fixture: ComponentFixture<DimensionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DimensionComponent]
    });
    fixture = TestBed.createComponent(DimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
