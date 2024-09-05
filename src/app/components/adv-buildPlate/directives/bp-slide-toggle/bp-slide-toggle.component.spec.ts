import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpSlideToggleComponent } from './bp-slide-toggle.component';

describe('BpSlideToggleComponent', () => {
  let component: BpSlideToggleComponent;
  let fixture: ComponentFixture<BpSlideToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BpSlideToggleComponent]
    });
    fixture = TestBed.createComponent(BpSlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
