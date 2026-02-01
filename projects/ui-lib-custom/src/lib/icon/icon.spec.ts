import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { lucideAlertCircle } from '@ng-icons/lucide';
import { Icon } from './icon';

describe('Icon', () => {
  let component: Icon;
  let fixture: ComponentFixture<Icon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Icon],
      providers: [provideIcons({ lucideAlertCircle })],
    }).compileComponents();

    fixture = TestBed.createComponent(Icon);
    component = fixture.componentInstance;
    component.name.set('alert-circle');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('prefixes library names when missing', () => {
    expect(component.resolvedName()).toBe('lucideAlertCircle');
  });

  it('keeps explicit prefixed names', () => {
    component.name.set('lucideAlertCircle');
    fixture.detectChanges();

    expect(component.resolvedName()).toBe('lucideAlertCircle');
  });

  it('maps sizes using token mapping', () => {
    component.size.set('lg');
    fixture.detectChanges();

    expect(component.resolvedSize()).toBe('1.5rem');
  });

  it('marks clickable host class', () => {
    component.clickable.set(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('ui-lib-icon--clickable')).toBeTrue();
  });
});
