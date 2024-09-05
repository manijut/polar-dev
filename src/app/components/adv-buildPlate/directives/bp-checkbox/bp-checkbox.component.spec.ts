import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpCheckboxComponent } from './bp-checkbox.component';

describe('BpCheckboxComponent', () => {
  let component: BpCheckboxComponent;
  let fixture: ComponentFixture<BpCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BpCheckboxComponent]
    });
    fixture = TestBed.createComponent(BpCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
