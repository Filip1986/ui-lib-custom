import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import type { WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';
import { TreeSelect } from './tree-select.component';
import type { TreeNode, TreeSelectSelectionMode, TreeSelectVariant } from './tree-select.types';

const SAMPLE_NODES: TreeNode[] = [
  {
    key: 'fruits',
    label: 'Fruits',
    expanded: true,
    children: [
      { key: 'apple', label: 'Apple' },
      { key: 'banana', label: 'Banana' },
    ],
  },
  {
    key: 'vegetables',
    label: 'Vegetables',
    children: [
      { key: 'carrot', label: 'Carrot' },
      { key: 'pepper', label: 'Pepper' },
    ],
  },
];

@Component({
  standalone: true,
  imports: [FormsModule, TreeSelect],
  template: `
    <ui-lib-tree-select
      [nodes]="nodes()"
      [selectionMode]="selectionMode()"
      [disabled]="disabled()"
      [placeholder]="placeholder()"
      [ngModelOptions]="{ standalone: true }"
      [(ngModel)]="value"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
  public readonly nodes: WritableSignal<TreeNode[]> = signal<TreeNode[]>(SAMPLE_NODES);
  public readonly selectionMode: WritableSignal<TreeSelectSelectionMode> =
    signal<TreeSelectSelectionMode>('single');
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly placeholder: WritableSignal<string> = signal<string>('Select a node...');
  public value: TreeNode | TreeNode[] | null = null;
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TreeSelect],
  template: `
    <form [formGroup]="form">
      <ui-lib-tree-select [nodes]="nodes" formControlName="node" />
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReactiveHostComponent {
  public readonly nodes: TreeNode[] = SAMPLE_NODES;
  public readonly form: FormGroup = new FormGroup({
    node: new FormControl<TreeNode | null>(null),
  });
}

describe('TreeSelect', (): void => {
  let fixture: ComponentFixture<HostComponent>;

  function setup(): void {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  }

  function getHost(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-tree-select'
    ) as HTMLElement;
  }

  function getTrigger(): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector(
      '.ui-lib-tree-select__trigger'
    ) as HTMLElement;
  }

  function getPanel(): HTMLElement | null {
    return (fixture.nativeElement as HTMLElement).querySelector('.ui-lib-tree-select__panel');
  }

  function clickTrigger(): void {
    getTrigger().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
  }

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  describe('Rendering', (): void => {
    beforeEach((): void => setup());

    it('should render the host element', (): void => {
      expect(getHost()).toBeTruthy();
    });

    it('should have combobox role on host', (): void => {
      expect(getHost().getAttribute('role')).toBe('combobox');
    });

    it('should have aria-expanded="false" when closed', (): void => {
      expect(getHost().getAttribute('aria-expanded')).toBe('false');
    });

    it('should have aria-haspopup="tree"', (): void => {
      expect(getHost().getAttribute('aria-haspopup')).toBe('tree');
    });

    it('should display placeholder when no value is selected', (): void => {
      const placeholder: HTMLElement | null = getTrigger().querySelector(
        '.ui-lib-tree-select__placeholder'
      );
      expect(placeholder).toBeTruthy();
    });

    it('should apply default size class', (): void => {
      expect(getHost().classList.contains('ui-lib-tree-select--size-md')).toBe(true);
    });
  });

  describe('Panel toggle', (): void => {
    beforeEach((): void => setup());

    it('should open panel on trigger click', (): void => {
      expect(getPanel()).toBeNull();
      clickTrigger();
      expect(getPanel()).toBeTruthy();
    });

    it('should close panel on second trigger click', (): void => {
      clickTrigger();
      clickTrigger();
      expect(getPanel()).toBeNull();
    });

    it('should set aria-expanded="true" when panel is open', (): void => {
      clickTrigger();
      expect(getHost().getAttribute('aria-expanded')).toBe('true');
    });

    it('should add --open CSS class when panel is open', (): void => {
      clickTrigger();
      expect(getHost().classList.contains('ui-lib-tree-select--open')).toBe(true);
    });

    it('should close panel on Escape key', (): void => {
      clickTrigger();
      getHost().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();
      expect(getPanel()).toBeNull();
    });

    it('should open panel on Enter key', (): void => {
      getHost().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();
      expect(getPanel()).toBeTruthy();
    });

    it('should open panel on Space key', (): void => {
      getHost().dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      fixture.detectChanges();
      expect(getPanel()).toBeTruthy();
    });
  });

  describe('Disabled state', (): void => {
    beforeEach((): void => {
      setup();
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
    });

    it('should apply --disabled class', (): void => {
      expect(getHost().classList.contains('ui-lib-tree-select--disabled')).toBe(true);
    });

    it('should have aria-disabled="true"', (): void => {
      expect(getHost().getAttribute('aria-disabled')).toBe('true');
    });

    it('should not open panel when disabled', (): void => {
      clickTrigger();
      expect(getPanel()).toBeNull();
    });

    it('should have tabindex -1 when disabled', (): void => {
      expect(getHost().getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Variants', (): void => {
    const variants: TreeSelectVariant[] = ['material', 'bootstrap', 'minimal'];

    variants.forEach((variant: TreeSelectVariant): void => {
      it(`should apply --variant-${variant} class`, async (): Promise<void> => {
        await TestBed.configureTestingModule({
          imports: [HostComponent],
          providers: [provideZonelessChangeDetection()],
        }).compileComponents();

        // Direct component test for variant
        const variantFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
        variantFixture.componentRef.setInput('variant', variant);
        variantFixture.componentRef.setInput('nodes', SAMPLE_NODES);
        variantFixture.detectChanges();
        const hostEl: HTMLElement = variantFixture.nativeElement as HTMLElement;
        expect(hostEl.classList.contains(`ui-lib-tree-select--variant-${variant}`)).toBe(true);
      });
    });
  });

  describe('Sizes', (): void => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size: 'sm' | 'md' | 'lg'): void => {
      it(`should apply --size-${size} class`, async (): Promise<void> => {
        await TestBed.configureTestingModule({
          imports: [HostComponent],
          providers: [provideZonelessChangeDetection()],
        }).compileComponents();

        const sizeFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
        sizeFixture.componentRef.setInput('size', size);
        sizeFixture.componentRef.setInput('nodes', SAMPLE_NODES);
        sizeFixture.detectChanges();
        const hostEl: HTMLElement = sizeFixture.nativeElement as HTMLElement;
        expect(hostEl.classList.contains(`ui-lib-tree-select--size-${size}`)).toBe(true);
      });
    });
  });

  describe('NgModel binding', (): void => {
    beforeEach((): void => setup());

    it('should write value from ngModel', async (): Promise<void> => {
      const component: TreeSelect = (fixture.nativeElement as HTMLElement).querySelector(
        'ui-lib-tree-select'
      ) as unknown as TreeSelect;
      void component;

      const treeSelectFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
      const treeSelectComponent: TreeSelect = treeSelectFixture.componentInstance;
      treeSelectComponent.writeValue(SAMPLE_NODES[0] ?? null);
      treeSelectFixture.detectChanges();
      expect(treeSelectComponent.selection()).toEqual(SAMPLE_NODES[0]);
    });

    it('should write null value', (): void => {
      const treeSelectFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
      const treeSelectComponent: TreeSelect = treeSelectFixture.componentInstance;
      treeSelectComponent.writeValue(null);
      treeSelectFixture.detectChanges();
      expect(treeSelectComponent.selection()).toBeNull();
    });

    it('should set disabled state via CVA', (): void => {
      const treeSelectFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
      const treeSelectComponent: TreeSelect = treeSelectFixture.componentInstance;
      treeSelectComponent.setDisabledState(true);
      treeSelectFixture.detectChanges();
      expect(treeSelectComponent.isDisabled()).toBe(true);
    });
  });

  describe('Reactive forms', (): void => {
    it('should work with reactive forms', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [ReactiveHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const reactiveFixture: ComponentFixture<ReactiveHostComponent> =
        TestBed.createComponent(ReactiveHostComponent);
      reactiveFixture.detectChanges();

      const reactiveComponent: ReactiveHostComponent = reactiveFixture.componentInstance;
      expect(reactiveComponent.form.get('node')?.value).toBeNull();

      reactiveComponent.form.get('node')?.setValue(SAMPLE_NODES[0] ?? null);
      reactiveFixture.detectChanges();

      expect(reactiveComponent.form.get('node')?.value).toEqual(SAMPLE_NODES[0]);
    });
  });

  describe('Display label', (): void => {
    it('should show node label in trigger when selected', (): void => {
      setup();
      const treeSelectFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
      const treeSelectComponent: TreeSelect = treeSelectFixture.componentInstance;
      treeSelectComponent.writeValue(SAMPLE_NODES[0] ?? null);
      treeSelectFixture.detectChanges();
      expect(treeSelectComponent.displayLabel()).toBe('Fruits');
    });

    it('should show count when multiple nodes selected', (): void => {
      setup();
      const treeSelectFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
      const treeSelectComponent: TreeSelect = treeSelectFixture.componentInstance;
      treeSelectComponent.writeValue([
        SAMPLE_NODES[0] ?? null,
        SAMPLE_NODES[1] ?? null,
      ] as TreeNode[]);
      treeSelectFixture.detectChanges();
      expect(treeSelectComponent.displayLabel()).toBe('2 items selected');
    });

    it('should return empty string when no selection', (): void => {
      setup();
      const treeSelectFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
      const treeSelectComponent: TreeSelect = treeSelectFixture.componentInstance;
      treeSelectComponent.writeValue(null);
      treeSelectFixture.detectChanges();
      expect(treeSelectComponent.displayLabel()).toBe('');
    });
  });

  describe('Clear button', (): void => {
    it('should show clear button when showClear=true and has value', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const clearFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
      clearFixture.componentRef.setInput('showClear', true);
      clearFixture.componentRef.setInput('nodes', SAMPLE_NODES);
      clearFixture.componentInstance.writeValue(SAMPLE_NODES[0] ?? null);
      clearFixture.detectChanges();
      const clearBtn: HTMLElement | null = (
        clearFixture.nativeElement as HTMLElement
      ).querySelector('.ui-lib-tree-select__clear');
      expect(clearBtn).toBeTruthy();
    });

    it('should clear selection when clear button clicked', (): void => {
      const clearFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
      clearFixture.componentRef.setInput('showClear', true);
      clearFixture.componentRef.setInput('nodes', SAMPLE_NODES);
      clearFixture.componentInstance.writeValue(SAMPLE_NODES[0] ?? null);
      clearFixture.detectChanges();

      let clearedValue: TreeNode | TreeNode[] | null | undefined;
      clearFixture.componentInstance.registerOnChange(
        (value: TreeNode | TreeNode[] | null): void => {
          clearedValue = value;
        }
      );

      const clearBtn: HTMLElement | null = (
        clearFixture.nativeElement as HTMLElement
      ).querySelector('.ui-lib-tree-select__clear');
      (clearBtn as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true }));
      clearFixture.detectChanges();

      expect(clearFixture.componentInstance.selection()).toBeNull();
      expect(clearedValue).toBeNull();
    });
  });

  describe('Loading state', (): void => {
    it('should show spinner when loading=true', (): void => {
      const loadingFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
      loadingFixture.componentRef.setInput('loading', true);
      loadingFixture.componentRef.setInput('nodes', SAMPLE_NODES);
      loadingFixture.detectChanges();
      const spinner: HTMLElement | null = (
        loadingFixture.nativeElement as HTMLElement
      ).querySelector('.ui-lib-tree-select__spinner');
      expect(spinner).toBeTruthy();
    });

    it('should be disabled when loading=true', (): void => {
      const loadingFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
      loadingFixture.componentRef.setInput('loading', true);
      loadingFixture.componentRef.setInput('nodes', SAMPLE_NODES);
      loadingFixture.detectChanges();
      expect(loadingFixture.componentInstance.isDisabled()).toBe(true);
    });
  });

  describe('Accessibility', (): void => {
    beforeEach((): void => setup());

    it('should have aria-controls pointing to panel ID', (): void => {
      const host: HTMLElement = getHost();
      const ariaControls: string | null = host.getAttribute('aria-controls');
      expect(ariaControls).toBeTruthy();
      expect(ariaControls).toContain('ui-lib-tree-select');
    });

    it('should have tabindex 0 by default', (): void => {
      expect(getHost().getAttribute('tabindex')).toBe('0');
    });

    it('should set aria-invalid when invalid=true', (): void => {
      const invalidFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
      invalidFixture.componentRef.setInput('invalid', true);
      invalidFixture.componentRef.setInput('nodes', SAMPLE_NODES);
      invalidFixture.detectChanges();
      expect((invalidFixture.nativeElement as HTMLElement).getAttribute('aria-invalid')).toBe(
        'true'
      );
    });

    it('should set aria-required when required=true', (): void => {
      const requiredFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
      requiredFixture.componentRef.setInput('required', true);
      requiredFixture.componentRef.setInput('nodes', SAMPLE_NODES);
      requiredFixture.detectChanges();
      expect((requiredFixture.nativeElement as HTMLElement).getAttribute('aria-required')).toBe(
        'true'
      );
    });

    it('should set aria-label when provided', (): void => {
      const labelFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
      labelFixture.componentRef.setInput('ariaLabel', 'Choose category');
      labelFixture.componentRef.setInput('nodes', SAMPLE_NODES);
      labelFixture.detectChanges();
      expect((labelFixture.nativeElement as HTMLElement).getAttribute('aria-label')).toBe(
        'Choose category'
      );
    });
  });

  describe('Empty state', (): void => {
    it('should show empty message when nodes array is empty', (): void => {
      const emptyFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
      emptyFixture.componentRef.setInput('nodes', []);
      emptyFixture.componentInstance.panelVisible.set(true);
      emptyFixture.detectChanges();
      const emptyEl: HTMLElement | null = (emptyFixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-tree-select__empty'
      );
      expect(emptyEl).toBeTruthy();
    });

    it('should display custom empty message', (): void => {
      const emptyFixture: ComponentFixture<TreeSelect> = TestBed.createComponent(TreeSelect);
      emptyFixture.componentRef.setInput('nodes', []);
      emptyFixture.componentRef.setInput('emptyMessage', 'Nothing here');
      emptyFixture.componentInstance.panelVisible.set(true);
      emptyFixture.detectChanges();
      const emptyEl: HTMLElement = (emptyFixture.nativeElement as HTMLElement).querySelector(
        '.ui-lib-tree-select__empty'
      ) as HTMLElement;
      expect(emptyEl.textContent!.trim()).toBe('Nothing here');
    });
  });
});
