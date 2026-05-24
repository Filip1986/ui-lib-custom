import { ChangeDetectionStrategy, Component, computed, signal, viewChild } from '@angular/core';
import type { WritableSignal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';

export interface ComponentScore {
  name: string;
  category: string;
  api: number;
  a11y: number;
  perf: number;
  comp: number;
  theme: number;
  dx: number;
  docs: number;
  polish: number;
  angular: number;
  feel: number;
  avg: number;
}

export interface PhaseInfo {
  id: number;
  name: string;
  description: string;
  status: 'complete' | 'active' | 'queued';
  componentCount: number | null;
  completedCount: number | null;
  exitCriteria: string[];
  milestone?: string;
}

export interface NextStep {
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium';
  category: string;
}

export interface WowFactor {
  number: number;
  title: string;
  tagline: string;
  status: 'achieved' | 'in-progress' | 'queued';
  items: string[];
}

export interface ScoringDimension {
  column: string;
  fullName: string;
  checkpoints: number;
  gate: string;
  standard: string;
}

export interface BuildQueueItem {
  priority: number;
  name: string;
  rationale: string;
  complexity: 'Very Low' | 'Low' | 'Low-Medium' | 'Medium' | 'Medium-High' | 'High';
  reference: string;
  status: 'queued' | 'in-progress' | 'done' | 'horizon';
}

export interface DocStatusItem {
  component: string;
  hasApiDoc: boolean;
  hasImplDoc: boolean;
  hasDemoPage: boolean;
  status: 'complete' | 'partial' | 'missing';
  notes?: string;
}

export interface ModernityRow {
  check: string;
  angularMaterial: 'yes' | 'no' | 'partial';
  primeNG: 'yes' | 'no' | 'partial';
  ngZorro: 'yes' | 'no' | 'partial';
  thisLibrary: 'yes' | 'no' | 'partial';
}

export interface CssArchRow {
  check: string;
  category: 'cascade' | 'tokens' | 'theming' | 'a11y' | 'dx';
  angularMaterial: 'yes' | 'no' | 'partial';
  primeNG: 'yes' | 'no' | 'partial';
  ngZorro: 'yes' | 'no' | 'partial';
  thisLibrary: 'yes' | 'no' | 'partial';
  notes?: string;
}

export interface Differentiator {
  feature: string;
  notes: string;
  isUnique: boolean;
}

export interface LaunchStep {
  id: number;
  title: string;
  description: string;
  status: 'done' | 'active' | 'queued';
  gate: string;
  actions: string[];
}

/**
 * Roadmap and progress tracker page for the ui-lib-custom library.
 * Covers dashboard, milestones, scoreboard, build queue, docs status,
 * competitive positioning, launch sequence, next steps, and wow factors.
 */
@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
  ],
  templateUrl: './roadmap.component.html',
  styleUrl: './roadmap.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoadmapComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly sections: DocSection[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'milestone-progress', label: 'Milestones' },
    { id: 'component-scoreboard', label: 'Scoreboard' },
    { id: 'build-queue', label: 'Build Queue' },
    { id: 'documentation-status', label: 'Docs Status' },
    { id: 'competitive-strategy', label: 'Competitive' },
    { id: 'css-architecture', label: 'CSS Architecture' },
    { id: 'pro-strategy', label: 'Pro Strategy' },
    { id: 'launch-sequence', label: 'Launch Path' },
    { id: 'next-steps', label: 'Next Steps' },
    { id: 'wow-factors', label: 'Wow Factors' },
  ];

  // ── Filter state ─────────────────────────────────────────────────────────
  public readonly searchQuery: WritableSignal<string> = signal<string>('');
  public readonly activeCategory: WritableSignal<string> = signal<string>('All');

  public readonly categories: string[] = [
    'All',
    'Core Inputs',
    'Layout',
    'Overlay & Modal',
    'Navigation & Menus',
    'Data Display',
    'Feedback & Status',
    'Utilities & Directives',
  ];

  // ── Component score data ──────────────────────────────────────────────────
  public readonly allComponents: ComponentScore[] = [
    {
      name: 'Button',
      category: 'Core Inputs',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 8.9,
    },
    {
      name: 'Input',
      category: 'Core Inputs',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 8.8,
    },
    {
      name: 'Textarea',
      category: 'Core Inputs',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'Select',
      category: 'Core Inputs',
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 8,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.2,
    },
    {
      name: 'AutoComplete',
      category: 'Core Inputs',
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 8,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.2,
    },
    {
      name: 'CascadeSelect',
      category: 'Core Inputs',
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 8,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.2,
    },
    {
      name: 'DatePicker',
      category: 'Core Inputs',
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.3,
    },
    {
      name: 'Checkbox',
      category: 'Core Inputs',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'RadioButton',
      category: 'Core Inputs',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 8,
      avg: 8.8,
    },
    {
      name: 'ToggleButton',
      category: 'Core Inputs',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'ToggleSwitch',
      category: 'Core Inputs',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 8,
      avg: 8.8,
    },
    {
      name: 'SelectButton',
      category: 'Core Inputs',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'InputNumber',
      category: 'Core Inputs',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'InputMask',
      category: 'Core Inputs',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'InputOtp',
      category: 'Core Inputs',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'Password',
      category: 'Core Inputs',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'Rating',
      category: 'Core Inputs',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'Knob',
      category: 'Core Inputs',
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 8,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.2,
    },
    {
      name: 'Slider',
      category: 'Core Inputs',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.8,
    },
    {
      name: 'ColorPicker',
      category: 'Core Inputs',
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 8,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.2,
    },
    {
      name: 'KeyFilter',
      category: 'Core Inputs',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.6,
    },
    {
      name: 'Card',
      category: 'Layout',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'Stack',
      category: 'Layout',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'Inline',
      category: 'Layout',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'Grid',
      category: 'Layout',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'Container',
      category: 'Layout',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 8.9,
    },
    {
      name: 'FloatLabel',
      category: 'Layout',
      api: 9,
      a11y: 9,
      perf: 10,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'IconField',
      category: 'Layout',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'InputGroup',
      category: 'Layout',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'FormField',
      category: 'Layout',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 9,
      avg: 8.7,
    },
    {
      name: 'Divider',
      category: 'Layout',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'Toolbar',
      category: 'Layout',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 8.9,
    },
    {
      name: 'Fluid',
      category: 'Layout',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 8,
      dx: 9,
      docs: 8,
      polish: 9,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'Fieldset',
      category: 'Layout',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'Panel',
      category: 'Layout',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'ScrollPanel',
      category: 'Layout',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 8.9,
    },
    {
      name: 'Dialog',
      category: 'Overlay & Modal',
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 9,
      theme: 8,
      dx: 9,
      docs: 8,
      polish: 9,
      angular: 9,
      feel: 8,
      avg: 8.6,
    },
    {
      name: 'DynamicDialog',
      category: 'Overlay & Modal',
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 8,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.3,
    },
    {
      name: 'Drawer',
      category: 'Overlay & Modal',
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.5,
    },
    {
      name: 'BottomSheet',
      category: 'Overlay & Modal',
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.5,
    },
    {
      name: 'Popover',
      category: 'Overlay & Modal',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'Tooltip',
      category: 'Overlay & Modal',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'ConfirmDialog',
      category: 'Overlay & Modal',
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 8,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.3,
    },
    {
      name: 'ConfirmPopup',
      category: 'Overlay & Modal',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 8,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 8.9,
    },
    {
      name: 'Tabs',
      category: 'Navigation & Menus',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'Accordion',
      category: 'Navigation & Menus',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'Breadcrumb',
      category: 'Navigation & Menus',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'ContextMenu',
      category: 'Navigation & Menus',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'Dock',
      category: 'Navigation & Menus',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'Menu',
      category: 'Navigation & Menus',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'MegaMenu',
      category: 'Navigation & Menus',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'Menubar',
      category: 'Navigation & Menus',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'PanelMenu',
      category: 'Navigation & Menus',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'TieredMenu',
      category: 'Navigation & Menus',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'Stepper',
      category: 'Navigation & Menus',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'SpeedDial',
      category: 'Navigation & Menus',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.8,
    },
    {
      name: 'Table',
      category: 'Data Display',
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.6,
    },
    {
      name: 'TreeTable',
      category: 'Data Display',
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.5,
    },
    {
      name: 'Tree',
      category: 'Data Display',
      api: 9,
      a11y: 8,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 8,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.6,
    },
    {
      name: 'TreeSelect',
      category: 'Data Display',
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.6,
    },
    {
      name: 'Listbox',
      category: 'Data Display',
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.6,
    },
    {
      name: 'DataView',
      category: 'Data Display',
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.3,
    },
    {
      name: 'VirtualScroller',
      category: 'Data Display',
      api: 8,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.5,
    },
    {
      name: 'Timeline',
      category: 'Data Display',
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.3,
    },
    {
      name: 'OrderList',
      category: 'Data Display',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'OrganizationChart',
      category: 'Data Display',
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.3,
    },
    {
      name: 'PickList',
      category: 'Data Display',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'Paginator',
      category: 'Data Display',
      api: 8,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.5,
    },
    {
      name: 'Carousel',
      category: 'Data Display',
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.3,
    },
    {
      name: 'Galleria',
      category: 'Data Display',
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.3,
    },
    {
      name: 'Chart',
      category: 'Data Display',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 8.9,
    },
    {
      name: 'Alert',
      category: 'Feedback & Status',
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.5,
    },
    {
      name: 'Toast',
      category: 'Feedback & Status',
      api: 9,
      a11y: 10,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.1,
    },
    {
      name: 'Badge',
      category: 'Feedback & Status',
      api: 8,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.4,
    },
    {
      name: 'Tag',
      category: 'Feedback & Status',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 8.9,
    },
    {
      name: 'Chip',
      category: 'Feedback & Status',
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.5,
    },
    {
      name: 'Message',
      category: 'Feedback & Status',
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.6,
    },
    {
      name: 'Skeleton',
      category: 'Feedback & Status',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.6,
    },
    {
      name: 'ProgressBar',
      category: 'Feedback & Status',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.6,
    },
    {
      name: 'ProgressSpinner',
      category: 'Feedback & Status',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 8.9,
    },
    {
      name: 'MeterGroup',
      category: 'Feedback & Status',
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.3,
    },
    {
      name: 'Avatar',
      category: 'Utilities & Directives',
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 8,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.2,
    },
    {
      name: 'Icon',
      category: 'Utilities & Directives',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'IconButton',
      category: 'Utilities & Directives',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.6,
    },
    {
      name: 'ButtonGroup',
      category: 'Utilities & Directives',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'SplitButton',
      category: 'Utilities & Directives',
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.6,
    },
    {
      name: 'Image',
      category: 'Utilities & Directives',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'ImageCompare',
      category: 'Utilities & Directives',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 8.9,
    },
    {
      name: 'Upload',
      category: 'Utilities & Directives',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 8.9,
    },
    {
      name: 'Inplace',
      category: 'Utilities & Directives',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 8.9,
    },
    {
      name: 'BlockUI',
      category: 'Utilities & Directives',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.0,
    },
    {
      name: 'ClassNames',
      category: 'Utilities & Directives',
      api: 9,
      a11y: 9,
      perf: 10,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 9.1,
    },
    {
      name: 'Terminal',
      category: 'Utilities & Directives',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 8.9,
    },
    {
      name: 'Ripple',
      category: 'Utilities & Directives',
      api: 8,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
      avg: 8.7,
    },
    {
      name: 'ScrollTop',
      category: 'Utilities & Directives',
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.4,
    },
    {
      name: 'StyleClass',
      category: 'Utilities & Directives',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'FocusTrap',
      category: 'Utilities & Directives',
      api: 8,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.4,
    },
    {
      name: 'AnimateOnScroll',
      category: 'Utilities & Directives',
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.6,
    },
    {
      name: 'AutoFocus',
      category: 'Utilities & Directives',
      api: 9,
      a11y: 9,
      perf: 10,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.7,
    },
    {
      name: 'Bind',
      category: 'Utilities & Directives',
      api: 8,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
      avg: 8.6,
    },
  ];

  public readonly filteredComponents: Signal<ComponentScore[]> = computed<ComponentScore[]>(
    (): ComponentScore[] => {
      const query: string = this.searchQuery().toLowerCase().trim();
      const cat: string = this.activeCategory();
      return this.allComponents.filter((component: ComponentScore): boolean => {
        const matchesCategory: boolean = cat === 'All' || component.category === cat;
        const matchesQuery: boolean = query === '' || component.name.toLowerCase().includes(query);
        return matchesCategory && matchesQuery;
      });
    },
  );

  public readonly totalComponents: Signal<number> = computed<number>(
    (): number => this.allComponents.length,
  );

  public readonly averageScore: Signal<string> = computed<string>((): string => {
    const total: number = this.allComponents.reduce(
      (sum: number, c: ComponentScore): number => sum + c.avg,
      0,
    );
    return (total / this.allComponents.length).toFixed(2);
  });

  public readonly perfectScoreCount: Signal<number> = computed<number>(
    (): number => this.allComponents.filter((c: ComponentScore): boolean => c.avg >= 9.0).length,
  );

  public readonly categoryBreakdown: Signal<{ name: string; count: number }[]> = computed<
    { name: string; count: number }[]
  >((): { name: string; count: number }[] => {
    const map: Map<string, number> = new Map<string, number>();
    this.allComponents.forEach((component: ComponentScore): void => {
      map.set(component.category, (map.get(component.category) ?? 0) + 1);
    });
    return Array.from(map.entries()).map(
      ([name, count]: [string, number]): { name: string; count: number } => ({ name, count }),
    );
  });

  // ── Phases ────────────────────────────────────────────────────────────────
  public readonly phases: PhaseInfo[] = [
    {
      id: 0,
      name: 'Foundation Cleanup',
      description:
        'Infrastructure gaps closed, entry points wired, dead-code baseline established.',
      status: 'complete',
      componentCount: null,
      completedCount: null,
      exitCriteria: [
        'Secondary entry points for all components',
        'Overlay appendTo / z-index manager',
        'knip dead-code baseline',
        'Documentation gaps resolved for core components',
      ],
    },
    {
      id: 1,
      name: 'Elite A11y — Overlays & Navigation',
      description:
        'Focus traps, aria-modal, menu keyboard navigation — the patterns developers scrutinise first.',
      status: 'complete',
      componentCount: 17,
      completedCount: 17,
      exitCriteria: [
        'All 17 overlay & navigation components scored ≥ 8',
        'Internal axe-core audit — violations resolved',
        'Zero open a11y regressions in Tier 1 or Tier 2',
      ],
    },
    {
      id: 2,
      name: 'Elite A11y — Forms & Data Display',
      description:
        'Form controls and data components production-quality — the daily-driver components teams trust.',
      status: 'complete',
      componentCount: 20,
      completedCount: 20,
      exitCriteria: [
        'All 20 form & data components scored ≥ 8',
        'DatePicker and Table pass screen reader spot-check',
        'No open regressions across Tiers 1–4',
      ],
    },
    {
      id: 3,
      name: 'Full Coverage + Ecosystem',
      description:
        'Every component green. 100 components hardened. Library ready to be shown publicly.',
      status: 'complete',
      componentCount: 100,
      completedCount: 100,
      milestone: '🏆 Component Hardening Milestone ACHIEVED',
      exitCriteria: [
        'All 76 original components scored ≥ 8 ✓',
        'All 24+ new components scored ≥ 8 ✓',
        'Storybook built',
        'npm run test:a11y:all passes',
      ],
    },
    {
      id: 4,
      name: 'Public Beta 🚀',
      description: 'First public release. Library on npm. Developers can install and use it.',
      status: 'active',
      componentCount: null,
      completedCount: null,
      milestone: '🎯 NEXT MAJOR MILESTONE',
      exitCriteria: [
        'npm publish — first public version (0.9.0)',
        'Landing page live — "Built Different" benchmark section',
        'Documentation site with interactive demos',
        'Open benchmark repo published',
        'Demo video recorded',
        '10+ seed developers with positive signal',
        'Angular community announcement',
      ],
    },
    {
      id: 5,
      name: 'v1.0 General Availability 🏆',
      description:
        'Wow Factor #2 complete. Theming is astonishing. The library is what it set out to be.',
      status: 'queued',
      componentCount: null,
      completedCount: null,
      milestone: '🎨 WOW FACTOR #2 TARGET',
      exitCriteria: [
        'Runtime theme switching — seamless, no flash',
        'Full --uilib-* CSS var coverage across all 100 components',
        'Theme preset management (multiple built-in presets)',
        'Brand customization < 30 min documented path',
        'Every component scorecard average ≥ 9',
        'Zero open a11y community issues',
        'Version tagged 1.0.0 on npm',
      ],
    },
  ];

  // ── Scoring Dimensions (from SCORING_CRITERIA.md) ───────────────────────
  public readonly scoringDimensions: ScoringDimension[] = [
    {
      column: 'API',
      fullName: 'API Clarity',
      checkpoints: 16,
      gate: 'Inputs/outputs feel obvious without reading docs; consistent naming; intelligent defaults.',
      standard: 'Angular Style Guide · TypeScript Handbook · Angular Material / Radix UI',
    },
    {
      column: 'A11y',
      fullName: 'Accessibility',
      checkpoints: 28,
      gate: 'Full keyboard nav, correct ARIA, screen reader tested, reduced motion, high contrast — zero axe-core violations.',
      standard: 'WAI-ARIA APG · WCAG 2.1 AA · axe-core · Angular CDK',
    },
    {
      column: 'Perf',
      fullName: 'Performance',
      checkpoints: 20,
      gate: 'No unnecessary renders, signals used correctly, no memory leaks, tree-shaking verified, animations on transform/opacity only.',
      standard: 'Angular Performance Guide · Core Web Vitals · Bundle budget ≤ 15 KB gzip',
    },
    {
      column: 'Comp',
      fullName: 'Composability',
      checkpoints: 14,
      gate: 'Content projection slots sufficient; developer can extend without forking; directive alternatives exist where useful.',
      standard: 'Melt UI · Headless UI · Ark UI · Angular CDK',
    },
    {
      column: 'Theme',
      fullName: 'Theming',
      checkpoints: 15,
      gate: 'All visual properties exposed as --uilib-* CSS vars; dark mode works; runtime variant switching works.',
      standard: 'CSS Custom Properties W3C · --uilib-{component}-{property}[-{variant}][-{state}]',
    },
    {
      column: 'DX',
      fullName: 'Developer Experience',
      checkpoints: 17,
      gate: 'TypeScript autocomplete excellent; error states clear; common use case requires ≤ 3 lines of consumer code.',
      standard: 'shadcn/ui · Angular Material · Nuxt UI · TypeScript strict mode',
    },
    {
      column: 'Docs',
      fullName: 'Documentation',
      checkpoints: 18,
      gate: 'README has selector, all inputs/outputs, content projection, usage example, a11y notes, and edge cases.',
      standard: 'Diátaxis framework · Radix UI docs · Nuxt UI docs',
    },
    {
      column: 'Polish',
      fullName: 'Visual & Interaction Polish',
      checkpoints: 15,
      gate: 'Animations feel smooth and intentional; all interactive states styled; no jarring reflows.',
      standard: 'Vercel Design System · Radix UI Themes · Motion design principles',
    },
    {
      column: 'Angular',
      fullName: 'Angular Integration',
      checkpoints: 16,
      gate: 'Signals-first, OnPush, standalone, SSR-safe, hydration-safe, zoneless-compatible.',
      standard: 'Angular Style Guide · Angular Signals · Angular SSR · Angular CDK',
    },
    {
      column: 'Feel',
      fullName: 'Emotional Quality',
      checkpoints: 10,
      gate: 'Using the component feels satisfying — a developer who uses it would not switch to another library.',
      standard: 'No external standard — honest self-evaluation against 10 specific questions',
    },
    {
      column: 'Cat. 11',
      fullName: 'Competitive Parity & Differentiation',
      checkpoints: 13,
      gate: 'No unresolved capability gap vs Material or PrimeNG. At least one differentiator unique to this library. Does not affect the 10-column Avg score — gates production quality separately.',
      standard: 'Angular Material · PrimeNG · Radix UI · Ark UI · Melt UI',
    },
  ];

  // ── Build Queue ───────────────────────────────────────────────────────────
  public readonly buildQueue: BuildQueueItem[] = [
    {
      priority: 1,
      name: 'DateRangePicker',
      rationale:
        'Every major library has it. Date range selection is a daily developer need. PrimeNG, Material, Ng-Zorro all ship one.',
      complexity: 'Medium',
      reference: 'PrimeNG DatePicker / Material DateRangePicker',
      status: 'queued',
    },
    {
      priority: 2,
      name: 'TimePicker',
      rationale:
        'Standalone time input; extremely common in scheduling / booking UIs. Very low a11y complexity.',
      complexity: 'Low-Medium',
      reference: 'PrimeNG TimePicker, Ng-Zorro TimePicker',
      status: 'queued',
    },
    {
      priority: 3,
      name: 'Empty State',
      rationale:
        '"No data" placeholder; every app needs this; almost no library ships it as a proper component. Highest bang-for-buck.',
      complexity: 'Low',
      reference: 'Ng-Zorro Empty',
      status: 'queued',
    },
    {
      priority: 4,
      name: 'Statistic / Number Display',
      rationale:
        'Key metric display with label + trend; ubiquitous in dashboards. Only Ng-Zorro has it — big differentiator.',
      complexity: 'Low',
      reference: 'Ng-Zorro Statistic',
      status: 'queued',
    },
    {
      priority: 5,
      name: 'Typography',
      rationale:
        'Semantic Heading / Text / Code / Link with token-driven styling. shadcn and Ng-Zorro have it; gives library a complete design-system feel.',
      complexity: 'Low',
      reference: 'Ng-Zorro Typography, shadcn Typography',
      status: 'queued',
    },
    {
      priority: 6,
      name: 'Descriptions / Definition List',
      rationale:
        'Key-value pair display; common in detail views. Only Ng-Zorro ships this — easy differentiator win.',
      complexity: 'Low',
      reference: 'Ng-Zorro Descriptions',
      status: 'queued',
    },
    {
      priority: 7,
      name: 'Segmented Control',
      rationale:
        'View-switcher pattern (Grid/List, Day/Week/Month); distinct from SelectButton (which is a toggle).',
      complexity: 'Low',
      reference: 'Ng-Zorro Segmented',
      status: 'queued',
    },
    {
      priority: 8,
      name: 'Kbd / Keyboard Shortcut Badge',
      rationale:
        'Display keyboard shortcuts inline in tooltips and menus. Only shadcn ships this — small but DX-delightful differentiator.',
      complexity: 'Very Low',
      reference: 'shadcn/ui Kbd',
      status: 'queued',
    },
    {
      priority: 9,
      name: 'Splitter / Resizable Panels',
      rationale:
        'Two or more resizable panes; needed in IDEs, dashboards, editors. PrimeNG, Ng-Zorro, shadcn all have it.',
      complexity: 'Medium-High',
      reference: 'PrimeNG Splitter, shadcn Resizable',
      status: 'queued',
    },
    {
      priority: 10,
      name: 'Scroll Area',
      rationale:
        'Custom-styled scrollbar overlay preserving native scroll. Radix and shadcn ship it — no Angular libraries do.',
      complexity: 'Medium',
      reference: 'Radix ScrollArea, shadcn Scroll Area',
      status: 'queued',
    },
    {
      priority: 11,
      name: 'Calendar (full view)',
      rationale:
        'Full month/year grid for scheduling and event display; distinct from DatePicker. 4 of 6 reference libraries have it.',
      complexity: 'High',
      reference: 'PrimeNG Calendar, Ng-Zorro Calendar',
      status: 'queued',
    },
    {
      priority: 12,
      name: 'Navigation Menu',
      rationale:
        'Top-level horizontal nav with rich dropdown panels; distinct from Menubar. shadcn and Radix both have it first-class.',
      complexity: 'Medium',
      reference: 'Radix NavigationMenu, shadcn Navigation Menu',
      status: 'queued',
    },
  ];

  public readonly horizonQueue: BuildQueueItem[] = [
    {
      priority: 1,
      name: 'Command Palette',
      rationale:
        'Already in VISION.md; high complexity; global keyboard shortcut management. The sexiest DX component.',
      complexity: 'High',
      reference: 'shadcn/ui Command',
      status: 'horizon',
    },
    {
      priority: 2,
      name: 'Hover Card',
      rationale:
        'Rich tooltip-like card on hover; distinct from Tooltip. Needs deliberate API design.',
      complexity: 'Medium',
      reference: 'Radix HoverCard, shadcn Hover Card',
      status: 'horizon',
    },
    {
      priority: 3,
      name: 'Collapsible',
      rationale:
        'Simple show/hide; simpler than Accordion. Accordion covers most cases but Collapsible is the semantic primitive.',
      complexity: 'Low',
      reference: 'Radix Collapsible, shadcn Collapsible',
      status: 'horizon',
    },
    {
      priority: 4,
      name: 'Result / Status Page',
      rationale: 'Full-area result states (success, error, 404, 403); useful in enterprise apps.',
      complexity: 'Low',
      reference: 'Ng-Zorro Result',
      status: 'horizon',
    },
    {
      priority: 5,
      name: 'Anchor / TOC Navigation',
      rationale: 'Scroll-anchored table of contents with active link highlighting.',
      complexity: 'Medium',
      reference: 'Ng-Zorro Anchor',
      status: 'horizon',
    },
  ];

  // ── Documentation Status ──────────────────────────────────────────────────
  public readonly docStatusItems: DocStatusItem[] = [
    {
      component: 'Accordion',
      hasApiDoc: true,
      hasImplDoc: true,
      hasDemoPage: true,
      status: 'complete',
    },
    {
      component: 'Alert',
      hasApiDoc: true,
      hasImplDoc: false,
      hasDemoPage: false,
      status: 'partial',
      notes: 'No demo page · no implementation doc',
    },
    {
      component: 'Badge',
      hasApiDoc: true,
      hasImplDoc: true,
      hasDemoPage: true,
      status: 'complete',
    },
    {
      component: 'Button',
      hasApiDoc: true,
      hasImplDoc: true,
      hasDemoPage: true,
      status: 'complete',
    },
    { component: 'Card', hasApiDoc: true, hasImplDoc: true, hasDemoPage: true, status: 'complete' },
    {
      component: 'Checkbox',
      hasApiDoc: true,
      hasImplDoc: false,
      hasDemoPage: true,
      status: 'partial',
      notes: 'Implementation doc missing',
    },
    {
      component: 'Dialog',
      hasApiDoc: true,
      hasImplDoc: true,
      hasDemoPage: true,
      status: 'complete',
    },
    {
      component: 'Icon',
      hasApiDoc: true,
      hasImplDoc: false,
      hasDemoPage: true,
      status: 'partial',
      notes: 'Implementation doc missing',
    },
    {
      component: 'IconButton',
      hasApiDoc: true,
      hasImplDoc: false,
      hasDemoPage: false,
      status: 'partial',
      notes: 'No demo page · no implementation doc',
    },
    {
      component: 'Input',
      hasApiDoc: true,
      hasImplDoc: true,
      hasDemoPage: true,
      status: 'complete',
    },
    {
      component: 'Layout (Stack / Inline / Grid / Container)',
      hasApiDoc: true,
      hasImplDoc: false,
      hasDemoPage: true,
      status: 'partial',
      notes: 'Implementation doc missing',
    },
    {
      component: 'Select',
      hasApiDoc: true,
      hasImplDoc: false,
      hasDemoPage: true,
      status: 'partial',
      notes: 'Implementation doc missing',
    },
    {
      component: 'SelectButton',
      hasApiDoc: true,
      hasImplDoc: true,
      hasDemoPage: true,
      status: 'complete',
    },
    { component: 'Tabs', hasApiDoc: true, hasImplDoc: true, hasDemoPage: true, status: 'complete' },
    {
      component: 'All other 85+ components',
      hasApiDoc: false,
      hasImplDoc: false,
      hasDemoPage: true,
      status: 'partial',
      notes: 'Component README.md exists · formal reference docs not yet written',
    },
  ];

  public readonly docCompleteCount: Signal<number> = computed<number>(
    (): number =>
      this.docStatusItems.filter((item: DocStatusItem): boolean => item.status === 'complete')
        .length,
  );

  // ── Angular modernity scorecard ───────────────────────────────────────────
  public readonly modernityRows: ModernityRow[] = [
    {
      check: 'Signal inputs (input(), model(), output())',
      angularMaterial: 'no',
      primeNG: 'no',
      ngZorro: 'no',
      thisLibrary: 'yes',
    },
    {
      check: 'Standalone components — no NgModule required',
      angularMaterial: 'yes',
      primeNG: 'yes',
      ngZorro: 'partial',
      thisLibrary: 'yes',
    },
    {
      check: 'OnPush change detection by default',
      angularMaterial: 'partial',
      primeNG: 'partial',
      ngZorro: 'partial',
      thisLibrary: 'yes',
    },
    {
      check: 'Zoneless-compatible (provideZonelessChangeDetection)',
      angularMaterial: 'partial',
      primeNG: 'no',
      ngZorro: 'no',
      thisLibrary: 'yes',
    },
    {
      check: 'SSR-safe (no document/window access on server)',
      angularMaterial: 'yes',
      primeNG: 'partial',
      ngZorro: 'partial',
      thisLibrary: 'yes',
    },
    {
      check: 'Angular block syntax (@if / @for / @switch) 100%',
      angularMaterial: 'partial',
      primeNG: 'partial',
      ngZorro: 'partial',
      thisLibrary: 'yes',
    },
    {
      check: 'ViewEncapsulation.None — no ::ng-deep needed',
      angularMaterial: 'no',
      primeNG: 'no',
      ngZorro: 'no',
      thisLibrary: 'yes',
    },
    {
      check: 'Runtime visual variants (3 themes switchable)',
      angularMaterial: 'no',
      primeNG: 'no',
      ngZorro: 'no',
      thisLibrary: 'yes',
    },
    {
      check: 'Full --uilib-* CSS token coverage',
      angularMaterial: 'partial',
      primeNG: 'partial',
      ngZorro: 'no',
      thisLibrary: 'yes',
    },
    {
      check: 'Dedicated .a11y.spec.ts per component',
      angularMaterial: 'no',
      primeNG: 'no',
      ngZorro: 'no',
      thisLibrary: 'yes',
    },
  ];

  // ── CSS Architecture competitive tracking ─────────────────────────────────
  public readonly cssArchRows: CssArchRow[] = [
    // --- Cascade & Specificity ---
    {
      check: 'CSS Cascade Layers (@layer) — library styles in named layer',
      category: 'cascade',
      angularMaterial: 'no',
      primeNG: 'no',
      ngZorro: 'no',
      thisLibrary: 'yes',
      notes:
        'uilib.tokens + uilib.components layers declared in themes.scss. Consumer CSS always wins without !important.',
    },
    {
      check: 'Consumer overrides require zero specificity tricks / !important',
      category: 'cascade',
      angularMaterial: 'no',
      primeNG: 'no',
      ngZorro: 'no',
      thisLibrary: 'yes',
      notes:
        'Direct result of @layer: any unlayered consumer CSS beats all layered library styles.',
    },
    {
      check: 'BEM double-hyphen modifier convention (--modifier, not -modifier)',
      category: 'dx',
      angularMaterial: 'partial',
      primeNG: 'partial',
      ngZorro: 'no',
      thisLibrary: 'yes',
      notes:
        'Consistent ui-lib-{component}--{modifier} pattern on all host classes. Prevents class collision with element parts.',
    },
    // --- Design Tokens ---
    {
      check: 'CSS custom property token system (--uilib-* namespace)',
      category: 'tokens',
      angularMaterial: 'partial',
      primeNG: 'partial',
      ngZorro: 'no',
      thisLibrary: 'yes',
      notes:
        'All spacing, color, radius, shadow, typography, and transition values exposed as CSS vars.',
    },
    {
      check: 'Global palette tokens shared across all components',
      category: 'tokens',
      angularMaterial: 'yes',
      primeNG: 'partial',
      ngZorro: 'no',
      thisLibrary: 'yes',
      notes:
        '--uilib-color-primary-*, --uilib-color-neutral-*, etc. updated once, all components respond.',
    },
    {
      check: 'Component-scoped token isolation (--uilib-{component}-*)',
      category: 'tokens',
      angularMaterial: 'partial',
      primeNG: 'partial',
      ngZorro: 'no',
      thisLibrary: 'yes',
      notes:
        'Every component declares its own token namespace. Changing --uilib-button-bg does not affect any other component.',
    },
    {
      check: 'Density scale system (--uilib-density-scale-y via data-density)',
      category: 'tokens',
      angularMaterial: 'partial',
      primeNG: 'no',
      ngZorro: 'no',
      thisLibrary: 'yes',
      notes:
        'data-density="compact|comfortable" on any ancestor scales all child component heights.',
    },
    // --- Theming ---
    {
      check: 'Dark mode via data-theme attribute (no CSS class or rebuild)',
      category: 'theming',
      angularMaterial: 'partial',
      primeNG: 'yes',
      ngZorro: 'partial',
      thisLibrary: 'yes',
      notes: 'Toggle data-theme="dark" on html/body; overrides-only dark block in themes.scss.',
    },
    {
      check: 'OS dark mode fallback (@media prefers-color-scheme)',
      category: 'theming',
      angularMaterial: 'yes',
      primeNG: 'partial',
      ngZorro: 'no',
      thisLibrary: 'yes',
      notes:
        'themes.scss section 3b mirrors the dark token block for users without an explicit data-theme.',
    },
    {
      check: 'Three runtime visual variants (material / bootstrap / minimal)',
      category: 'theming',
      angularMaterial: 'no',
      primeNG: 'no',
      ngZorro: 'no',
      thisLibrary: 'yes',
      notes:
        'Switchable at runtime via ThemeConfigService or per-component variant input. No rebuild needed.',
    },
    {
      check: 'ViewEncapsulation.None — zero ::ng-deep needed',
      category: 'theming',
      angularMaterial: 'no',
      primeNG: 'no',
      ngZorro: 'no',
      thisLibrary: 'yes',
      notes:
        'Global CSS variable cascade works correctly because there is no emulated encapsulation barrier.',
    },
    {
      check: 'Consumer @layer interop (uilib.* slots into consumer layer stack)',
      category: 'cascade',
      angularMaterial: 'no',
      primeNG: 'no',
      ngZorro: 'no',
      thisLibrary: 'yes',
      notes:
        'Consumers can declare: @layer my-base, uilib.tokens, uilib.components, my-overrides — library slots in naturally.',
    },
    // --- Accessibility ---
    {
      check: 'prefers-reduced-motion — every animation has media query override',
      category: 'a11y',
      angularMaterial: 'partial',
      primeNG: 'partial',
      ngZorro: 'no',
      thisLibrary: 'yes',
      notes:
        'Systematic: every component SCSS file includes a @media (prefers-reduced-motion) block.',
    },
    {
      check: 'forced-colors (high contrast) support',
      category: 'a11y',
      angularMaterial: 'partial',
      primeNG: 'no',
      ngZorro: 'no',
      thisLibrary: 'yes',
      notes:
        'high-contrast.scss covers all components. Intentionally kept outside @layer so it always wins.',
    },
    // --- DX ---
    {
      check: 'TypeScript design-tokens.ts as single source of truth for hex values',
      category: 'dx',
      angularMaterial: 'no',
      primeNG: 'no',
      ngZorro: 'no',
      thisLibrary: 'yes',
      notes:
        'design-tokens.ts holds all canonical color values; SCSS uses CSS var with hex fallback from the TS constant.',
    },
    {
      check: 'ADR documenting CSS cascade layer architecture decision',
      category: 'dx',
      angularMaterial: 'no',
      primeNG: 'no',
      ngZorro: 'no',
      thisLibrary: 'yes',
      notes: 'docs/architecture/ADR_CSS_LAYER_ADOPTION.md — rationale, alternatives, consequences.',
    },
  ];

  public readonly cssArchCategories: {
    value: CssArchRow['category'];
    label: string;
    color: string;
  }[] = [
    { value: 'cascade', label: 'Cascade & Specificity', color: '#6366f1' },
    { value: 'tokens', label: 'Design Tokens', color: '#0ea5e9' },
    { value: 'theming', label: 'Theming & Variants', color: '#10b981' },
    { value: 'a11y', label: 'Accessibility', color: '#f59e0b' },
    { value: 'dx', label: 'Developer Experience', color: '#8b5cf6' },
  ];

  public getCssArchCategoryLabel(category: CssArchRow['category']): string {
    return (
      this.cssArchCategories.find(
        (item: { value: CssArchRow['category']; label: string; color: string }): boolean =>
          item.value === category,
      )?.label ?? category
    );
  }

  public getCssArchCategoryColor(category: CssArchRow['category']): string {
    return (
      this.cssArchCategories.find(
        (item: { value: CssArchRow['category']; label: string; color: string }): boolean =>
          item.value === category,
      )?.color ?? '#94a3b8'
    );
  }

  // ── Differentiators ───────────────────────────────────────────────────────
  public readonly differentiators: Differentiator[] = [
    {
      feature: 'Signal-native API throughout — no @Input()/@Output() decorators anywhere',
      notes: 'No other Angular library has fully migrated to the Angular 17+ signal API.',
      isUnique: true,
    },
    {
      feature: 'Zoneless-compatible — every component tested with provideZonelessChangeDetection()',
      notes: 'Material is partial, PrimeNG and Ng-Zorro both fail this.',
      isUnique: true,
    },
    {
      feature:
        'Three runtime visual variants — material / bootstrap / minimal switchable at runtime',
      notes:
        'No other Angular library supports runtime variant switching. All others are locked to one design system.',
      isUnique: true,
    },
    {
      feature: 'ViewEncapsulation.None — consumer CSS works without ::ng-deep',
      notes:
        'Emulated encapsulation is the default everywhere else, forcing consumers through the deprecated ::ng-deep hack.',
      isUnique: true,
    },
    {
      feature: 'Dedicated .a11y.spec.ts per component — axe-core coverage at component level',
      notes: 'No other Angular library ships dedicated accessibility spec files per component.',
      isUnique: true,
    },
    {
      feature: 'prefers-reduced-motion applied to every animation systematically',
      notes: 'Most libraries apply this ad hoc or not at all. Applied systematically from day one.',
      isUnique: true,
    },
    {
      feature: 'BottomSheet as a first-class component — distinct from Drawer',
      notes:
        'Most Angular libraries do not distinguish bottom sheet from drawer. Unique in the Angular ecosystem.',
      isUnique: false,
    },
    {
      feature: 'ImageCompare — side-by-side image comparison slider',
      notes: 'Unique in the Angular ecosystem. No other Angular library ships this.',
      isUnique: true,
    },
    {
      feature: 'Angular block syntax @if / @for / @switch — 100% from day one',
      notes:
        'Other libraries still migrating from *ngIf / *ngFor. This library never used the structural directive API.',
      isUnique: false,
    },
  ];

  // ── Launch sequence ───────────────────────────────────────────────────────
  public readonly launchSteps: LaunchStep[] = [
    {
      id: 1,
      title: 'Build in Public',
      status: 'active',
      description:
        'GitHub commit history is already content. Make it visible. Post about technical problems — not about the library.',
      gate: 'Ongoing — do this now',
      actions: [
        'Write commit messages that tell a story',
        'Post in Angular communities about specific technical problems solved (e.g. "implementing combobox ARIA correctly")',
        "Be present in Angular Discord — participate, don't advertise",
        'By launch, developers will look at your history and see someone who did this properly for months',
      ],
    },
    {
      id: 2,
      title: 'Establish Thought Leadership',
      status: 'active',
      description:
        'Write articles about Angular UI problems — not the library. Education before announcement. Trust before launch.',
      gate: 'Start now — Phase 1 axe-core audit required before the benchmark article',
      actions: [
        '📰 ARTICLE 1 (biggest pre-launch asset): "I ran axe-core on the 4 biggest Angular component libraries. Here\'s what I found." — a news event, not a blog post',
        '📰 ARTICLE 2: "Why combobox is the hardest ARIA pattern to get right — and why every Angular library gets it wrong"',
        '📰 ARTICLE 3: "What signals-first actually means for component API design"',
        '📰 ARTICLE 4: "What the Angular UI ecosystem is still missing in 2026" — frame the gap; your library is the natural conclusion',
      ],
    },
    {
      id: 3,
      title: 'Seed Early Access',
      status: 'queued',
      description:
        'Before any public announcement, get 10–15 real Angular developers using it privately. Not friends — community people you respect.',
      gate: 'After Phase 3 complete ✅ GATE IS NOW OPEN',
      actions: [
        'Identify 10–15 real Angular developers from the community (not friends)',
        'Give early access with zero fanfare — ask for brutal, honest feedback',
        'Collect authentic testimonials from those genuinely impressed',
        'Launch with people already saying: "I\'ve been using this for two months and it\'s different."',
        'That social proof is worth more than any announcement you can make',
      ],
    },
    {
      id: 4,
      title: 'Go Where Angular Developers Live',
      status: 'queued',
      description:
        'Not Product Hunt. Not Hacker News. The Angular community is tight and interconnected.',
      gate: 'During seeding and approaching launch',
      actions: [
        '🎯 Angular Discord — be present during hardening, not just at launch',
        '🐦 Twitter / X — the axe-core article goes here first',
        '📧 Angular Weekly newsletter — submit for inclusion on launch week',
        '🎤 ng-conf — a demo or talk here is legitimately transformative',
        '✍️ Dev.to / Medium — publish educational articles for reach',
        '🤝 Connect with: Manfred Steyer · Enea Jahollari · Brandon Roberts · Deborah Kurata · Santosh Yadav',
      ],
    },
    {
      id: 5,
      title: 'The Launch Event',
      status: 'queued',
      description:
        'One launch. One moment. Not a features list. A developer building something real.',
      gate: '10+ seed developers with positive signal + docs site ready + benchmark article written',
      actions: [
        '🎬 Record a 4–5 min demo video — developer building something real with keyboard nav that just works',
        '📊 Benchmark article drops the same day — "The most accessible Angular component library — here\'s the evidence."',
        '🌐 The docs site IS the landing page — interactive playgrounds, copy-paste, a11y notes per component',
        '⚡ One killer moment — a single interaction impressive enough to screenshot and share',
        '🚫 Do NOT post "I made a thing" — lead with the problem and the reproducible evidence',
      ],
    },
    {
      id: 6,
      title: 'Post-Launch Responsiveness IS the Marketing',
      status: 'queued',
      description:
        'The Angular community is small enough that how you respond to the first 20 GitHub issues defines your reputation for years.',
      gate: 'After launch',
      actions: [
        'Close issues fast · write thoughtful, detailed responses',
        'Say thank you publicly · be honest when something is broken',
        'Ship fixes visibly — changelog done right',
        'The developers who feel heard become your most effective advocates forever',
        'There is no marketing budget that buys what authentic responsiveness builds',
      ],
    },
  ];

  public readonly launchReadiness: {
    label: string;
    gate: string;
    status: 'done' | 'active' | 'queued';
  }[] = [
    {
      label: 'Phase 3 complete — all 100 components ≥ 8 (hardening estimates)',
      gate: 'Required before seeding early access',
      status: 'done',
    },
    {
      label:
        'SCORING_CRITERIA.md full checkpoint audit — all 100 components re-scored against 182 verifiable checkpoints',
      gate: 'Required before scores are externally credible — needed before benchmark article and v1.0',
      status: 'queued',
    },
    {
      label: 'Internal axe-core audit clean',
      gate: 'Required before writing the benchmark article',
      status: 'active',
    },
    {
      label: 'Benchmark article written and ready',
      gate: 'Required before launch day',
      status: 'queued',
    },
    {
      label: 'Docs site genuinely impressive',
      gate: 'Required before any public announcement',
      status: 'queued',
    },
    {
      label: 'Demo video recorded (4–5 min)',
      gate: 'Required before launch day',
      status: 'queued',
    },
    {
      label: '10+ seed developers with positive signal',
      gate: 'Required before launch day',
      status: 'queued',
    },
    {
      label: 'Open benchmark repo published (scripts + methodology + results)',
      gate: 'Required before launch day',
      status: 'queued',
    },
  ];

  // ── Next Steps ────────────────────────────────────────────────────────────
  public readonly nextSteps: NextStep[] = [
    {
      title: 'SCORING_CRITERIA.md Full Checkpoint Audit',
      description:
        'Current scores were assigned during 6-phase hardening sessions (qualitative estimates). ' +
        'SCORING_CRITERIA.md defines a rigorous checkpoint-counted standard: score = verified checkboxes / total × 10. ' +
        'Every component needs a proper re-audit against all 11 categories (182 total checkpoints) before any score can be considered externally credible. ' +
        'This is the single most important quality task before v1.0 — the axe-core benchmark article depends on it. ' +
        'Prompt: docs/prompts/SCORING_CRITERIA_AUDIT_PROMPT.md · Priority order: docs/prompts/HARDENING_PROMPT_INDEX.md (Tier 2 section).',
      priority: 'critical',
      category: 'Quality',
    },
    {
      title: 'Runtime Variant Switcher',
      description:
        'Seamless runtime switching between material / bootstrap / minimal variants without reload or flash. Core to Wow Factor #2.',
      priority: 'critical',
      category: 'Theming',
    },
    {
      title: 'Theme Preset Management',
      description:
        'Multiple built-in presets (indigo, ocean, sunset, midnight) switchable at runtime via ThemeConfigService.',
      priority: 'critical',
      category: 'Theming',
    },
    {
      title: 'Full Internal Axe-Core Audit',
      description:
        'Run a comprehensive axe-core pass across all 100 components. This unlocks writing the benchmark article — the highest-impact pre-launch asset.',
      priority: 'critical',
      category: 'Accessibility',
    },
    {
      title: 'Benchmark Article — axe-core Audit Results',
      description:
        '"I ran axe-core on the 4 biggest Angular component libraries." Plan everything around this article. It\'s a news event in the Angular community.',
      priority: 'high',
      category: 'Content',
    },
    {
      title: 'Seed 10–15 Early Adopters',
      description:
        'Gate is open — all 100 components ≥ 8. Identify real community developers, give early access, collect authentic testimonials. Launch with believers, not just an announcement.',
      priority: 'high',
      category: 'Launch',
    },
    {
      title: 'Build Queue: Empty State + Typography + Statistic (priorities 3–5)',
      description:
        'Three Low-complexity components that signal a complete design-system. No other Angular library ships all three. Add before Public Beta.',
      priority: 'high',
      category: 'Components',
    },
    {
      title: 'Complete Reference Documentation (85+ components)',
      description:
        'All 100 components have README.md, but formal reference docs and implementation docs are written for only 8. The docs site cannot launch without this.',
      priority: 'high',
      category: 'Documentation',
    },
    {
      title: 'Storybook Deployment',
      description:
        'Deploy Storybook with stories covering all variants for every component. The visual testing and public demo layer.',
      priority: 'high',
      category: 'Ecosystem',
    },
    {
      title: 'npm Publication Pipeline',
      description:
        'Prepare package.json metadata, provenance, CI/CD pipeline, and semantic versioning for first npm publish (0.9.0). Docs site must be ready first.',
      priority: 'medium',
      category: 'Publishing',
    },
    {
      title: 'Open Benchmark Repo',
      description:
        'Publish scripts + methodology + raw axe-core + Angular modernity results on GitHub. Invite scrutiny. The highest-credibility move available.',
      priority: 'medium',
      category: 'Competitive',
    },
    {
      title: 'Push 8.2–8.3 Components to ≥ 9 Avg',
      description:
        'Select, AutoComplete, CascadeSelect, Knob, ColorPicker, Avatar, DynamicDialog, ConfirmDialog, DataView, Timeline, MeterGroup — targeted polish pass before v1.0.',
      priority: 'medium',
      category: 'Quality',
    },
    {
      title: 'Interactive Documentation Site (Docs IS the Landing Page)',
      description:
        'Live playgrounds, copy-paste examples, a11y notes per component. The first impression is permanent — do not announce before this is impressive.',
      priority: 'medium',
      category: 'Ecosystem',
    },
  ];

  // ── Wow Factors ───────────────────────────────────────────────────────────
  public readonly wowFactors: WowFactor[] = [
    {
      number: 1,
      title: 'Elite Accessibility',
      status: 'achieved',
      tagline:
        'No other Angular library comes close to this level of ARIA correctness and keyboard coverage.',
      items: [
        '✅ 100 components scored ≥ 8 on accessibility',
        '✅ Full keyboard navigation on every interactive component',
        '✅ Correct ARIA roles, properties, and live regions — WAI-ARIA APG patterns',
        '✅ prefers-reduced-motion respected systematically',
        '✅ High-contrast / forced-colors support',
        '✅ Dedicated .a11y.spec.ts files per component — unique in Angular ecosystem',
        '✅ 2,500+ unit + a11y tests written',
        '🔄 Full internal axe-core audit in progress',
      ],
    },
    {
      number: 2,
      title: 'Astonishingly Good Theming',
      status: 'in-progress',
      tagline:
        'Runtime theme switching, full design token system, brand customization in < 30 minutes.',
      items: [
        '✅ CSS variable system (--uilib-*) across all 100 components',
        '✅ Three variants: material / bootstrap / minimal',
        '✅ ThemeConfigService with scoped theming (ThemeScopeDirective)',
        '✅ Dark mode support',
        '🔄 Runtime variant switcher (no flash) — critical next step',
        '🔄 Theme preset management (indigo, ocean, sunset…)',
        '⬜ Visual theme builder — horizon',
        '⬜ Brand customization documented path (< 30 min)',
      ],
    },
    {
      number: 3,
      title: 'Unmatched Forms Experience',
      status: 'queued',
      tagline: 'Best typed, reactive, signal-native forms DX in Angular — ever.',
      items: [
        '✅ FormField + FloatLabel + InputGroup composition',
        '✅ Signal-native form control binding',
        '⬜ Signal-native validation and reactive error state',
        '⬜ DateRangePicker + TimePicker completing the form suite',
        '⬜ Complex patterns (wizard, dynamic fields) first-class',
      ],
    },
    {
      number: 4,
      title: 'Exceptional Developer Experience',
      status: 'queued',
      tagline: 'APIs so predictable developers never reach for docs for basic usage.',
      items: [
        '✅ Consistent naming across all 100 components',
        '✅ String-union public types — excellent autocomplete',
        '⬜ Interactive docs with copy-paste examples',
        '⬜ "Common tasks in ≤ 3 lines" verified across all components',
        '⬜ Migration guide for major version upgrades',
      ],
    },
    {
      number: 5,
      title: 'Unbelievably Polished Animations',
      status: 'queued',
      tagline: 'Motion that makes developers say "how did they do that".',
      items: [
        '✅ All animations respect prefers-reduced-motion',
        '⬜ Physics-based spring animations',
        '⬜ Consistent timing and easing design system',
        '⬜ Choreographed enter/exit sequences',
        '⬜ All animation timing controllable via CSS vars',
      ],
    },
    {
      number: 6,
      title: 'The Best Angular Table / Grid',
      status: 'queued',
      tagline: 'Performance + composability that makes every other grid feel old.',
      items: [
        '✅ Table: role=grid, aria-sort, aria-selected, pagination (score 8.6)',
        '⬜ Virtual scrolling with millions of rows',
        '⬜ Column reorder, resize, pin — all accessible',
        '⬜ Signal-based state management throughout',
        '⬜ Composable cell renderers with content projection',
      ],
    },
  ];

  // ── Pro & Enterprise Strategy ─────────────────────────────────────────────
  public readonly proCategories: {
    rank: number;
    name: string;
    icon: string;
    description: string;
    priority: 'top' | 'high' | 'medium';
  }[] = [
    {
      rank: 1,
      name: 'Advanced Data Grid',
      icon: 'pi-table',
      description:
        'Virtual scroll, column pinning, Excel-like editing, tree tables, server-side ops, and realtime streaming.',
      priority: 'top',
    },
    {
      rank: 2,
      name: 'Workflow & Visual Builder',
      icon: 'pi-sitemap',
      description:
        'Drag-drop pipeline designer, nested query builder (→ SQL / Mongo / Elastic), BPMN editor, form/survey builder.',
      priority: 'top',
    },
    {
      rank: 3,
      name: 'Dynamic Form Engine',
      icon: 'pi-file-edit',
      description:
        'JSON-schema-driven forms, conditional wizards, complex validation, and large reactive-form performance tooling.',
      priority: 'top',
    },
    {
      rank: 4,
      name: 'Gantt & Scheduler',
      icon: 'pi-calendar',
      description:
        'Resource scheduling, drag scheduling, dependency management, timeline planner, and calendar integration.',
      priority: 'high',
    },
    {
      rank: 5,
      name: 'AI-Integrated UI Kit',
      icon: 'pi-comments',
      description:
        'Streaming chat widget, prompt playground, AI diff/review panels, token-usage viewer, AI workflow builder.',
      priority: 'high',
    },
    {
      rank: 6,
      name: 'Analytics & Charts',
      icon: 'pi-chart-bar',
      description:
        'TradingView-like charts, org charts, network graphs, heatmaps, and realtime monitoring dashboard widgets.',
      priority: 'high',
    },
    {
      rank: 7,
      name: 'Rich Text & Document',
      icon: 'pi-pen-to-square',
      description:
        'Notion-like editor, collaborative editing, PDF annotation viewer, diff viewer, and document approval flow.',
      priority: 'medium',
    },
    {
      rank: 8,
      name: 'Developer Experience Tools',
      icon: 'pi-wrench',
      description:
        'Log viewers, feature-flag dashboards, permission/role editors, API explorer, audit trail viewers.',
      priority: 'medium',
    },
  ];

  public readonly valueDrivers: string[] = [
    'Reliability — components that work correctly in every edge case',
    'Performance — no unnecessary renders, virtual scroll, tree-shakable',
    'Accessibility compliance — WCAG 2.1 AA is a procurement requirement in many enterprises',
    'TypeScript quality — strict types, excellent autocomplete, no any',
    'Angular integration depth — signals, zoneless, SSR-safe, OnPush',
    'Documentation — API docs, examples, a11y notes per component',
    'Support & maintenance — response time, changelog, upgrade path',
    'Saved engineering time — the more "business-critical" the component, the more monetisable',
  ];

  // ── Helpers ───────────────────────────────────────────────────────────────
  public getScoreClass(score: number): string {
    if (score >= 9.5) return 'score-gold';
    if (score >= 9.0) return 'score-excellent';
    if (score >= 8.5) return 'score-good';
    return 'score-ok';
  }

  public getCellClass(score: number): string {
    if (score === 10) return 'cell-perfect';
    if (score === 9) return 'cell-good';
    return 'cell-ok';
  }

  public getModernityClass(value: 'yes' | 'no' | 'partial'): string {
    if (value === 'yes') return 'modernity-yes';
    if (value === 'partial') return 'modernity-partial';
    return 'modernity-no';
  }

  public getModernityLabel(value: 'yes' | 'no' | 'partial'): string {
    if (value === 'yes') return '✅';
    if (value === 'partial') return '⚠️';
    return '❌';
  }

  public getComplexityClass(complexity: BuildQueueItem['complexity']): string {
    if (complexity === 'Very Low' || complexity === 'Low') return 'complexity-low';
    if (complexity === 'Low-Medium' || complexity === 'Medium') return 'complexity-medium';
    return 'complexity-high';
  }

  public onSearchChange(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  public setCategory(category: string): void {
    this.activeCategory.set(category);
  }

  public trackByName(_index: number, item: ComponentScore): string {
    return item.name;
  }
  public trackByPhaseId(_index: number, phase: PhaseInfo): number {
    return phase.id;
  }
  public trackByTitle(_index: number, step: NextStep): string {
    return step.title;
  }
  public trackByWowNumber(_index: number, wow: WowFactor): number {
    return wow.number;
  }
  public trackByCategory(_index: number, item: { name: string; count: number }): string {
    return item.name;
  }
  public trackByString(_index: number, item: string): string {
    return item;
  }
  public trackByCategoryName(_index: number, item: string): string {
    return item;
  }
  public trackByPriority(_index: number, item: BuildQueueItem): number {
    return item.priority;
  }
  public trackByComponent(_index: number, item: DocStatusItem): string {
    return item.component;
  }
  public trackByCheck(_index: number, item: ModernityRow): string {
    return item.check;
  }
  public trackByFeature(_index: number, item: Differentiator): string {
    return item.feature;
  }
  public trackByLaunchId(_index: number, item: LaunchStep): number {
    return item.id;
  }
  public trackByReadinessLabel(_index: number, item: { label: string }): string {
    return item.label;
  }
  public trackByDimension(_index: number, item: ScoringDimension): string {
    return item.column;
  }
  public trackByProCategory(_index: number, item: { rank: number }): number {
    return item.rank;
  }
}
