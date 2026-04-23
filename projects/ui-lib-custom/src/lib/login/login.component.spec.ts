import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { LoginComponent } from './login.component';

const GOOGLE_ICON_SVG: string = '<svg></svg>';
const GITHUB_ICON_SVG: string = '<svg></svg>';
const MICROSOFT_ICON_SVG: string = '<svg></svg>';

describe('LoginComponent', (): void => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideIcons({
          google: GOOGLE_ICON_SVG,
          github: GITHUB_ICON_SVG,
          microsoft: MICROSOFT_ICON_SVG,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
