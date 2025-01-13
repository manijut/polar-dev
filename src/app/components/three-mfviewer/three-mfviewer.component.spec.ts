import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeMFViewerComponent } from './three-mfviewer.component';

describe('ThreeMFViewerComponent', () => {
  let component: ThreeMFViewerComponent;
  let fixture: ComponentFixture<ThreeMFViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreeMFViewerComponent]
    });
    fixture = TestBed.createComponent(ThreeMFViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
