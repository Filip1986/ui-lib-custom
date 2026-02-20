import { Routes } from '@angular/router';
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
import { TabsDemoComponent } from './pages/tabs/tabs.component';
import { LayoutSemanticSpacingSectionComponent } from './pages/layouts/semantic-spacing-section.component';
import { LayoutStackSectionComponent } from './pages/layouts/stack-section.component';
import { LayoutInlineSectionComponent } from './pages/layouts/inline-section.component';
import { LayoutGridSectionComponent } from './pages/layouts/grid-section.component';
import { LayoutContainerSectionComponent } from './pages/layouts/container-section.component';
import { LayoutCompositionSectionComponent } from './pages/layouts/composition-section.component';
import { LayoutDesignTokensSectionComponent } from './pages/layouts/design-tokens-section.component';
import { LayoutThemedLayoutsSectionComponent } from './pages/layouts/themed-layouts-section.component';
import { LayoutExamplesSectionComponent } from './pages/layouts/examples-section.component';
import { SelectButtonsComponent } from './pages/select-buttons/select-buttons.component';
import { DarkModeComponent } from './pages/dark-mode/dark-mode.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home - UI Components Library' },
  { path: 'buttons', component: ButtonsComponent, title: 'Buttons - UI Components Library' },
  { path: 'cards', component: CardsComponent, title: 'Cards - UI Components Library' },
  { path: 'badges', component: BadgesComponent, title: 'Badges - UI Components Library' },
  { path: 'layouts', redirectTo: 'layouts/semantic-spacing', pathMatch: 'full' },
  {
    path: 'layouts/semantic-spacing',
    component: LayoutSemanticSpacingSectionComponent,
    title: 'Semantic Spacing - UI Components Library',
  },
  {
    path: 'layouts/stack',
    component: LayoutStackSectionComponent,
    title: 'Stack - UI Components Library',
  },
  {
    path: 'layouts/inline',
    component: LayoutInlineSectionComponent,
    title: 'Inline - UI Components Library',
  },
  {
    path: 'layouts/grid',
    component: LayoutGridSectionComponent,
    title: 'Grid - UI Components Library',
  },
  {
    path: 'layouts/container',
    component: LayoutContainerSectionComponent,
    title: 'Container - UI Components Library',
  },
  {
    path: 'layouts/composition',
    component: LayoutCompositionSectionComponent,
    title: 'Composition - UI Components Library',
  },
  {
    path: 'layouts/design-tokens',
    component: LayoutDesignTokensSectionComponent,
    title: 'Design Tokens - UI Components Library',
  },
  {
    path: 'layouts/themed-layouts',
    component: LayoutThemedLayoutsSectionComponent,
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
  { path: 'tabs', component: TabsDemoComponent, title: 'Tabs - UI Components Library' },
  {
    path: 'icons',
    loadComponent: () =>
      import('./pages/icons/icons-demo.component').then((m) => m.IconsDemoComponent),
    title: 'Icons - UI Components Library',
  },
  {
    path: 'accordion',
    loadComponent: () =>
      import('./pages/accordion/accordion.component').then((m) => m.AccordionComponent),
    title: 'Accordion - UI Components Library',
  },
  {
    path: 'select-buttons',
    component: SelectButtonsComponent,
    title: 'Select Buttons - UI Components Library',
  },
  { path: 'dark-mode', component: DarkModeComponent, title: 'Dark Mode - UI Library' },
  { path: '', redirectTo: 'shadows', pathMatch: 'full' },
  { path: '**', redirectTo: 'shadows' },
];
