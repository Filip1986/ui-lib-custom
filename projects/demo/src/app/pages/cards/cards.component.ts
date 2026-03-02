import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  effect,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Card,
  CardVariant,
  CardElevation,
  ThemeConfigService,
  Button,
  SHADOWS,
  Tabs,
  Tab,
  TabsValue,
} from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { FormsModule } from '@angular/forms';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';
import { VariantComparisonComponent } from '../../shared/components/variant-comparison/variant-comparison.component';

type ShadowKey = string;
const SHADOW_MAP = SHADOWS as Record<string, string>;

type TabKey =
  | 'playground'
  | 'variants'
  | 'api-reference'
  | 'usage'
  | 'performance'
  | 'accessibility';

type ViewportPreset = { key: string; label: string; width: number; height: number };

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    CommonModule,
    Card,
    Tabs,
    Tab,
    Button,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    ThemeScopeDirective,
    FormsModule,
    DocCodeSnippetComponent,
    CodePreviewComponent,
    VariantComparisonComponent,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {
  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'variants', label: 'Variants' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
    { id: 'performance', label: 'Performance Features' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public readonly activeTab = signal<TabKey>('playground');

  public setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  public readonly snippets = {
    usage: `import { Card } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [Card],
  template:
    '<ui-lib-card showHeader>\n' +
    '  <div card-header>Title</div>\n' +
    '  Body content\n' +
    '</ui-lib-card>'
})
export class Example {}`,
  } as const;

  public readonly cardExample = `<ui-lib-card>
  <div card-header>Card Title</div>
  Card content
  <div card-footer>Actions</div>
</ui-lib-card>`;

  public readonly variant = signal<CardVariant>('material');
  public readonly elevation = signal<CardElevation>('medium');
  public readonly bordered = signal(false);
  public readonly hoverable = signal(false);
  public readonly title = signal('Card Title');
  public readonly body = signal('Cards can host arbitrary content and actions.');
  public readonly showHeader = signal(true);
  public readonly showFooter = signal(true);
  public readonly headerBg = signal('');
  public readonly footerBg = signal('');

  public readonly useGlobalVariant = signal(true);
  public readonly variants: CardVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly elevations: CardElevation[] = ['none', 'low', 'medium', 'high'];

  private readonly themeService = inject(ThemeConfigService);

  public readonly useLocalTheme = signal(false);
  public readonly localSurface = signal('');
  public readonly localBorder = signal('');

  private readonly globalVars = computed<Record<string, string>>((): Record<string, string> => {
    const preset = this.themeService.preset();
    return this.themeService.getCssVars(preset);
  });
  private readonly localVars = computed<Record<string, string>>((): Record<string, string> => {
    const vars: Record<string, string> = {};
    if (this.localSurface().trim()) {
      vars['--uilib-card-bg'] = this.localSurface().trim();
      vars['--uilib-surface'] = this.localSurface().trim();
      vars['--uilib-card-header-bg'] = this.localSurface().trim();
      vars['--uilib-card-footer-bg'] = this.localSurface().trim();
    }
    if (this.localBorder().trim()) {
      vars['--uilib-card-border'] = this.localBorder().trim();
    }
    return vars;
  });

  public readonly appliedTheme = computed<Record<string, string>>((): Record<string, string> => {
    const base = this.globalVars();
    if (!this.useLocalTheme()) return base;
    return { ...base, ...this.localVars() };
  });

  public readonly shadowOptions: ShadowKey[] = Object.keys(SHADOW_MAP).filter(
    (key: string): boolean => key.startsWith('shadow-')
  );
  public readonly globalShadow = computed<string>(
    (): string =>
      SHADOW_MAP[
        this.themeService.preset().cardShadow ?? this.themeService.preset().shadow ?? ''
      ] ?? 'none'
  );
  public readonly selectedShadow = signal<ShadowKey>(
    this.resolveShadowKey(
      this.themeService.preset().cardShadow ?? this.themeService.preset().shadow
    )
  );
  public readonly shadowValue = computed<string>((): string =>
    this.useLocalTheme() ? (SHADOW_MAP[this.selectedShadow()] ?? 'none') : this.globalShadow()
  );

  public setShadow(value: string): void {
    if (SHADOW_MAP[value]) {
      this.selectedShadow.set(value);
    }
  }

  private resolveShadowKey(value?: string): ShadowKey {
    return value && SHADOW_MAP[value] ? value : 'shadow-1';
  }

  constructor() {
    effect((): void => {
      if (!this.useGlobalVariant()) return;
      const v = this.themeService.preset().variant as CardVariant;
      this.variant.set(v);
    });
  }

  public resetLocalTheme(): void {
    this.localSurface.set('');
    this.localBorder.set('');
    this.headerBg.set('');
    this.footerBg.set('');
  }

  public selectVariant(v: CardVariant): void {
    this.useGlobalVariant.set(false);
    this.variant.set(v);
  }

  public setFollowThemeVariant(on: boolean): void {
    this.useGlobalVariant.set(on);
    if (on) {
      const v = this.themeService.preset().variant as CardVariant;
      this.variant.set(v);
    }
  }

  @ViewChild(DocDemoViewportComponent) public viewport?: DocDemoViewportComponent;

  public get viewportPresets(): ViewportPreset[] {
    return this.viewport?.presets() ?? [];
  }

  public viewportDisplayWidth(): number {
    return this.viewport?.displayWidth() ?? 0;
  }

  public viewportDisplayHeight(): number {
    return this.viewport?.displayHeight() ?? 0;
  }

  public viewportCustomWidth(): number {
    return this.viewport?.customWidth() ?? 0;
  }

  public setViewportCustomWidth(value: number): void {
    this.viewport?.setCustomWidth(value);
  }

  public setViewportPreset(preset: ViewportPreset): void {
    this.viewport?.setPreset(preset);
  }

  public applyViewportCustom(): void {
    this.viewport?.setCustom();
  }

  public rotateViewport(): void {
    this.viewport?.rotate();
  }

  public setViewportDensity(value: 'default' | 'comfortable' | 'compact'): void {
    this.viewport?.setDensity(value);
  }
}
