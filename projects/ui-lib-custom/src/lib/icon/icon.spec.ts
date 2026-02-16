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
    fixture.componentRef.setInput('name', 'alert-circle');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('prefixes library names when missing', () => {
    expect(component.resolvedName()).toBe('lucideAlertCircle');
  });

  it('keeps explicit prefixed names', () => {
    fixture.componentRef.setInput('name', 'lucideAlertCircle');
    fixture.detectChanges();

    expect(component.resolvedName()).toBe('lucideAlertCircle');
  });

  it('maps sizes using token mapping', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    expect(component.resolvedSize()).toBe('1.5rem');
  });

  it('marks clickable host class', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('ui-lib-icon--clickable')).toBeTrue();
  });
});
