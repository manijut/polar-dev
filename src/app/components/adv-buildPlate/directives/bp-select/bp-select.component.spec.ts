import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpSelectComponent } from './bp-select.component';

describe('BpSelectComponent', () => {
  let component: BpSelectComponent;
  let fixture: ComponentFixture<BpSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BpSelectComponent]
    });
    fixture = TestBed.createComponent(BpSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
