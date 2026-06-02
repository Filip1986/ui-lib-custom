import type { DebugElement } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  type InputSignal,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FloatLabelComponent } from '../float-label';
import { IconFieldComponent } from './icon-field';
import type { IconPosition } from './icon-field.types';
import { InputIconComponent } from './input-icon';

@Component({
  selector: 'ui-lib-input',
  standalone: true,
  template: '<input class="stub-ui-lib-input" type="text" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class StubUiLibInputComponent {}

@Component({
  selector: 'ui-lib-icon',
  standalone: true,
  template: '<span class="stub-ui-lib-icon" [attr.data-name]="name()"></span>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class StubUiLibIconComponent {
  public readonly name: InputSignal<string> = input<string>('');
}

@Component({
  standalone: true,
  imports: [IconFieldComponent, InputIconComponent],
  template: `
    <ui-lib-icon-field [iconPosition]="position">
      <ui-lib-input-icon styleClass="pi pi-search" />
      <input type="text" placeholder="Search" />
    </ui-lib-icon-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicIconFieldHostComponent {
  public position: IconPosition = 'right';
}

@Component({
  standalone: true,
  imports: [IconFieldComponent, InputIconComponent],
  template: `
    <ui-lib-icon-field [iconPosition]="position()">
      <ui-lib-input-icon styleClass="pi pi-search" />
      <input type="text" />
    </ui-lib-icon-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SignalIconFieldHostComponent {
  public readonly position: WritableSignal<IconPosition> = signal<IconPosition>('right');
}

@Component({
  standalone: true,
  imports: [IconFieldComponent, InputIconComponent, StubUiLibInputComponent],
  template: `
    <ui-lib-icon-field>
      <input type="text" data-testid="native-input" />
      <ui-lib-input data-testid="custom-input" />
      <ui-lib-input-icon styleClass="pi pi-search" />
    </ui-lib-icon-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ProjectionHostComponent {}

@Component({
  standalone: true,
  imports: [InputIconComponent],
  template: `
    <ui-lib-input-icon [styleClass]="styleClass">
      <svg data-testid="projected-svg"></svg>
    </ui-lib-input-icon>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputIconStyleHostComponent {
  public styleClass: string | null = 'pi pi-search';
}

@Component({
  standalone: true,
  imports: [InputIconComponent],
  template: ` <ui-lib-input-icon /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputIconBaseHostComponent {}

@Component({
  standalone: true,
  imports: [InputIconComponent],
  template: `
    <ui-lib-input-icon>
      <svg data-testid="custom-svg"></svg>
    </ui-lib-input-icon>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputIconSvgHostComponent {}

@Component({
  standalone: true,
  imports: [InputIconComponent, StubUiLibIconComponent],
  template: `
    <ui-lib-input-icon>
      <ui-lib-icon name="search" />
    </ui-lib-input-icon>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputIconUiLibIconHostComponent {}

@Component({
  standalone: true,
  imports: [InputIconComponent],
  template: `
    <ui-lib-input-icon
      [decorative]="false"
      ariaLabel="Warning icon"
      styleClass="pi pi-exclamation-triangle"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputIconInformativeHostComponent {}

@Component({
  standalone: true,
  imports: [FloatLabelComponent, IconFieldComponent, InputIconComponent],
  template: `
    <ui-lib-float-label>
      <ui-lib-icon-field>
        <ui-lib-input-icon styleClass="pi pi-search" />
        <input type="text" placeholder=" " />
      </ui-lib-icon-field>
      <label>Search</label>
    </ui-lib-float-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FloatLabelIconFieldHostComponent {}

@Component({
  standalone: true,
  imports: [IconFieldComponent, InputIconComponent],
  template: `
    <ui-lib-icon-field iconPosition="left">
      <ui-lib-input-icon styleClass="pi pi-search" />
      <input type="text" placeholder="Search" />
    </ui-lib-icon-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LeftIconFieldHostComponent {}

@Component({
  standalone: true,
  imports: [IconFieldComponent, InputIconComponent],
  template: `
    <ui-lib-icon-field iconPosition="right">
      <ui-lib-input-icon styleClass="pi pi-search" />
      <input type="text" placeholder="Search" />
    </ui-lib-icon-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class RightIconFieldHostComponent {}

@Component({
  standalone: true,
  imports: [IconFieldComponent, InputIconComponent],
  template: `
    <ui-lib-icon-field iconPosition="left">
      <ui-lib-input-icon styleClass="pi pi-search" />
      <input type="text" />
      <ui-lib-input-icon>
        <svg data-testid="secondary-icon"></svg>
      </ui-lib-input-icon>
    </ui-lib-icon-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MultipleIconsHostComponent {}

function getIconFieldElement<T>(fixture: ComponentFixture<T>): HTMLElement {
  return fixture.debugElement.query(By.css('ui-lib-icon-field')).nativeElement as HTMLElement;
}

function getInputIconElement<T>(fixture: ComponentFixture<T>): HTMLElement {
  return fixture.debugElement.query(By.css('ui-lib-input-icon')).nativeElement as HTMLElement;
}

describe('IconFieldComponent', (): void => {
  describe('rendering and icon position classes', (): void => {
    let fixture: ComponentFixture<BasicIconFieldHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [BasicIconFieldHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicIconFieldHostComponent);
      fixture.detectChanges();
    });

    it('renders with base class and default right position class', (): void => {
      const iconFieldElement: HTMLElement = getIconFieldElement(fixture);

      expect(iconFieldElement.classList.contains('ui-lib-icon-field')).toBeTruthy();
      expect(iconFieldElement.classList.contains('ui-lib-icon-field--right')).toBeTruthy();
      expect(iconFieldElement.classList.contains('ui-lib-icon-field--left')).toBeFalsy();
    });

    it('applies left class and removes right class when iconPosition is left', async (): Promise<void> => {
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [LeftIconFieldHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const leftFixture: ComponentFixture<LeftIconFieldHostComponent> = TestBed.createComponent(
        LeftIconFieldHostComponent,
      );
      leftFixture.detectChanges();

      const iconFieldElement: HTMLElement = getIconFieldElement(leftFixture);
      expect(iconFieldElement.classList.contains('ui-lib-icon-field--left')).toBeTruthy();
      expect(iconFieldElement.classList.contains('ui-lib-icon-field--right')).toBeFalsy();
    });

    it('applies right class and removes left class when iconPosition is right', async (): Promise<void> => {
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [RightIconFieldHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const rightFixture: ComponentFixture<RightIconFieldHostComponent> = TestBed.createComponent(
        RightIconFieldHostComponent,
      );
      rightFixture.detectChanges();

      const iconFieldElement: HTMLElement = getIconFieldElement(rightFixture);
      expect(iconFieldElement.classList.contains('ui-lib-icon-field--right')).toBeTruthy();
      expect(iconFieldElement.classList.contains('ui-lib-icon-field--left')).toBeFalsy();
    });
  });

  it('supports dynamic iconPosition switching through signal updates', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [SignalIconFieldHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<SignalIconFieldHostComponent> = TestBed.createComponent(
      SignalIconFieldHostComponent,
    );
    fixture.detectChanges();

    fixture.componentInstance.position.set('left');
    fixture.detectChanges();

    const iconFieldElement: HTMLElement = getIconFieldElement(fixture);
    expect(iconFieldElement.classList.contains('ui-lib-icon-field--left')).toBeTruthy();
    expect(iconFieldElement.classList.contains('ui-lib-icon-field--right')).toBeFalsy();

    fixture.componentInstance.position.set('right');
    fixture.detectChanges();

    expect(iconFieldElement.classList.contains('ui-lib-icon-field--right')).toBeTruthy();
    expect(iconFieldElement.classList.contains('ui-lib-icon-field--left')).toBeFalsy();
  });

  it('projects input elements, ui-lib-input, and ui-lib-input-icon in original order', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ProjectionHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<ProjectionHostComponent> =
      TestBed.createComponent(ProjectionHostComponent);
    fixture.detectChanges();

    const iconFieldElement: HTMLElement = getIconFieldElement(fixture);
    const childTagNames: string[] = Array.from(iconFieldElement.children).map(
      (element: Element): string => element.tagName.toLowerCase(),
    );

    expect(fixture.debugElement.query(By.css('ui-lib-icon-field > input'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('ui-lib-icon-field > ui-lib-input'))).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('ui-lib-icon-field > ui-lib-input-icon')),
    ).toBeTruthy();
    expect(childTagNames).toEqual(['input', 'ui-lib-input', 'ui-lib-input-icon']);
  });

  it('renders inside FloatLabel without class conflicts', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [FloatLabelIconFieldHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<FloatLabelIconFieldHostComponent> = TestBed.createComponent(
      FloatLabelIconFieldHostComponent,
    );
    fixture.detectChanges();

    const floatLabelElement: HTMLElement = fixture.debugElement.query(By.css('ui-lib-float-label'))
      .nativeElement as HTMLElement;
    const iconFieldElement: HTMLElement = getIconFieldElement(fixture);

    expect(floatLabelElement.classList.contains('ui-lib-float-label')).toBeTruthy();
    expect(iconFieldElement.classList.contains('ui-lib-icon-field')).toBeTruthy();
    expect(iconFieldElement.classList.contains('ui-lib-icon-field--right')).toBeTruthy();
    expect(fixture.debugElement.query(By.css('ui-lib-float-label > label'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('ui-lib-float-label ui-lib-input-icon'))).toBeTruthy();
  });

  it('renders multiple input icons in the same icon field', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [MultipleIconsHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<MultipleIconsHostComponent> = TestBed.createComponent(
      MultipleIconsHostComponent,
    );
    fixture.detectChanges();

    const inputIcons: HTMLElement[] = fixture.debugElement
      .queryAll(By.css('ui-lib-icon-field > ui-lib-input-icon'))
      .map((debugElement: DebugElement): HTMLElement => debugElement.nativeElement as HTMLElement);

    const inputIconClassMatches: boolean[] = inputIcons.map(
      (inputIconElement: HTMLElement): boolean =>
        inputIconElement.classList.contains('ui-lib-input-icon'),
    );

    expect(inputIcons.length).toBe(2);
    expect(inputIconClassMatches).toEqual([true, true]);
  });
});

describe('InputIconComponent', (): void => {
  it('renders with the ui-lib-input-icon host class', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputIconBaseHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputIconBaseHostComponent> = TestBed.createComponent(
      InputIconBaseHostComponent,
    );
    fixture.detectChanges();

    const inputIconElement: HTMLElement = getInputIconElement(fixture);
    expect(inputIconElement.classList.contains('ui-lib-input-icon')).toBeTruthy();
  });

  it('renders a span with styleClass classes when styleClass is set', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputIconStyleHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputIconStyleHostComponent> = TestBed.createComponent(
      InputIconStyleHostComponent,
    );
    fixture.detectChanges();

    const inputIconElement: HTMLElement = getInputIconElement(fixture);
    const styleSpan: HTMLElement | null = inputIconElement.querySelector('span');

    expect(styleSpan).not.toBeNull();
    expect(styleSpan?.classList.contains('pi')).toBeTruthy();
    expect(styleSpan?.classList.contains('pi-search')).toBeTruthy();
    expect(inputIconElement.querySelector('[data-testid="projected-svg"]')).toBeNull();
  });

  it('projects custom content when styleClass is null and keeps styleClass/projection exclusive', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputIconStyleHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputIconStyleHostComponent> = TestBed.createComponent(
      InputIconStyleHostComponent,
    );
    fixture.componentInstance.styleClass = null;
    fixture.detectChanges();

    const inputIconElement: HTMLElement = getInputIconElement(fixture);
    expect(inputIconElement.querySelector('span')).toBeNull();
    expect(inputIconElement.querySelector('[data-testid="projected-svg"]')).not.toBeNull();
  });

  it('renders projected SVG content', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputIconSvgHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputIconSvgHostComponent> =
      TestBed.createComponent(InputIconSvgHostComponent);
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('ui-lib-input-icon svg[data-testid="custom-svg"]')),
    ).toBeTruthy();
  });

  it('renders projected ui-lib-icon content', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputIconUiLibIconHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputIconUiLibIconHostComponent> = TestBed.createComponent(
      InputIconUiLibIconHostComponent,
    );
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('ui-lib-input-icon ui-lib-icon'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('ui-lib-input-icon .stub-ui-lib-icon'))).toBeTruthy();
  });

  it('defaults decorative icons to aria-hidden and tabindex -1', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputIconBaseHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputIconBaseHostComponent> = TestBed.createComponent(
      InputIconBaseHostComponent,
    );
    fixture.detectChanges();

    const inputIconElement: HTMLElement = getInputIconElement(fixture);
    expect(inputIconElement.getAttribute('aria-hidden')).toBe('true');
    expect(inputIconElement.getAttribute('tabindex')).toBe('-1');
  });

  it('supports informative icon labeling when decorative is disabled', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputIconInformativeHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputIconInformativeHostComponent> = TestBed.createComponent(
      InputIconInformativeHostComponent,
    );
    fixture.detectChanges();

    const inputIconElement: HTMLElement = getInputIconElement(fixture);
    expect(inputIconElement.getAttribute('aria-hidden')).toBeNull();
    expect(inputIconElement.getAttribute('role')).toBe('img');
    expect(inputIconElement.getAttribute('aria-label')).toBe('Warning icon');
  });
});
