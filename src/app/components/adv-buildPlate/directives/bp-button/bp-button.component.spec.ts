import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpButtonComponent } from './bp-button.component';

describe('BpButtonComponent', () => {
  let component: BpButtonComponent;
  let fixture: ComponentFixture<BpButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BpButtonComponent]
    });
    fixture = TestBed.createComponent(BpButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
