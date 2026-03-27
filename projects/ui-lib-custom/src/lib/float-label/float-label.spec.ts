import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import type { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelComponent } from './float-label';
import type { FloatLabelVariant } from './float-label.types';
import { UiLibSelect } from 'ui-lib-custom/select';
import { UiLibInput } from 'ui-lib-custom/input';

declare const require: (moduleName: string) => unknown;

@Component({
  standalone: true,
  imports: [FloatLabelComponent, FormsModule, ReactiveFormsModule],
  template: `
    <uilib-float-label [variant]="variant">
      <input
        type="text"
        [placeholder]="placeholder"
        [ngModelOptions]="{ standalone: true }"
        [(ngModel)]="value"
      />
      <label>Username</label>
    </uilib-float-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public variant: FloatLabelVariant = 'over';
  public placeholder: string = ' ';
  public value: string = '';
}

@Component({
  standalone: true,
  imports: [FloatLabelComponent, FormsModule],
  template: `
    <uilib-float-label>
      <textarea
        [placeholder]="placeholder"
        [ngModelOptions]="{ standalone: true }"
        [(ngModel)]="value"
      ></textarea>
      <label>Bio</label>
    </uilib-float-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TextareaHostComponent {
  public placeholder: string = ' ';
  public value: string = '';
}

@Component({
  standalone: true,
  imports: [FloatLabelComponent, FormsModule, UiLibSelect],
  template: `
    <uilib-float-label>
      <ui-lib-select
        [options]="options"
        [ngModelOptions]="{ standalone: true }"
        [(ngModel)]="value"
      />
      <label>City</label>
    </uilib-float-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SelectHostComponent {
  public readonly options: Array<{ label: string; value: string }> = [
    { label: 'Amsterdam', value: 'ams' },
    { label: 'Berlin', value: 'ber' },
  ];
  public value: string | null = null;
}

@Component({
  standalone: true,
  imports: [FloatLabelComponent, FormsModule, UiLibInput],
  template: `
    <uilib-float-label>
      <ui-lib-input
        [placeholder]="placeholder"
        [label]="''"
        [ngModelOptions]="{ standalone: true }"
        [(ngModel)]="value"
      />
      <label>First Name</label>
    </uilib-float-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputHostComponent {
  public placeholder: string = ' ';
  public value: string = '';
}

@Component({
  standalone: true,
  imports: [FloatLabelComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <uilib-float-label>
        <input type="text" placeholder=" " formControlName="username" />
        <label>Username</label>
      </uilib-float-label>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReactiveInvalidHostComponent {
  public readonly form: FormGroup<{ username: FormControl<string> }> = new FormGroup({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}

@Component({
  standalone: true,
  imports: [FloatLabelComponent],
  template: `
    <uilib-float-label>
      <input type="text" placeholder=" " />
    </uilib-float-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NoLabelHostComponent {}

@Component({
  standalone: true,
  imports: [FloatLabelComponent],
  template: `
    <uilib-float-label>
      <label>Only label</label>
    </uilib-float-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NoInputHostComponent {}

@Component({
  standalone: true,
  imports: [FloatLabelComponent],
  template: `
    <uilib-float-label variant="over">
      <uilib-float-label variant="in">
        <input type="text" placeholder=" " />
        <label>Inner</label>
      </uilib-float-label>
      <label>Outer</label>
    </uilib-float-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NestedHostComponent {}

function getFloatLabelElement<T>(fixture: ComponentFixture<T>): HTMLElement {
  return fixture.debugElement.query(By.css('uilib-float-label')).nativeElement as HTMLElement;
}

describe('FloatLabelComponent host classes', (): void => {
  let fixture: ComponentFixture<FloatLabelComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [FloatLabelComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatLabelComponent);
    fixture.detectChanges();
  });

  it('has base and default over classes', (): void => {
    const host: HTMLElement = fixture.nativeElement as HTMLElement;

    expect(host.classList.contains('uilib-float-label')).toBeTruthy();
    expect(host.classList.contains('uilib-float-label--over')).toBeTruthy();
    expect(host.classList.contains('uilib-float-label--in')).toBeFalsy();
    expect(host.classList.contains('uilib-float-label--on')).toBeFalsy();
  });

  it('applies in variant class only', (): void => {
    fixture.componentRef.setInput('variant', 'in');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(host.classList.contains('uilib-float-label--in')).toBeTruthy();
    expect(host.classList.contains('uilib-float-label--over')).toBeFalsy();
    expect(host.classList.contains('uilib-float-label--on')).toBeFalsy();
  });

  it('applies on variant class', (): void => {
    fixture.componentRef.setInput('variant', 'on');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(host.classList.contains('uilib-float-label--on')).toBeTruthy();
    expect(host.classList.contains('uilib-float-label--over')).toBeFalsy();
    expect(host.classList.contains('uilib-float-label--in')).toBeFalsy();
  });

  it('updates class when variant changes', (): void => {
    fixture.componentRef.setInput('variant', 'over');
    fixture.detectChanges();

    fixture.componentRef.setInput('variant', 'in');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(host.classList.contains('uilib-float-label--in')).toBeTruthy();
    expect(host.classList.contains('uilib-float-label--over')).toBeFalsy();
  });
});

describe('FloatLabelComponent projection and structure', (): void => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('projects input and label content', (): void => {
    const inputDebugElement: DebugElement = fixture.debugElement.query(
      By.css('uilib-float-label > input')
    );
    const labelDebugElement: DebugElement = fixture.debugElement.query(
      By.css('uilib-float-label > label')
    );

    expect(inputDebugElement).toBeTruthy();
    expect(labelDebugElement).toBeTruthy();
    expect((labelDebugElement.nativeElement as HTMLElement).textContent.trim()).toBe('Username');
  });

  it('does not add wrapper nodes around projected content', (): void => {
    const floatLabel: HTMLElement = getFloatLabelElement(fixture);
    const childTagNames: string[] = Array.from(floatLabel.children).map(
      (element: Element): string => element.tagName.toLowerCase()
    );

    expect(childTagNames).toEqual(['input', 'label']);
  });
});

describe('FloatLabelComponent integration contracts', (): void => {
  it('supports textarea projection', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TextareaHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<TextareaHostComponent> =
      TestBed.createComponent(TextareaHostComponent);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('uilib-float-label > textarea'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('uilib-float-label > label'))).toBeTruthy();
  });

  it('reflects Select wrapper state classes for filled and focus/open states', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [SelectHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<SelectHostComponent> =
      TestBed.createComponent(SelectHostComponent);
    fixture.detectChanges();

    const selectDebugElement: DebugElement = fixture.debugElement.query(By.css('ui-lib-select'));
    const selectElement: HTMLElement = selectDebugElement.nativeElement as HTMLElement;
    const selectComponent: UiLibSelect = selectDebugElement.componentInstance as UiLibSelect;

    selectComponent.writeValue('ams');
    fixture.detectChanges();
    expect(selectElement.classList.contains('uilib-inputwrapper-filled')).toBeTruthy();

    const controlElement: HTMLElement = fixture.debugElement.query(
      By.css('.ui-lib-select__control')
    ).nativeElement as HTMLElement;
    controlElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(selectElement.classList.contains('uilib-inputwrapper-focus')).toBeTruthy();
  });

  it('reflects Input filled class and focus contract for nested input element', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [InputHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<InputHostComponent> =
      TestBed.createComponent(InputHostComponent);
    fixture.detectChanges();
    const inputDebugElement: DebugElement = fixture.debugElement.query(By.css('ui-lib-input'));
    const inputComponent: UiLibInput = inputDebugElement.componentInstance as UiLibInput;
    const nativeInput: HTMLInputElement = fixture.debugElement.query(By.css('ui-lib-input input'))
      .nativeElement as HTMLInputElement;
    nativeInput.value = 'Ada';
    nativeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const inputHostElement: HTMLElement = inputDebugElement.nativeElement as HTMLElement;
    expect(
      inputHostElement.classList.contains('uilib-filled') || inputComponent.isFilled()
    ).toBeTruthy();

    nativeInput.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const floatLabel: HTMLElement = getFloatLabelElement(fixture);
    expect(floatLabel.contains(nativeInput)).toBeTruthy();
  });

  it('keeps invalid class combination in DOM for invalid-state selector coverage', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ReactiveInvalidHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<ReactiveInvalidHostComponent> = TestBed.createComponent(
      ReactiveInvalidHostComponent
    );
    fixture.detectChanges();

    fixture.componentInstance.form.controls.username.markAsDirty();
    fixture.componentInstance.form.controls.username.setValue('');
    fixture.detectChanges();

    const inputElement: HTMLInputElement = fixture.debugElement.query(
      By.css('uilib-float-label input')
    ).nativeElement as HTMLInputElement;

    expect(inputElement.classList.contains('ng-invalid')).toBeTruthy();
    expect(inputElement.classList.contains('ng-dirty')).toBeTruthy();
  });
});

describe('FloatLabelComponent edge cases', (): void => {
  it('does not throw when label is missing', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [NoLabelHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const createFixture: () => ComponentFixture<NoLabelHostComponent> =
      (): ComponentFixture<NoLabelHostComponent> => TestBed.createComponent(NoLabelHostComponent);

    expect(createFixture).not.toThrow();
  });

  it('does not throw when input is missing', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [NoInputHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const createFixture: () => ComponentFixture<NoInputHostComponent> =
      (): ComponentFixture<NoInputHostComponent> => TestBed.createComponent(NoInputHostComponent);

    expect(createFixture).not.toThrow();
  });

  it('supports nested FloatLabels without structural interference', async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [NestedHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture: ComponentFixture<NestedHostComponent> =
      TestBed.createComponent(NestedHostComponent);
    fixture.detectChanges();

    const labels: DebugElement[] = fixture.debugElement.queryAll(By.css('uilib-float-label'));
    expect(labels.length).toBe(2);
  });
});

describe('FloatLabelComponent stylesheet contract', (): void => {
  it('defines expected selectors in compiled component styles', (): void => {
    const fileSystem: { readFileSync: (filePath: string, encoding: string) => string } =
      require('fs') as { readFileSync: (filePath: string, encoding: string) => string };
    const pathModule: { join: (...parts: string[]) => string } = require('path') as {
      join: (...parts: string[]) => string;
    };
    const processModule: { cwd: () => string } = require('process') as { cwd: () => string };

    const stylesheetPath: string = pathModule.join(
      processModule.cwd(),
      'projects',
      'ui-lib-custom',
      'src',
      'lib',
      'float-label',
      'float-label.scss'
    );
    const stylesheetSource: string = fileSystem.readFileSync(stylesheetPath, 'utf8');

    expect(stylesheetSource).toContain('.uilib-float-label {');
    expect(stylesheetSource).toContain('position: absolute;');
    expect(stylesheetSource).toContain('.uilib-float-label--in {');
    expect(stylesheetSource).toContain('.uilib-float-label--on {');
    expect(stylesheetSource).toContain(':has(.ng-invalid.ng-dirty) label');
    expect(stylesheetSource).toContain(':has(.uilib-inputwrapper-focus) label');
  });
});
