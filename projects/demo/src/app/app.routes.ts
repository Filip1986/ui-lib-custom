import type { Routes } from '@angular/router';
import type { Type } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ButtonsComponent } from './pages/buttons/buttons.component';
import { CardsComponent } from './pages/cards/cards.component';
import { LoginComponent } from './pages/login/login.component';
import { BadgesComponent } from './pages/badges/badges.component';
import { ThemesComponent } from './pages/themes/themes.component';
import { InputsComponent } from './pages/inputs/inputs.component';
import { SelectComponent } from './pages/select/select.component';
import { SidebarMenuDemoComponent } from './pages/sidebar-menu/sidebar-menu.component';
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
import { GalleryComponent } from './pages/gallery/gallery.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home - UI Components Library' },
  { path: 'buttons', component: ButtonsComponent, title: 'Buttons - UI Components Library' },
  { path: 'cards', component: CardsComponent, title: 'Cards - UI Components Library' },
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
  { path: 'login', component: LoginComponent, title: 'Login Forms - UI Components Library' },
  { path: 'themes', component: ThemesComponent, title: 'Themes - UI Components Library' },
  { path: 'input-text', component: InputsComponent, title: 'Input Text - UI Components Library' },
  { path: 'inputs', redirectTo: 'input-text', pathMatch: 'full' },
  { path: 'select', component: SelectComponent, title: 'Select - UI Components Library' },
  { path: 'checkbox', component: CheckboxesComponent, title: 'Checkbox - UI Components Library' },
  {
    path: 'sidebar-menu',
    component: SidebarMenuDemoComponent,
    title: 'Sidebar Menu - UI Components Library',
  },
  {
    path: 'project-starter',
    component: ProjectStarterComponent,
    title: 'Project Starter - UI Components Library',
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
  { path: 'gallery', component: GalleryComponent, title: 'Gallery - UI Library' },
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
  { path: '', redirectTo: 'shadows', pathMatch: 'full' },
  { path: '**', redirectTo: 'shadows' },
];
