import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationalTestingComponent } from './rotational-testing.component';

describe('RotationalTestingComponent', () => {
  let component: RotationalTestingComponent;
  let fixture: ComponentFixture<RotationalTestingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RotationalTestingComponent]
    });
    fixture = TestBed.createComponent(RotationalTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
