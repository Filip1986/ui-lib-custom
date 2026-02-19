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

type ShadowKey = string;
const SHADOW_MAP = SHADOWS as Record<string, string>;

type TabKey = 'playground' | 'api-reference' | 'usage' | 'performance';

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
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
    { id: 'performance', label: 'Performance Features' },
  ];

  activeTab = signal<TabKey>('playground');

  setTab(tab: TabKey) {
    this.activeTab.set(tab);
  }

  onTabChange(value: TabsValue | null) {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  readonly snippets = {
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

  readonly cardExample = `<ui-lib-card>
  <div card-header>Card Title</div>
  Card content
  <div card-footer>Actions</div>
</ui-lib-card>`;

  variant = signal<CardVariant>('material');
  elevation = signal<CardElevation>('medium');
  bordered = signal(false);
  hoverable = signal(false);
  title = signal('Card Title');
  body = signal('Cards can host arbitrary content and actions.');
  showHeader = signal(true);
  showFooter = signal(true);
  headerBg = signal('');
  footerBg = signal('');

  useGlobalVariant = signal(true);
  readonly variants: CardVariant[] = ['material', 'bootstrap', 'minimal'];
  readonly elevations: CardElevation[] = ['none', 'low', 'medium', 'high'];

  private readonly themeService = inject(ThemeConfigService);

  useLocalTheme = signal(false);
  localSurface = signal('');
  localBorder = signal('');

  private readonly globalVars = computed(() => {
    const preset = this.themeService.preset();
    return this.themeService.getCssVars(preset);
  });
  private readonly localVars = computed(() => {
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

  readonly appliedTheme = computed(() => {
    const base = this.globalVars();
    if (!this.useLocalTheme()) return base;
    return { ...base, ...this.localVars() };
  });

  readonly shadowOptions: ShadowKey[] = Object.keys(SHADOW_MAP).filter((key) =>
    key.startsWith('shadow-')
  );
  readonly globalShadow = computed(
    () =>
      SHADOW_MAP[
        this.themeService.preset().cardShadow ?? this.themeService.preset().shadow ?? ''
      ] ?? 'none'
  );
  readonly selectedShadow = signal<ShadowKey>(
    this.resolveShadowKey(
      this.themeService.preset().cardShadow ?? this.themeService.preset().shadow
    )
  );
  readonly shadowValue = computed(() =>
    this.useLocalTheme() ? (SHADOW_MAP[this.selectedShadow()] ?? 'none') : this.globalShadow()
  );

  setShadow(value: string) {
    if (SHADOW_MAP[value]) {
      this.selectedShadow.set(value);
    }
  }

  private resolveShadowKey(value?: string): ShadowKey {
    return value && SHADOW_MAP[value] ? value : 'shadow-1';
  }

  constructor() {
    effect(() => {
      if (!this.useGlobalVariant()) return;
      const v = this.themeService.preset().variant as CardVariant;
      this.variant.set(v);
    });
  }

  resetLocalTheme() {
    this.localSurface.set('');
    this.localBorder.set('');
    this.headerBg.set('');
    this.footerBg.set('');
  }

  selectVariant(v: CardVariant) {
    this.useGlobalVariant.set(false);
    this.variant.set(v);
  }

  setFollowThemeVariant(on: boolean) {
    this.useGlobalVariant.set(on);
    if (on) {
      const v = this.themeService.preset().variant as CardVariant;
      this.variant.set(v);
    }
  }

  @ViewChild(DocDemoViewportComponent) viewport?: DocDemoViewportComponent;

  get viewportPresets() {
    return this.viewport?.presets() ?? [];
  }

  viewportDisplayWidth() {
    return this.viewport?.displayWidth() ?? 0;
  }

  viewportDisplayHeight() {
    return this.viewport?.displayHeight() ?? 0;
  }

  viewportCustomWidth() {
    return this.viewport?.customWidth() ?? 0;
  }

  setViewportCustomWidth(value: number) {
    this.viewport?.setCustomWidth(value);
  }

  setViewportPreset(preset: { key: string; label: string; width: number; height: number }) {
    this.viewport?.setPreset(preset);
  }

  applyViewportCustom() {
    this.viewport?.setCustom();
  }

  rotateViewport() {
    this.viewport?.rotate();
  }

  setViewportDensity(value: 'default' | 'comfortable' | 'compact') {
    this.viewport?.setDensity(value);
  }
}
