import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Button } from '../button';
import { FloatLabelComponent } from '../float-label';
import { InputGroupAddonComponent } from './input-group-addon';
import { InputGroupComponent } from './input-group';

@Component({
  standalone: true,
  imports: [InputGroupComponent],
  template: `
    <ui-lib-input-group>
      <input type="text" placeholder="Email" data-testid="projected-input" />
    </ui-lib-input-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputGroupNativeInputHostComponent {}

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent],
  template: `
    <ui-lib-input-group>
      <ui-lib-input-group-addon data-testid="left-addon">$</ui-lib-input-group-addon>
      <input type="text" placeholder="Amount" data-testid="amount-input" />
    </ui-lib-input-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputGroupWithAddonHostComponent {}

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent],
  template: `
    <ui-lib-input-group>
      <ui-lib-input-group-addon data-testid="left-addon">$</ui-lib-input-group-addon>
      <input type="text" placeholder="Amount" data-testid="amount-input" />
      <ui-lib-input-group-addon data-testid="right-addon">.00</ui-lib-input-group-addon>
    </ui-lib-input-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputGroupWithTwoAddonsHostComponent {}

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, Button],
  template: `
    <ui-lib-input-group>
      <ui-lib-input-group-addon data-testid="button-addon">
        <ui-lib-button>Apply</ui-lib-button>
      </ui-lib-input-group-addon>
      <input type="text" placeholder="Coupon" data-testid="coupon-input" />
    </ui-lib-input-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputGroupWithButtonAddonHostComponent {}

@Component({
  standalone: true,
  imports: [InputGroupAddonComponent],
  template: ` <ui-lib-input-group-addon data-testid="addon-text">USD</ui-lib-input-group-addon> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputGroupAddonTextHostComponent {}

@Component({
  standalone: true,
  imports: [InputGroupAddonComponent],
  template: `
    <ui-lib-input-group-addon>
      <span class="addon-icon" data-testid="addon-icon">icon</span>
    </ui-lib-input-group-addon>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputGroupAddonIconHostComponent {}

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, FloatLabelComponent],
  template: `
    <ui-lib-input-group>
      <ui-lib-input-group-addon data-testid="left-addon">@</ui-lib-input-group-addon>
      <ui-lib-float-label>
        <input type="text" placeholder=" " data-testid="float-input" />
        <label>Email</label>
      </ui-lib-float-label>
    </ui-lib-input-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputGroupFloatLabelHostComponent {}

function getInputGroupElement<T>(fixture: ComponentFixture<T>): HTMLElement {
  return fixture.debugElement.query(By.css('ui-lib-input-group')).nativeElement as HTMLElement;
}

function getInputGroupAddonElement<T>(fixture: ComponentFixture<T>): HTMLElement {
  return fixture.debugElement.query(By.css('ui-lib-input-group-addon'))
    .nativeElement as HTMLElement;
}

describe('InputGroupComponent', (): void => {
  it('renders projected content', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputGroupNativeInputHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputGroupNativeInputHostComponent> = TestBed.createComponent(
      InputGroupNativeInputHostComponent,
    );
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-testid="projected-input"]'))).toBeTruthy();
  });

  it('applies host class', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputGroupNativeInputHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputGroupNativeInputHostComponent> = TestBed.createComponent(
      InputGroupNativeInputHostComponent,
    );
    fixture.detectChanges();

    const inputGroupElement: HTMLElement = getInputGroupElement(fixture);
    expect(inputGroupElement.classList.contains('ui-lib-input-group')).toBeTruthy();
  });

  it('renders with addon', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputGroupWithAddonHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputGroupWithAddonHostComponent> = TestBed.createComponent(
      InputGroupWithAddonHostComponent,
    );
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-testid="left-addon"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="amount-input"]'))).toBeTruthy();
  });

  it('renders multiple addons', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputGroupWithTwoAddonsHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputGroupWithTwoAddonsHostComponent> = TestBed.createComponent(
      InputGroupWithTwoAddonsHostComponent,
    );
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-testid="left-addon"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="amount-input"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="right-addon"]'))).toBeTruthy();
  });

  it('renders with button addon', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputGroupWithButtonAddonHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputGroupWithButtonAddonHostComponent> =
      TestBed.createComponent(InputGroupWithButtonAddonHostComponent);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-testid="button-addon"]'))).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('[data-testid="button-addon"] ui-lib-button')),
    ).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="coupon-input"]'))).toBeTruthy();
  });
});

describe('InputGroupAddonComponent', (): void => {
  it('renders projected content', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputGroupAddonTextHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputGroupAddonTextHostComponent> = TestBed.createComponent(
      InputGroupAddonTextHostComponent,
    );
    fixture.detectChanges();

    const addonElement: HTMLElement = getInputGroupAddonElement(fixture);
    expect(addonElement.textContent.trim()).toBe('USD');
  });

  it('applies host class', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputGroupAddonTextHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputGroupAddonTextHostComponent> = TestBed.createComponent(
      InputGroupAddonTextHostComponent,
    );
    fixture.detectChanges();

    const addonElement: HTMLElement = getInputGroupAddonElement(fixture);
    expect(addonElement.classList.contains('ui-lib-input-group-addon')).toBeTruthy();
  });

  it('projects icon content', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputGroupAddonIconHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputGroupAddonIconHostComponent> = TestBed.createComponent(
      InputGroupAddonIconHostComponent,
    );
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-testid="addon-icon"]'))).toBeTruthy();
  });
});

describe('InputGroup integration', (): void => {
  it('renders addon + input + addon composition in correct order', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputGroupWithTwoAddonsHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputGroupWithTwoAddonsHostComponent> = TestBed.createComponent(
      InputGroupWithTwoAddonsHostComponent,
    );
    fixture.detectChanges();

    const inputGroupElement: HTMLElement = getInputGroupElement(fixture);
    const childTagNames: string[] = Array.from(inputGroupElement.children).map(
      (childElement: Element): string => childElement.tagName.toLowerCase(),
    );

    expect(childTagNames).toEqual([
      'ui-lib-input-group-addon',
      'input',
      'ui-lib-input-group-addon',
    ]);
  });

  it('renders FloatLabel wrapping input inside InputGroup', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputGroupFloatLabelHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputGroupFloatLabelHostComponent> = TestBed.createComponent(
      InputGroupFloatLabelHostComponent,
    );
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('ui-lib-input-group > ui-lib-float-label')),
    ).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="float-input"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('ui-lib-float-label > label'))).toBeTruthy();
  });

  it('renders button component inside addon', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputGroupWithButtonAddonHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputGroupWithButtonAddonHostComponent> =
      TestBed.createComponent(InputGroupWithButtonAddonHostComponent);
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('ui-lib-input-group-addon ui-lib-button')),
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('ui-lib-input-group-addon ui-lib-button button')),
    ).toBeTruthy();
  });
});
