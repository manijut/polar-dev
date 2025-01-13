import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotKeysComponent } from './hot-keys.component';

describe('HotKeysComponent', () => {
  let component: HotKeysComponent;
  let fixture: ComponentFixture<HotKeysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotKeysComponent]
    });
    fixture = TestBed.createComponent(HotKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
