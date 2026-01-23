import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLibCustom } from './ui-lib-custom';

describe('UiLibCustom', () => {
  let component: UiLibCustom;
  let fixture: ComponentFixture<UiLibCustom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiLibCustom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiLibCustom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
