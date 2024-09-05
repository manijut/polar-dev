import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTabContentComponent } from './request-tab-content.component';

describe('RequestTabContentComponent', () => {
  let component: RequestTabContentComponent;
  let fixture: ComponentFixture<RequestTabContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestTabContentComponent]
    });
    fixture = TestBed.createComponent(RequestTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
