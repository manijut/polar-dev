import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpCustomIconButtonComponent } from './bp-custom-icon-button.component';

describe('BpCustomIconButtonComponent', () => {
  let component: BpCustomIconButtonComponent;
  let fixture: ComponentFixture<BpCustomIconButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BpCustomIconButtonComponent]
    });
    fixture = TestBed.createComponent(BpCustomIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
