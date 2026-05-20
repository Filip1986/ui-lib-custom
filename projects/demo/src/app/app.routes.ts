import type { Routes } from '@angular/router';
import type { Type } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ButtonsComponent } from './pages/buttons/buttons.component';
import { CardsComponent } from './pages/cards/cards.component';
import { BadgesComponent } from './pages/badges/badges.component';
import { ThemesComponent } from './pages/themes/themes.component';
import { InputsComponent } from './pages/inputs/inputs.component';
import { SelectComponent } from './pages/select/select.component';
import { ProjectStarterComponent } from './pages/project-starter/project-starter.component';
import { ShadowsComponent } from './pages/shadows/shadows.component';
import { CheckboxesComponent } from './pages/checkboxes/checkboxes.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import { SemanticSpacingSectionComponent } from './pages/layouts/semantic-spacing-section.component';
import { StackSectionComponent } from './pages/layouts/stack-section.component';
import { InlineSectionComponent } from './pages/layouts/inline-section.component';
import { GridSectionComponent } from './pages/layouts/grid-section.component';
import { ContainerSectionComponent } from './pages/layouts/container-section.component';
import { LayoutCompositionSectionComponent } from './pages/layouts/composition-section.component';
import { DesignTokensSectionComponent } from './pages/layouts/design-tokens-section.component';
import { ThemedLayoutsSectionComponent } from './pages/layouts/themed-layouts-section.component';
import { LayoutExamplesSectionComponent } from './pages/layouts/examples-section.component';
import { SelectButtonsComponent } from './pages/select-buttons/select-buttons.component';
import { DarkModeComponent } from './pages/dark-mode/dark-mode.component';
import { ScopedThemingComponent } from './pages/scoped-theming/scoped-theming.component';
import { AccessibilityComponent } from './pages/accessibility/accessibility.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home - UI Components Library' },
  { path: 'buttons', component: ButtonsComponent, title: 'Buttons - UI Components Library' },
  { path: 'cards', component: CardsComponent, title: 'Cards - UI Components Library' },
  {
    path: 'chart',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/chart/chart-demo.component').then(
        (m: { ChartDemoComponent: Type<unknown> }): Type<unknown> => m.ChartDemoComponent
      ),
    title: 'Chart - UI Components Library',
  },
  { path: 'badges', component: BadgesComponent, title: 'Badges - UI Components Library' },
  { path: 'layouts', redirectTo: 'layouts/semantic-spacing', pathMatch: 'full' },
  {
    path: 'layouts/semantic-spacing',
    component: SemanticSpacingSectionComponent,
    title: 'Semantic Spacing - UI Components Library',
  },
  {
    path: 'layouts/stack',
    component: StackSectionComponent,
    title: 'Stack - UI Components Library',
  },
  {
    path: 'layouts/inline',
    component: InlineSectionComponent,
    title: 'Inline - UI Components Library',
  },
  {
    path: 'layouts/grid',
    component: GridSectionComponent,
    title: 'Grid - UI Components Library',
  },
  {
    path: 'layouts/container',
    component: ContainerSectionComponent,
    title: 'Container - UI Components Library',
  },
  {
    path: 'layouts/composition',
    component: LayoutCompositionSectionComponent,
    title: 'Composition - UI Components Library',
  },
  {
    path: 'layouts/design-tokens',
    component: DesignTokensSectionComponent,
    title: 'Design Tokens - UI Components Library',
  },
  {
    path: 'layouts/themed-layouts',
    component: ThemedLayoutsSectionComponent,
    title: 'Themed Layouts - UI Components Library',
  },
  {
    path: 'layouts/examples',
    component: LayoutExamplesSectionComponent,
    title: 'Examples - UI Components Library',
  },
  { path: 'themes', component: ThemesComponent, title: 'Themes - UI Components Library' },
  { path: 'input-text', component: InputsComponent, title: 'Input Text - UI Components Library' },
  { path: 'inputs', redirectTo: 'input-text', pathMatch: 'full' },
  { path: 'select', component: SelectComponent, title: 'Select - UI Components Library' },
  { path: 'checkbox', component: CheckboxesComponent, title: 'Checkbox - UI Components Library' },
  {
    path: 'project-starter',
    component: ProjectStarterComponent,
    title: 'Project Starter - UI Components Library',
  },
  { path: 'templates/starter-template', redirectTo: 'templates/app-shell', pathMatch: 'full' },
  {
    path: 'templates/app-shell',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/templates/app-shell/app-shell-template.component').then(
        (m: { AppShellTemplateComponent: Type<unknown> }): Type<unknown> =>
          m.AppShellTemplateComponent
      ),
    title: 'App Shell Template - UI Components Library',
  },
  {
    path: 'templates/auth-pages',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/templates/auth-pages/auth-pages-template.component').then(
        (m: { AuthPagesTemplateComponent: Type<unknown> }): Type<unknown> =>
          m.AuthPagesTemplateComponent
      ),
    title: 'Auth Pages Template - UI Components Library',
  },
  {
    path: 'templates/settings-page',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/templates/settings-page/settings-page-template.component').then(
        (m: { SettingsPageTemplateComponent: Type<unknown> }): Type<unknown> =>
          m.SettingsPageTemplateComponent
      ),
    title: 'Settings Page Template - UI Components Library',
  },
  {
    path: 'templates/error-pages',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/templates/error-pages/error-pages-template.component').then(
        (m: { ErrorPagesTemplateComponent: Type<unknown> }): Type<unknown> =>
          m.ErrorPagesTemplateComponent
      ),
    title: 'Error Pages Template - UI Components Library',
  },
  {
    path: 'templates/team-profile',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/templates/team-profile/team-profile-template.component').then(
        (m: { TeamProfileTemplateComponent: Type<unknown> }): Type<unknown> =>
          m.TeamProfileTemplateComponent
      ),
    title: 'Team & Profile Template - UI Components Library',
  },
  // ── Pro Templates (coming soon) ───────────────────────────────────────────
  {
    path: 'templates/pro-admin-dashboard',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pro-coming-soon/pro-coming-soon-page.component').then(
        (m: { ProComingSoonPageComponent: Type<unknown> }): Type<unknown> =>
          m.ProComingSoonPageComponent
      ),
    title: 'Admin Dashboard Template — Pro - UI Components Library',
    data: {
      componentName: 'Admin Dashboard Template',
      tagline: 'A complete analytics & admin portal template for Angular teams.',
      description:
        'A multi-page admin dashboard template featuring a sidebar navigation shell, KPI stat cards, interactive charts (bar, line, pie), a data table with filtering, and a notification centre. Requires Analytics Pro and Advanced Data Grid.',
      icon: 'pi-chart-pie',
      tier: 'pro',
      features: [
        'Full multi-page admin shell (sidebar + topbar + breadcrumbs)',
        'KPI stat cards with trend indicators',
        'Interactive chart panel (bar, line, pie via Analytics Pro)',
        'Data table with server-side filter & sort (via Data Grid)',
        'Notification centre with real-time updates',
        'Dark mode and brand theming out of the box',
        'Role-based navigation (admin vs viewer)',
        'Responsive down to tablet breakpoints',
      ],
      useCases: [
        'SaaS admin portals',
        'Business intelligence dashboards',
        'Internal operations tools',
        'Customer success platforms',
        'E-commerce back-office',
      ],
      githubUrl: 'https://github.com/Filip1986/ui-lib-custom',
    },
  },
  {
    path: 'templates/pro-saas-shell',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pro-coming-soon/pro-coming-soon-page.component').then(
        (m: { ProComingSoonPageComponent: Type<unknown> }): Type<unknown> =>
          m.ProComingSoonPageComponent
      ),
    title: 'SaaS App Shell Template — Pro - UI Components Library',
    data: {
      componentName: 'SaaS App Shell Template',
      tagline: 'The full application scaffolding every SaaS product needs.',
      description:
        'A production-ready SaaS shell with multi-tenant navigation, role-based menu visibility, onboarding wizard, plan upgrade gate, and a complete settings section. Wire in your auth service and launch.',
      icon: 'pi-desktop',
      tier: 'pro',
      features: [
        'Multi-tenant workspace switcher',
        'Role-based menu visibility (admin/member/viewer)',
        'Onboarding wizard with progress tracking',
        'Plan upgrade gate with feature preview',
        'Full settings section (profile, team, billing, API keys)',
        'Global command palette (⌘K)',
        'Announcement banner system',
        'Mobile-responsive with drawer navigation',
      ],
      useCases: [
        'B2B SaaS products',
        'Developer tools & platforms',
        'Project management tools',
        'Analytics and reporting SaaS',
        'Team collaboration apps',
      ],
      githubUrl: 'https://github.com/Filip1986/ui-lib-custom',
    },
  },
  {
    path: 'templates/pro-crm',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pro-coming-soon/pro-coming-soon-page.component').then(
        (m: { ProComingSoonPageComponent: Type<unknown> }): Type<unknown> =>
          m.ProComingSoonPageComponent
      ),
    title: 'CRM Interface Template — Pro - UI Components Library',
    data: {
      componentName: 'CRM Interface Template',
      tagline: 'Contacts, pipeline, and activity — a full CRM shell for Angular.',
      description:
        'A multi-page CRM template with a contacts directory (searchable table), deal pipeline (kanban-style stages), company profiles, and an activity timeline. Powered by Advanced Data Grid and Workflow Builder.',
      icon: 'pi-user-plus',
      tier: 'pro',
      features: [
        'Contacts directory with advanced search & filters',
        'Deal pipeline with drag-and-drop kanban stages',
        'Company and contact detail pages',
        'Activity timeline (calls, emails, meetings)',
        'Task and follow-up management',
        'Email template composer',
        'CSV import / export',
        'Customisable pipeline stages',
      ],
      useCases: [
        'Sales CRM tools',
        'Customer success platforms',
        'Real estate management',
        'Recruitment and HR tools',
        'Partner relationship management',
      ],
      githubUrl: 'https://github.com/Filip1986/ui-lib-custom',
    },
  },
  {
    path: 'templates/pro-ecommerce',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pro-coming-soon/pro-coming-soon-page.component').then(
        (m: { ProComingSoonPageComponent: Type<unknown> }): Type<unknown> =>
          m.ProComingSoonPageComponent
      ),
    title: 'E-commerce Admin Template — Pro - UI Components Library',
    data: {
      componentName: 'E-commerce Admin Template',
      tagline: 'Product catalog, orders, and inventory — your store back-office.',
      description:
        'A full e-commerce administration template: product catalog with bulk editing, order management with fulfilment workflow, inventory tracking, and revenue analytics. Built on Advanced Data Grid and Analytics Pro.',
      icon: 'pi-shopping-cart',
      tier: 'enterprise',
      features: [
        'Product catalog with image upload and variant management',
        'Bulk editing via data grid (price, stock, status)',
        'Order management with fulfilment status workflow',
        'Inventory tracking with low-stock alerts',
        'Revenue and sales analytics dashboard',
        'Customer list with order history',
        'Discount and coupon management',
        'Shipping zone and carrier configuration',
      ],
      useCases: [
        'E-commerce platforms',
        'Retail and wholesale management',
        'Marketplace admin portals',
        'Subscription box services',
        'B2B procurement portals',
      ],
      githubUrl: 'https://github.com/Filip1986/ui-lib-custom',
    },
  },
  {
    path: 'templates/pro-project-board',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pro-coming-soon/pro-coming-soon-page.component').then(
        (m: { ProComingSoonPageComponent: Type<unknown> }): Type<unknown> =>
          m.ProComingSoonPageComponent
      ),
    title: 'Project Board Template — Pro - UI Components Library',
    data: {
      componentName: 'Project Board Template',
      tagline: 'Kanban, backlog, sprints, and Gantt — all in one project template.',
      description:
        'A complete project management interface: kanban board with drag-and-drop cards, backlog with priority sorting, sprint planning, and a Gantt view for milestone timelines. Built on Workflow Builder and Gantt & Scheduler.',
      icon: 'pi-list',
      tier: 'pro',
      features: [
        'Kanban board with drag-and-drop card management',
        'Backlog list with priority, label, and assignee filters',
        'Sprint planning with velocity tracking',
        'Gantt timeline for milestone and release planning',
        'Task detail drawer (description, comments, attachments)',
        'Team workload view',
        'Time tracking per task',
        'GitHub / GitLab integration hooks',
      ],
      useCases: [
        'Software development teams',
        'Product management',
        'Agency project tracking',
        'Design sprint management',
        'Marketing campaign planning',
      ],
      githubUrl: 'https://github.com/Filip1986/ui-lib-custom',
    },
  },
  {
    path: 'templates/pro-landing-page',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pro-coming-soon/pro-coming-soon-page.component').then(
        (m: { ProComingSoonPageComponent: Type<unknown> }): Type<unknown> =>
          m.ProComingSoonPageComponent
      ),
    title: 'Landing Page Kit Template — Pro - UI Components Library',
    data: {
      componentName: 'Landing Page Kit',
      tagline: 'Hero, features, pricing, FAQ — every marketing section, ready to use.',
      description:
        'A composable landing page kit with 12+ pre-built sections: animated hero, feature grid, social proof, pricing table, FAQ accordion, and CTA banner. Mix and match sections to assemble any product marketing page.',
      icon: 'pi-globe',
      tier: 'pro',
      features: [
        'Animated hero section (particle or gradient variants)',
        'Feature grid (icon cards, screenshot highlights)',
        'Social proof (logos, testimonials, star ratings)',
        'Pricing table with annual/monthly toggle',
        'FAQ accordion section',
        'CTA banner (newsletter, trial sign-up)',
        'Footer with sitemap and social links',
        'Cookie consent banner',
      ],
      useCases: [
        'SaaS product landing pages',
        'Developer tool marketing sites',
        'Agency and portfolio pages',
        'Product launch pages',
        'Conference and event sites',
      ],
      githubUrl: 'https://github.com/Filip1986/ui-lib-custom',
    },
  },
  {
    path: 'templates/pro-ai-shell',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pro-coming-soon/pro-coming-soon-page.component').then(
        (m: { ProComingSoonPageComponent: Type<unknown> }): Type<unknown> =>
          m.ProComingSoonPageComponent
      ),
    title: 'AI App Shell Template — Pro - UI Components Library',
    data: {
      componentName: 'AI App Shell Template',
      tagline: 'The complete shell for your AI-powered Angular application.',
      description:
        "A full application shell purpose-built for AI products: streaming chat interface, prompt history sidebar, model selector, token usage dashboard, and agent status tracker. Requires AI UI Kit. The Angular ecosystem's first AI app shell.",
      icon: 'pi-comments',
      tier: 'pro',
      features: [
        'Streaming chat interface (SSE / WebSocket)',
        'Conversation history sidebar with search',
        'Model selector and parameter controls',
        'Token usage and cost dashboard',
        'Agent workflow status panel',
        'Prompt template library',
        'File attachment and context management',
        'Export conversation to PDF / Markdown',
      ],
      useCases: [
        'AI assistant and chatbot products',
        'Internal copilot tools',
        'LLM-powered SaaS applications',
        'Code review and dev tooling',
        'Document analysis platforms',
      ],
      githubUrl: 'https://github.com/Filip1986/ui-lib-custom',
    },
  },
  { path: 'shadows', component: ShadowsComponent, title: 'Shadows - UI Components Library' },
  { path: 'tabs', component: TabsComponent, title: 'Tabs - UI Components Library' },
  {
    path: 'icons',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/icons/icons-demo.component').then(
        (m: { IconsDemoComponent: Type<unknown> }): Type<unknown> => m.IconsDemoComponent
      ),
    title: 'Icons - UI Components Library',
  },
  {
    path: 'accordion',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/accordion/accordion.component').then(
        (m: { AccordionComponent: Type<unknown> }): Type<unknown> => m.AccordionComponent
      ),
    title: 'Accordion - UI Components Library',
  },
  {
    path: 'select-buttons',
    component: SelectButtonsComponent,
    title: 'Select Buttons - UI Components Library',
  },
  { path: 'dark-mode', component: DarkModeComponent, title: 'Dark Mode - UI Library' },
  {
    path: 'scoped-theming',
    component: ScopedThemingComponent,
    title: 'Scoped Theming - UI Library',
  },
  { path: 'accessibility', component: AccessibilityComponent, title: 'Accessibility - UI Library' },
  {
    path: 'gallery',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/gallery/gallery.component').then(
        (m: { GalleryComponent: Type<unknown> }): Type<unknown> => m.GalleryComponent
      ),
    title: 'Galleria - UI Components Library',
  },
  {
    path: 'dialog',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/dialog/dialog.component').then(
        (m: { DialogDemoComponent: Type<unknown> }): Type<unknown> => m.DialogDemoComponent
      ),
    title: 'Dialog - UI Components Library',
  },
  {
    path: 'autocomplete',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/autocomplete/autocomplete-demo.component').then(
        (m: { AutoCompleteDemoComponent: Type<unknown> }): Type<unknown> =>
          m.AutoCompleteDemoComponent
      ),
    title: 'AutoComplete - UI Components Library',
  },
  {
    path: 'animated-on-scroll',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/animated-on-scroll/animated-on-scroll-demo.component').then(
        (m: { AnimatedOnScrollDemoComponent: Type<unknown> }): Type<unknown> =>
          m.AnimatedOnScrollDemoComponent
      ),
    title: 'AnimatedOnScroll - UI Components Library',
  },
  {
    path: 'auto-focus',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/auto-focus/auto-focus-demo.component').then(
        (m: { AutoFocusDemoComponent: Type<unknown> }): Type<unknown> => m.AutoFocusDemoComponent
      ),
    title: 'AutoFocus - UI Components Library',
  },
  {
    path: 'avatar',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/avatar/avatar-demo.component').then(
        (m: { AvatarDemoComponent: Type<unknown> }): Type<unknown> => m.AvatarDemoComponent
      ),
    title: 'Avatar - UI Components Library',
  },
  {
    path: 'bind',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/bind/bind-demo.component').then(
        (m: { BindDemoComponent: Type<unknown> }): Type<unknown> => m.BindDemoComponent
      ),
    title: 'Bind - UI Components Library',
  },
  {
    path: 'block-ui',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/block-ui/block-ui-demo.component').then(
        (m: { BlockUiDemoComponent: Type<unknown> }): Type<unknown> => m.BlockUiDemoComponent
      ),
    title: 'BlockUI - UI Components Library',
  },
  {
    path: 'bottom-sheet',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/bottom-sheet/bottom-sheet-demo.component').then(
        (m: { BottomSheetDemoComponent: Type<unknown> }): Type<unknown> =>
          m.BottomSheetDemoComponent
      ),
    title: 'Bottom Sheet - UI Components Library',
  },
  {
    path: 'cascade-select',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/cascade-select/cascade-select-demo.component').then(
        (m: { CascadeSelectDemoComponent: Type<unknown> }): Type<unknown> =>
          m.CascadeSelectDemoComponent
      ),
    title: 'CascadeSelect - UI Components Library',
  },
  {
    path: 'carousel',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/carousel/carousel-demo.component').then(
        (m: { CarouselDemoComponent: Type<unknown> }): Type<unknown> => m.CarouselDemoComponent
      ),
    title: 'Carousel - UI Components Library',
  },
  {
    path: 'color-picker',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/color-picker/color-picker-demo.component').then(
        (m: { ColorPickerDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ColorPickerDemoComponent
      ),
    title: 'ColorPicker - UI Components Library',
  },
  {
    path: 'confirm-dialog',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/confirm-dialog/confirm-dialog-demo.component').then(
        (m: { ConfirmDialogDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ConfirmDialogDemoComponent
      ),
    title: 'ConfirmDialog - UI Components Library',
  },
  {
    path: 'confirm-popup',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/confirm-popup/confirm-popup-demo.component').then(
        (m: { ConfirmPopupDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ConfirmPopupDemoComponent
      ),
    title: 'ConfirmPopup - UI Components Library',
  },
  {
    path: 'breadcrumb',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/breadcrumb/breadcrumb-demo.component').then(
        (m: { BreadcrumbDemoComponent: Type<unknown> }): Type<unknown> => m.BreadcrumbDemoComponent
      ),
    title: 'Breadcrumb - UI Components Library',
  },
  {
    path: 'context-menu',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/context-menu/context-menu-demo.component').then(
        (m: { ContextMenuDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ContextMenuDemoComponent
      ),
    title: 'ContextMenu - UI Components Library',
  },
  {
    path: 'chip',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/chip/chip-demo.component').then(
        (m: { ChipDemoComponent: Type<unknown> }): Type<unknown> => m.ChipDemoComponent
      ),
    title: 'Chip - UI Components Library',
  },
  {
    path: 'code-snippet',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/code-snippet/code-snippet-demo.component').then(
        (m: { CodeSnippetDemoComponent: Type<unknown> }): Type<unknown> =>
          m.CodeSnippetDemoComponent
      ),
    title: 'Code Snippet - UI Components Library',
  },
  {
    path: 'class-names',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/class-names/class-names-demo.component').then(
        (m: { ClassNamesDemoComponent: Type<unknown> }): Type<unknown> => m.ClassNamesDemoComponent
      ),
    title: 'ClassNames - UI Components Library',
  },
  {
    path: 'keyboard-guide',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/keyboard-guide/keyboard-guide-demo.component').then(
        (m: { KeyboardGuideDemoComponent: Type<unknown> }): Type<unknown> =>
          m.KeyboardGuideDemoComponent
      ),
    title: 'Keyboard Guide - UI Components Library',
  },
  {
    path: 'syntax-highlighter',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/syntax-highlighter/syntax-highlighter-demo.component').then(
        (m: { SyntaxHighlighterDemoComponent: Type<unknown> }): Type<unknown> =>
          m.SyntaxHighlighterDemoComponent
      ),
    title: 'SyntaxHighlighter - UI Components Library',
  },
  {
    path: 'date-picker',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/date-picker/date-picker-demo.component').then(
        (m: { DatePickerDemoComponent: Type<unknown> }): Type<unknown> => m.DatePickerDemoComponent
      ),
    title: 'DatePicker - UI Components Library',
  },
  {
    path: 'divider',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/divider/divider-demo.component').then(
        (m: { DividerDemoComponent: Type<unknown> }): Type<unknown> => m.DividerDemoComponent
      ),
    title: 'Divider - UI Components Library',
  },
  {
    path: 'dock',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/dock/dock-demo.component').then(
        (m: { DockDemoComponent: Type<unknown> }): Type<unknown> => m.DockDemoComponent
      ),
    title: 'Dock - UI Components Library',
  },
  {
    path: 'drawer',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/drawer/drawer-demo.component').then(
        (m: { DrawerDemoComponent: Type<unknown> }): Type<unknown> => m.DrawerDemoComponent
      ),
    title: 'Drawer - UI Components Library',
  },
  {
    path: 'dynamic-dialog',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/dynamic-dialog/dynamic-dialog-demo.component').then(
        (m: { DynamicDialogDemoComponent: Type<unknown> }): Type<unknown> =>
          m.DynamicDialogDemoComponent
      ),
    title: 'DynamicDialog - UI Components Library',
  },
  {
    path: 'editor',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/editor/editor-demo.component').then(
        (m: { EditorDemoComponent: Type<unknown> }): Type<unknown> => m.EditorDemoComponent
      ),
    title: 'Editor - UI Components Library',
  },
  {
    path: 'fieldset',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/fieldset/fieldset-demo.component').then(
        (m: { FieldsetDemoComponent: Type<unknown> }): Type<unknown> => m.FieldsetDemoComponent
      ),
    title: 'Fieldset - UI Components Library',
  },
  {
    path: 'float-label',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/float-label/float-label-demo').then(
        (m: { FloatLabelDemoComponent: Type<unknown> }): Type<unknown> => m.FloatLabelDemoComponent
      ),
    title: 'FloatLabel - UI Components Library',
  },
  {
    path: 'focus-trap',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/focus-trap/focus-trap-demo.component').then(
        (m: { FocusTrapDemoComponent: Type<unknown> }): Type<unknown> => m.FocusTrapDemoComponent
      ),
    title: 'FocusTrap - UI Components Library',
  },
  {
    path: 'fluid',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/fluid/fluid-demo.component').then(
        (m: { FluidDemoComponent: Type<unknown> }): Type<unknown> => m.FluidDemoComponent
      ),
    title: 'Fluid - UI Components Library',
  },
  {
    path: 'icon-field',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/icon-field/icon-field-demo.component').then(
        (m: { IconFieldDemoComponent: Type<unknown> }): Type<unknown> => m.IconFieldDemoComponent
      ),
    title: 'IconField - UI Components Library',
  },
  {
    path: 'image',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/image/image-demo.component').then(
        (m: { ImageDemoComponent: Type<unknown> }): Type<unknown> => m.ImageDemoComponent
      ),
    title: 'Image - UI Components Library',
  },
  {
    path: 'image-compare',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/image-compare/image-compare-demo.component').then(
        (m: { ImageCompareDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ImageCompareDemoComponent
      ),
    title: 'ImageCompare - UI Components Library',
  },
  {
    path: 'input-group',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/input-group/input-group-demo.component').then(
        (m: { InputGroupDemoComponent: Type<unknown> }): Type<unknown> => m.InputGroupDemoComponent
      ),
    title: 'InputGroup - UI Components Library',
  },
  {
    path: 'input-mask',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/input-mask/input-mask-demo.component').then(
        (m: { InputMaskDemoComponent: Type<unknown> }): Type<unknown> => m.InputMaskDemoComponent
      ),
    title: 'InputMask - UI Components Library',
  },
  {
    path: 'input-number',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/input-number/input-number-demo.component').then(
        (m: { InputNumberDemoComponent: Type<unknown> }): Type<unknown> =>
          m.InputNumberDemoComponent
      ),
    title: 'InputNumber - UI Components Library',
  },
  {
    path: 'input-otp',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/input-otp/input-otp-demo.component').then(
        (m: { InputOtpDemoComponent: Type<unknown> }): Type<unknown> => m.InputOtpDemoComponent
      ),
    title: 'InputOtp - UI Components Library',
  },
  {
    path: 'key-filter',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/key-filter/key-filter-demo.component').then(
        (m: { KeyFilterDemoComponent: Type<unknown> }): Type<unknown> => m.KeyFilterDemoComponent
      ),
    title: 'KeyFilter - UI Components Library',
  },
  {
    path: 'knob',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/knob/knob-demo.component').then(
        (m: { KnobDemoComponent: Type<unknown> }): Type<unknown> => m.KnobDemoComponent
      ),
    title: 'Knob - UI Components Library',
  },
  {
    path: 'listbox',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/listbox/listbox-demo.component').then(
        (m: { ListboxDemoComponent: Type<unknown> }): Type<unknown> => m.ListboxDemoComponent
      ),
    title: 'Listbox - UI Components Library',
  },
  {
    path: 'password',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/password/password-demo.component').then(
        (m: { PasswordDemoComponent: Type<unknown> }): Type<unknown> => m.PasswordDemoComponent
      ),
    title: 'Password - UI Components Library',
  },
  {
    path: 'inplace',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/inplace/inplace-demo.component').then(
        (m: { InplaceDemoComponent: Type<unknown> }): Type<unknown> => m.InplaceDemoComponent
      ),
    title: 'Inplace - UI Components Library',
  },
  {
    path: 'panel',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/panel/panel-demo.component').then(
        (m: { PanelDemoComponent: Type<unknown> }): Type<unknown> => m.PanelDemoComponent
      ),
    title: 'Panel - UI Components Library',
  },
  {
    path: 'password',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/password/password-demo.component').then(
        (m: { PasswordDemoComponent: Type<unknown> }): Type<unknown> => m.PasswordDemoComponent
      ),
    title: 'Password - UI Components Library',
  },
  {
    path: 'popover',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/popover/popover-demo.component').then(
        (m: { PopoverDemoComponent: Type<unknown> }): Type<unknown> => m.PopoverDemoComponent
      ),
    title: 'Popover - UI Components Library',
  },
  {
    path: 'radio-button',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/radio-button/radio-button-demo.component').then(
        (m: { RadioButtonDemoComponent: Type<unknown> }): Type<unknown> =>
          m.RadioButtonDemoComponent
      ),
    title: 'RadioButton - UI Components Library',
  },
  {
    path: 'rating',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/rating/rating-demo.component').then(
        (m: { RatingDemoComponent: Type<unknown> }): Type<unknown> => m.RatingDemoComponent
      ),
    title: 'Rating - UI Components Library',
  },
  {
    path: 'data-view',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/data-view/data-view-demo.component').then(
        (m: { DataViewDemoComponent: Type<unknown> }): Type<unknown> => m.DataViewDemoComponent
      ),
    title: 'DataView - UI Components Library',
  },
  {
    path: 'order-list',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/order-list/order-list-demo.component').then(
        (m: { OrderListDemoComponent: Type<unknown> }): Type<unknown> => m.OrderListDemoComponent
      ),
    title: 'OrderList - UI Components Library',
  },
  {
    path: 'mega-menu',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/mega-menu/mega-menu-demo.component').then(
        (m: { MegaMenuDemoComponent: Type<unknown> }): Type<unknown> => m.MegaMenuDemoComponent
      ),
    title: 'MegaMenu - UI Components Library',
  },
  {
    path: 'menu',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/menu/menu-demo.component').then(
        (m: { MenuDemoComponent: Type<unknown> }): Type<unknown> => m.MenuDemoComponent
      ),
    title: 'Menu - UI Components Library',
  },
  {
    path: 'message',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/message/message-demo.component').then(
        (m: { MessageDemoComponent: Type<unknown> }): Type<unknown> => m.MessageDemoComponent
      ),
    title: 'Message - UI Components Library',
  },
  {
    path: 'menubar',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/menubar/menubar-demo.component').then(
        (m: { MenubarDemoComponent: Type<unknown> }): Type<unknown> => m.MenubarDemoComponent
      ),
    title: 'Menubar - UI Components Library',
  },
  {
    path: 'organization-chart',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/organization-chart/organization-chart-demo.component').then(
        (m: { OrganizationChartDemoComponent: Type<unknown> }): Type<unknown> =>
          m.OrganizationChartDemoComponent
      ),
    title: 'OrganizationChart - UI Components Library',
  },
  {
    path: 'meter-group',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/meter-group/meter-group-demo.component').then(
        (m: { MeterGroupDemoComponent: Type<unknown> }): Type<unknown> => m.MeterGroupDemoComponent
      ),
    title: 'MeterGroup - UI Components Library',
  },
  {
    path: 'panel-menu',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/panel-menu/panel-menu-demo.component').then(
        (m: { PanelMenuDemoComponent: Type<unknown> }): Type<unknown> => m.PanelMenuDemoComponent
      ),
    title: 'PanelMenu - UI Components Library',
  },
  {
    path: 'paginator',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/paginator/paginator-demo.component').then(
        (m: { PaginatorDemoComponent: Type<unknown> }): Type<unknown> => m.PaginatorDemoComponent
      ),
    title: 'Paginator - UI Components Library',
  },
  {
    path: 'pick-list',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pick-list/pick-list-demo.component').then(
        (m: { PickListDemoComponent: Type<unknown> }): Type<unknown> => m.PickListDemoComponent
      ),
    title: 'PickList - UI Components Library',
  },
  {
    path: 'progress-bar',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/progress-bar/progress-bar-demo.component').then(
        (m: { ProgressBarDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ProgressBarDemoComponent
      ),
    title: 'ProgressBar - UI Components Library',
  },
  {
    path: 'progress-spinner',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/progress-spinner/progress-spinner-demo.component').then(
        (m: { ProgressSpinnerDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ProgressSpinnerDemoComponent
      ),
    title: 'ProgressSpinner - UI Components Library',
  },
  {
    path: 'scroll-panel',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/scroll-panel/scroll-panel-demo.component').then(
        (m: { ScrollPanelDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ScrollPanelDemoComponent
      ),
    title: 'ScrollPanel - UI Components Library',
  },
  {
    path: 'scroller',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/scroller/scroller-demo.component').then(
        (m: { ScrollerDemoComponent: Type<unknown> }): Type<unknown> => m.ScrollerDemoComponent
      ),
    title: 'Scroller - UI Components Library',
  },
  {
    path: 'ripple',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/ripple/ripple-demo.component').then(
        (m: { RippleDemoComponent: Type<unknown> }): Type<unknown> => m.RippleDemoComponent
      ),
    title: 'Ripple - UI Components Library',
  },
  {
    path: 'scroll-top',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/scroll-top/scroll-top-demo.component').then(
        (m: { ScrollTopDemoComponent: Type<unknown> }): Type<unknown> => m.ScrollTopDemoComponent
      ),
    title: 'ScrollTop - UI Components Library',
  },
  {
    path: 'slider',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/slider/slider-demo.component').then(
        (m: { SliderDemoComponent: Type<unknown> }): Type<unknown> => m.SliderDemoComponent
      ),
    title: 'Slider - UI Components Library',
  },
  {
    path: 'skeleton',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/skeleton/skeleton-demo.component').then(
        (m: { SkeletonDemoComponent: Type<unknown> }): Type<unknown> => m.SkeletonDemoComponent
      ),
    title: 'Skeleton - UI Components Library',
  },
  {
    path: 'speed-dial',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/speed-dial/speed-dial-demo.component').then(
        (m: { SpeedDialDemoComponent: Type<unknown> }): Type<unknown> => m.SpeedDialDemoComponent
      ),
    title: 'SpeedDial - UI Components Library',
  },
  {
    path: 'split-button',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/split-button/split-button-demo.component').then(
        (m: { SplitButtonDemoComponent: Type<unknown> }): Type<unknown> =>
          m.SplitButtonDemoComponent
      ),
    title: 'SplitButton - UI Components Library',
  },
  {
    path: 'splitter',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/coming-soon/coming-soon-page.component').then(
        (m: { ComingSoonPageComponent: Type<unknown> }): Type<unknown> => m.ComingSoonPageComponent
      ),
    title: 'Splitter — Coming Soon - UI Components Library',
    data: {
      componentName: 'Splitter',
      description: 'Two or more resizable panes for IDE-style layouts, dashboards, and editors.',
      rationale:
        'Two or more resizable panes; needed in IDEs, dashboards, editors. PrimeNG, Ng-Zorro, shadcn all have it.',
      complexity: 'Medium-High',
      reference: 'PrimeNG Splitter, shadcn Resizable',
      priority: 9,
      group: 'Panel',
    },
  },
  {
    path: 'stepper',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/stepper/stepper-demo.component').then(
        (m: { StepperDemoComponent: Type<unknown> }): Type<unknown> => m.StepperDemoComponent
      ),
    title: 'Stepper - UI Components Library',
  },
  {
    path: 'style-class',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/style-class/style-class-demo.component').then(
        (m: { StyleClassDemoComponent: Type<unknown> }): Type<unknown> => m.StyleClassDemoComponent
      ),
    title: 'StyleClass - UI Components Library',
  },
  {
    path: 'tag',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/tag/tag-demo.component').then(
        (m: { TagDemoComponent: Type<unknown> }): Type<unknown> => m.TagDemoComponent
      ),
    title: 'Tag - UI Components Library',
  },
  {
    path: 'terminal',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/terminal/terminal-demo.component').then(
        (m: { TerminalDemoComponent: Type<unknown> }): Type<unknown> => m.TerminalDemoComponent
      ),
    title: 'Terminal - UI Components Library',
  },
  {
    path: 'table',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/table/table-demo.component').then(
        (m: { TableDemoComponent: Type<unknown> }): Type<unknown> => m.TableDemoComponent
      ),
    title: 'Table - UI Components Library',
  },
  {
    path: 'tiered-menu',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/tiered-menu/tiered-menu-demo.component').then(
        (m: { TieredMenuDemoComponent: Type<unknown> }): Type<unknown> => m.TieredMenuDemoComponent
      ),
    title: 'TieredMenu - UI Components Library',
  },
  {
    path: 'timeline',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/timeline/timeline-demo.component').then(
        (m: { TimelineDemoComponent: Type<unknown> }): Type<unknown> => m.TimelineDemoComponent
      ),
    title: 'Timeline - UI Components Library',
  },
  {
    path: 'toolbar',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/toolbar/toolbar-demo.component').then(
        (m: { ToolbarDemoComponent: Type<unknown> }): Type<unknown> => m.ToolbarDemoComponent
      ),
    title: 'Toolbar - UI Components Library',
  },
  {
    path: 'toast',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/toast/toast-demo.component').then(
        (m: { ToastDemoComponent: Type<unknown> }): Type<unknown> => m.ToastDemoComponent
      ),
    title: 'Toast - UI Components Library',
  },
  {
    path: 'tooltip',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/tooltip/tooltip-demo.component').then(
        (m: { TooltipDemoComponent: Type<unknown> }): Type<unknown> => m.TooltipDemoComponent
      ),
    title: 'Tooltip - UI Components Library',
  },
  {
    path: 'tree',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/tree/tree-demo.component').then(
        (m: { TreeDemoComponent: Type<unknown> }): Type<unknown> => m.TreeDemoComponent
      ),
    title: 'Tree - UI Components Library',
  },
  {
    path: 'tree-table',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/tree-table/tree-table-demo.component').then(
        (m: { TreeTableDemoComponent: Type<unknown> }): Type<unknown> => m.TreeTableDemoComponent
      ),
    title: 'TreeTable - UI Components Library',
  },
  {
    path: 'textarea',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/textarea/textarea-demo.component').then(
        (m: { TextareaDemoComponent: Type<unknown> }): Type<unknown> => m.TextareaDemoComponent
      ),
    title: 'Textarea - UI Components Library',
  },
  {
    path: 'toggle-button',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/toggle-button/toggle-button-demo.component').then(
        (m: { ToggleButtonDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ToggleButtonDemoComponent
      ),
    title: 'ToggleButton - UI Components Library',
  },
  {
    path: 'toggle-switch',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/toggle-switch/toggle-switch-demo.component').then(
        (m: { ToggleSwitchDemoComponent: Type<unknown> }): Type<unknown> =>
          m.ToggleSwitchDemoComponent
      ),
    title: 'ToggleSwitch - UI Components Library',
  },
  {
    path: 'tree-select',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/tree-select/tree-select-demo.component').then(
        (m: { TreeSelectDemoComponent: Type<unknown> }): Type<unknown> => m.TreeSelectDemoComponent
      ),
    title: 'TreeSelect - UI Components Library',
  },
  {
    path: 'upload',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/upload/upload-demo.component').then(
        (m: { UploadDemoComponent: Type<unknown> }): Type<unknown> => m.UploadDemoComponent
      ),
    title: 'Upload - UI Components Library',
  },
  {
    path: 'vision',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/vision/vision.component').then(
        (m: { VisionComponent: Type<unknown> }): Type<unknown> => m.VisionComponent
      ),
    title: 'Vision - UI Components Library',
  },
  {
    path: 'roadmap',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/roadmap/roadmap.component').then(
        (m: { RoadmapComponent: Type<unknown> }): Type<unknown> => m.RoadmapComponent
      ),
    title: 'Roadmap & Progress - UI Components Library',
  },
  // ── Build Queue — coming soon ──────────────────────────────────────────
  {
    path: 'date-range-picker',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/coming-soon/coming-soon-page.component').then(
        (m: { ComingSoonPageComponent: Type<unknown> }): Type<unknown> => m.ComingSoonPageComponent
      ),
    title: 'DateRangePicker — Coming Soon - UI Components Library',
    data: {
      componentName: 'DateRangePicker',
      description:
        'Date range selection — pick a start and end date with a single intuitive picker.',
      rationale:
        'Every major library has it. Date range selection is a daily developer need. PrimeNG, Material, Ng-Zorro all ship one.',
      complexity: 'Medium',
      reference: 'PrimeNG DatePicker, Material DateRangePicker',
      priority: 1,
      group: 'Form',
    },
  },
  {
    path: 'time-picker',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/coming-soon/coming-soon-page.component').then(
        (m: { ComingSoonPageComponent: Type<unknown> }): Type<unknown> => m.ComingSoonPageComponent
      ),
    title: 'TimePicker — Coming Soon - UI Components Library',
    data: {
      componentName: 'TimePicker',
      description: 'Standalone time input for scheduling, booking, and time-entry UIs.',
      rationale:
        'Standalone time input; extremely common in scheduling / booking UIs. Very low a11y complexity.',
      complexity: 'Low-Medium',
      reference: 'PrimeNG TimePicker, Ng-Zorro TimePicker',
      priority: 2,
      group: 'Form',
    },
  },
  {
    path: 'empty-state',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/coming-soon/coming-soon-page.component').then(
        (m: { ComingSoonPageComponent: Type<unknown> }): Type<unknown> => m.ComingSoonPageComponent
      ),
    title: 'Empty State — Coming Soon - UI Components Library',
    data: {
      componentName: 'Empty State',
      description:
        'A polished "no data" placeholder component every app needs — almost no library ships it properly.',
      rationale:
        '"No data" placeholder; every app needs this; almost no library ships it as a proper component. Highest bang-for-buck.',
      complexity: 'Low',
      reference: 'Ng-Zorro Empty',
      priority: 3,
      group: 'Misc',
    },
  },
  {
    path: 'statistic',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/coming-soon/coming-soon-page.component').then(
        (m: { ComingSoonPageComponent: Type<unknown> }): Type<unknown> => m.ComingSoonPageComponent
      ),
    title: 'Statistic — Coming Soon - UI Components Library',
    data: {
      componentName: 'Statistic',
      description:
        'Key metric display with label, value, and trend indicator — ubiquitous in dashboards.',
      rationale:
        'Key metric display with label + trend; ubiquitous in dashboards. Only Ng-Zorro has it — big differentiator.',
      complexity: 'Low',
      reference: 'Ng-Zorro Statistic',
      priority: 4,
      group: 'Data',
    },
  },
  {
    path: 'typography',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/coming-soon/coming-soon-page.component').then(
        (m: { ComingSoonPageComponent: Type<unknown> }): Type<unknown> => m.ComingSoonPageComponent
      ),
    title: 'Typography — Coming Soon - UI Components Library',
    data: {
      componentName: 'Typography',
      description:
        'Semantic Heading, Text, Code, and Link components with token-driven styling for a complete design-system feel.',
      rationale:
        'Semantic Heading / Text / Code / Link with token-driven styling. shadcn and Ng-Zorro have it; gives library a complete design-system feel.',
      complexity: 'Low',
      reference: 'Ng-Zorro Typography, shadcn Typography',
      priority: 5,
      group: 'Misc',
    },
  },
  {
    path: 'descriptions',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/coming-soon/coming-soon-page.component').then(
        (m: { ComingSoonPageComponent: Type<unknown> }): Type<unknown> => m.ComingSoonPageComponent
      ),
    title: 'Descriptions — Coming Soon - UI Components Library',
    data: {
      componentName: 'Descriptions',
      description: 'Key-value pair display for detail views, profile pages, and record summaries.',
      rationale:
        'Key-value pair display; common in detail views. Only Ng-Zorro ships this — easy differentiator win.',
      complexity: 'Low',
      reference: 'Ng-Zorro Descriptions',
      priority: 6,
      group: 'Data',
    },
  },
  {
    path: 'segmented-control',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/coming-soon/coming-soon-page.component').then(
        (m: { ComingSoonPageComponent: Type<unknown> }): Type<unknown> => m.ComingSoonPageComponent
      ),
    title: 'Segmented Control — Coming Soon - UI Components Library',
    data: {
      componentName: 'Segmented Control',
      description:
        'View-switcher control for Grid/List toggles, Day/Week/Month selectors — distinct from SelectButton.',
      rationale:
        'View-switcher pattern (Grid/List, Day/Week/Month); distinct from SelectButton (which is a toggle).',
      complexity: 'Low',
      reference: 'Ng-Zorro Segmented',
      priority: 7,
      group: 'Form',
    },
  },
  {
    path: 'kbd',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/coming-soon/coming-soon-page.component').then(
        (m: { ComingSoonPageComponent: Type<unknown> }): Type<unknown> => m.ComingSoonPageComponent
      ),
    title: 'Kbd — Coming Soon - UI Components Library',
    data: {
      componentName: 'Kbd',
      description:
        'Display keyboard shortcuts inline in tooltips, menus, and command palettes with styled key badges.',
      rationale:
        'Display keyboard shortcuts inline in tooltips and menus. Only shadcn ships this — small but DX-delightful differentiator.',
      complexity: 'Very Low',
      reference: 'shadcn/ui Kbd',
      priority: 8,
      group: 'Misc',
    },
  },
  {
    path: 'scroll-area',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/coming-soon/coming-soon-page.component').then(
        (m: { ComingSoonPageComponent: Type<unknown> }): Type<unknown> => m.ComingSoonPageComponent
      ),
    title: 'Scroll Area — Coming Soon - UI Components Library',
    data: {
      componentName: 'Scroll Area',
      description:
        'Custom-styled scrollbar overlay that preserves native scroll behaviour — no Angular library ships this today.',
      rationale:
        'Custom-styled scrollbar overlay preserving native scroll. Radix and shadcn ship it — no Angular libraries do.',
      complexity: 'Medium',
      reference: 'Radix ScrollArea, shadcn Scroll Area',
      priority: 10,
      group: 'Panel',
    },
  },
  {
    path: 'calendar',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/coming-soon/coming-soon-page.component').then(
        (m: { ComingSoonPageComponent: Type<unknown> }): Type<unknown> => m.ComingSoonPageComponent
      ),
    title: 'Calendar — Coming Soon - UI Components Library',
    data: {
      componentName: 'Calendar',
      description:
        'Full month/year grid for scheduling and event display — distinct from the DatePicker.',
      rationale:
        'Full month/year grid for scheduling and event display; distinct from DatePicker. 4 of 6 reference libraries have it.',
      complexity: 'High',
      reference: 'PrimeNG Calendar, Ng-Zorro Calendar',
      priority: 11,
      group: 'Data',
    },
  },
  {
    path: 'navigation-menu',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/coming-soon/coming-soon-page.component').then(
        (m: { ComingSoonPageComponent: Type<unknown> }): Type<unknown> => m.ComingSoonPageComponent
      ),
    title: 'Navigation Menu — Coming Soon - UI Components Library',
    data: {
      componentName: 'Navigation Menu',
      description:
        'Top-level horizontal navigation with rich dropdown panels — distinct from Menubar.',
      rationale:
        'Top-level horizontal nav with rich dropdown panels; distinct from Menubar. shadcn and Radix both have it first-class.',
      complexity: 'Medium',
      reference: 'Radix NavigationMenu, shadcn Navigation Menu',
      priority: 12,
      group: 'Menu',
    },
  },
  // ── Pro & Enterprise routes ───────────────────────────────────────────────
  {
    path: 'pro-data-grid',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pro-coming-soon/pro-coming-soon-page.component').then(
        (m: { ProComingSoonPageComponent: Type<unknown> }): Type<unknown> =>
          m.ProComingSoonPageComponent
      ),
    title: 'Advanced Data Grid — Pro - UI Components Library',
    data: {
      componentName: 'Advanced Data Grid',
      tagline:
        'Enterprise-grade data grid for Angular — signals-first, accessible, production-ready.',
      description:
        'A fully-featured data grid built specifically for Angular 17+ with signals, zoneless support, and elite accessibility. Virtual scroll, Excel-like editing, server-side operations, and tree-table mode — all in one composable component.',
      icon: 'pi-table',
      tier: 'pro',
      features: [
        'Virtual scroll — millions of rows at 60 fps',
        'Column pinning, grouping, and reordering',
        'Excel-like inline cell editing',
        'Server-side filter, sort, and pagination',
        'Tree-table mode with lazy loading',
        'Aggregations, summaries, and pivot',
        'Drag-to-reorder rows and columns',
        'State persistence (sort, filters, column order)',
        'Full keyboard navigation — WAI-ARIA grid pattern',
        'Export to CSV / Excel',
      ],
      useCases: [
        'Financial dashboards & trading portals',
        'Admin portals & back-office tools',
        'Analytics platforms',
        'ERP & enterprise SaaS',
        'Data exploration tools',
      ],
      githubUrl: 'https://github.com/Filip1986/ui-lib-custom',
    },
  },
  {
    path: 'pro-workflow-builder',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pro-coming-soon/pro-coming-soon-page.component').then(
        (m: { ProComingSoonPageComponent: Type<unknown> }): Type<unknown> =>
          m.ProComingSoonPageComponent
      ),
    title: 'Workflow Builder — Pro - UI Components Library',
    data: {
      componentName: 'Workflow & Visual Builder',
      tagline: 'Drag-and-drop visual workflow designer and query builder for Angular.',
      description:
        'A composable visual builder toolkit: drag-drop pipeline canvas, nested query builder that compiles to SQL / MongoDB / Elasticsearch, and a lightweight BPMN-style editor. Built for process automation, CRM pipelines, and rule-engine UIs.',
      icon: 'pi-sitemap',
      tier: 'pro',
      features: [
        'Drag-drop node canvas with snap-to-grid',
        'Nested query builder → SQL / Mongo / Elastic output',
        'BPMN-lite process editor',
        'Form builder with conditional logic',
        'Survey / questionnaire builder',
        'Rule engine UI (condition trees)',
        'Undo / redo history',
        'Export to JSON / BPMN XML',
        'Full keyboard and screen-reader support',
      ],
      useCases: [
        'Business process automation',
        'CRM and sales pipeline tools',
        'ETL and data transformation',
        'Approval workflow systems',
        'Low-code / no-code platforms',
      ],
      githubUrl: 'https://github.com/Filip1986/ui-lib-custom',
    },
  },
  {
    path: 'pro-form-engine',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pro-coming-soon/pro-coming-soon-page.component').then(
        (m: { ProComingSoonPageComponent: Type<unknown> }): Type<unknown> =>
          m.ProComingSoonPageComponent
      ),
    title: 'Dynamic Form Engine — Pro - UI Components Library',
    data: {
      componentName: 'Dynamic Form Engine',
      tagline: 'JSON-schema-driven forms with signals-first validation and conditional logic.',
      description:
        'Render complete, validated, conditional Angular Reactive Forms from a JSON schema at runtime. Handles multi-step wizards, complex cross-field validation, and large-form performance — all without writing template code.',
      icon: 'pi-file-edit',
      tier: 'pro',
      features: [
        'JSON Schema → form renderer (no template code)',
        'Conditional field show/hide and enable/disable',
        'Cross-field and async validation DSL',
        'Multi-step wizard with progress tracking',
        'Repeatable field groups (arrays)',
        'Large-form performance (virtual sub-sections)',
        'Deep Angular Reactive Forms integration',
        'Custom field-type registry',
        'Form state serialisation and restoration',
      ],
      useCases: [
        'Enterprise onboarding & KYC flows',
        'Survey and questionnaire platforms',
        'Configuration and settings wizards',
        'Compliance and regulatory forms',
        'Dynamic product configurators',
      ],
      githubUrl: 'https://github.com/Filip1986/ui-lib-custom',
    },
  },
  {
    path: 'pro-gantt',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pro-coming-soon/pro-coming-soon-page.component').then(
        (m: { ProComingSoonPageComponent: Type<unknown> }): Type<unknown> =>
          m.ProComingSoonPageComponent
      ),
    title: 'Gantt & Scheduler — Pro - UI Components Library',
    data: {
      componentName: 'Gantt & Scheduler',
      tagline: 'Resource scheduling, project timelines, and calendar planning for Angular.',
      description:
        'A fully-featured Gantt chart and resource scheduler: drag scheduling, dependency arrows, zoom levels from hours to years, and calendar integration. The component teams always need and never want to build.',
      icon: 'pi-calendar',
      tier: 'enterprise',
      features: [
        'Drag-to-resize and drag-to-move tasks',
        'Resource allocation grid',
        'Task dependency arrows',
        'Zoom: hours → days → weeks → months → quarters → years',
        'Baseline and critical-path highlighting',
        'Calendar integration (blocked days, holidays)',
        'Milestone markers',
        'Export to PDF / image',
        'Full keyboard accessibility',
      ],
      useCases: [
        'Project management tools',
        'HR and workforce scheduling',
        'Manufacturing and operations',
        'Logistics and delivery planning',
        'Construction and facility management',
      ],
      githubUrl: 'https://github.com/Filip1986/ui-lib-custom',
    },
  },
  {
    path: 'pro-ai-kit',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pro-coming-soon/pro-coming-soon-page.component').then(
        (m: { ProComingSoonPageComponent: Type<unknown> }): Type<unknown> =>
          m.ProComingSoonPageComponent
      ),
    title: 'AI UI Kit — Pro - UI Components Library',
    data: {
      componentName: 'AI UI Kit',
      tagline: 'Angular-native UI components for AI-powered applications.',
      description:
        "The Angular ecosystem's first dedicated AI UI kit: streaming chat, prompt playground, token usage viewer, AI diff/review panels, and agent workflow builder. React has it — now Angular does too.",
      icon: 'pi-comments',
      tier: 'pro',
      features: [
        'Streaming chat widget (SSE / WebSocket)',
        'Prompt playground with model selector',
        'AI diff / change review panel',
        'Token usage and cost viewer',
        'Agent workflow status tracker',
        'Streaming text renderer (token-by-token)',
        'Markdown + code block output rendering',
        'Conversation history with branching',
        'Accessible: ARIA live regions for streaming output',
      ],
      useCases: [
        'AI chat and assistant applications',
        'Code review and dev tooling',
        'Document analysis and annotation',
        'LLM-powered SaaS products',
        'Internal copilot tools',
      ],
      githubUrl: 'https://github.com/Filip1986/ui-lib-custom',
    },
  },
  {
    path: 'pro-analytics',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pro-coming-soon/pro-coming-soon-page.component').then(
        (m: { ProComingSoonPageComponent: Type<unknown> }): Type<unknown> =>
          m.ProComingSoonPageComponent
      ),
    title: 'Analytics & Charts Pro — Pro - UI Components Library',
    data: {
      componentName: 'Analytics & Charts Pro',
      tagline:
        'Advanced data visualisation beyond basic charts — realtime, interactive, composable.',
      description:
        'The Chart component handles bar, line, pie, and scatter. Analytics Pro goes further: TradingView-like candlesticks, org charts with drag-and-drop, network graphs, heatmaps, and realtime dashboard widget primitives.',
      icon: 'pi-chart-bar',
      tier: 'pro',
      features: [
        'Candlestick / OHLC chart (TradingView-like)',
        'Org chart with drag-and-drop editing',
        'Network / dependency graph',
        'Heatmap with drill-down',
        'Realtime dashboard widget containers',
        'Funnel and waterfall charts',
        'Gantt-style timeline chart',
        'Cross-chart brushing and filtering',
        'Export to SVG / PNG / PDF',
      ],
      useCases: [
        'Financial and trading platforms',
        'Business intelligence dashboards',
        'DevOps and monitoring portals',
        'Sales analytics and CRM',
        'HR org management tools',
      ],
      githubUrl: 'https://github.com/Filip1986/ui-lib-custom',
    },
  },
  {
    path: 'pro-rich-text',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pro-coming-soon/pro-coming-soon-page.component').then(
        (m: { ProComingSoonPageComponent: Type<unknown> }): Type<unknown> =>
          m.ProComingSoonPageComponent
      ),
    title: 'Rich Text & Document — Pro - UI Components Library',
    data: {
      componentName: 'Rich Text & Document',
      tagline: 'Document editing experience for Angular — collaborative, extensible, accessible.',
      description:
        'A Notion-like block editor, collaborative editing via CRDT, PDF annotation viewer, and a document approval / review flow — all Angular-native. Most rich-text editors are React-first; this one is built for Angular from day one.',
      icon: 'pi-pen-to-square',
      tier: 'pro',
      features: [
        'Notion-like block editor (paragraphs, headings, lists, code)',
        'Collaborative editing (CRDT-based)',
        'PDF viewer with annotation and highlight',
        'Diff / change viewer (side-by-side and inline)',
        'Document approval and review workflow',
        'Markdown ↔ rich-text hybrid mode',
        'Mention and link autocompletion',
        'Comment threads and resolutions',
        'Accessible: full keyboard editing, screen reader support',
      ],
      useCases: [
        'CMS and content platforms',
        'Document management systems',
        'Contract review and legal tools',
        'Knowledge bases and wikis',
        'Collaborative note-taking apps',
      ],
      githubUrl: 'https://github.com/Filip1986/ui-lib-custom',
    },
  },
  {
    path: 'pro-dev-tools',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/pro-coming-soon/pro-coming-soon-page.component').then(
        (m: { ProComingSoonPageComponent: Type<unknown> }): Type<unknown> =>
          m.ProComingSoonPageComponent
      ),
    title: 'Developer Experience Tools — Pro - UI Components Library',
    data: {
      componentName: 'Developer Experience Tools',
      tagline: 'Internal tooling components for developer-facing Angular applications.',
      description:
        'Everything platform and DevOps teams need to build polished internal tools: log viewer with live filtering, feature-flag dashboard, permission/role editor, API explorer, and audit trail viewer. Batteries included.',
      icon: 'pi-wrench',
      tier: 'pro',
      features: [
        'Log viewer with live filtering and ANSI colour support',
        'Feature flag dashboard (toggle, percentage rollout)',
        'Permission / role editor with role matrix',
        'API explorer (OpenAPI-driven request builder)',
        'Audit trail viewer with diff expansion',
        'Environment config panel',
        'JSON / YAML diff viewer',
        'Error replay and trace viewer',
        'Accessible: keyboard-navigable log streams',
      ],
      useCases: [
        'Internal admin portals',
        'DevOps and platform engineering',
        'SaaS admin and ops panels',
        'Developer portal tools',
        'Compliance and audit dashboards',
      ],
      githubUrl: 'https://github.com/Filip1986/ui-lib-custom',
    },
  },
  { path: '', redirectTo: 'shadows', pathMatch: 'full' },
  { path: '**', redirectTo: 'shadows' },
];
