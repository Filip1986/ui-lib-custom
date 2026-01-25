import { Component, ChangeDetectionStrategy, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UiLibInput, InputVariant, InputType, ThemeConfigService } from 'ui-lib-custom';
import { Button } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { ThemeScopeDirective } from '../../shared/theme-scope.directive';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [CommonModule, FormsModule, UiLibInput, Button, DocPageLayoutComponent, DocDemoViewportComponent, ThemeScopeDirective],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputsComponent {
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
  ];

  private readonly themeService = inject(ThemeConfigService);

  variant = signal<InputVariant>('material');
  inputType = signal<InputType>('text');
  value = signal('');
  password = signal('');
  error = signal('');
  showCounter = signal(true);
  showClear = signal(true);
  showToggle = signal(true);
  required = signal(true);
  label = signal('Email');
  placeholder = signal('you@example.com');
  useGlobalVariant = signal(true);

  variants: InputVariant[] = ['material', 'bootstrap', 'minimal'];
  types: InputType[] = ['text', 'email', 'password', 'number', 'search', 'tel', 'url'];

  private readonly globalVars = computed(() => {
    const preset = this.themeService.preset();
    return this.themeService.getCssVars(preset);
  });

  readonly appliedTheme = computed(() => this.globalVars());

  constructor() {
    effect(() => {
      if (!this.useGlobalVariant()) return;
      const v = this.themeService.preset().variant as InputVariant;
      this.variant.set(v);
    });
  }

  onSubmit(form: NgForm) {
    if (!this.value().trim()) {
      this.error.set('Required field');
      return;
    }
    this.error.set('');
    alert(`Submitted value: ${this.value()}`);
    form.resetForm();
    this.value.set('');
    this.password.set('');
  }

  setVariant(v: InputVariant) {
    this.useGlobalVariant.set(false);
    this.variant.set(v);
  }

  setFollowThemeVariant(on: boolean) {
    this.useGlobalVariant.set(on);
    if (on) {
      const v = this.themeService.preset().variant as InputVariant;
      this.variant.set(v);
    }
  }

  setType(t: InputType) {
    this.inputType.set(t);
  }
}
