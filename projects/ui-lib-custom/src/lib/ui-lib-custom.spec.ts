import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { UiLibCustom } from './ui-lib-custom';

describe('UiLibCustom', (): void => {
  let component: UiLibCustom;
  let fixture: ComponentFixture<UiLibCustom>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [UiLibCustom],
    }).compileComponents();

    fixture = TestBed.createComponent(UiLibCustom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
