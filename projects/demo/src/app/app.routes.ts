import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ButtonsComponent } from './pages/buttons/buttons.component';
import { CardsComponent } from './pages/cards/cards.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutsComponent } from './pages/layouts/layouts.component';
import { BadgesComponent } from './pages/badges/badges.component';
import { ThemesComponent } from './pages/themes/themes.component';
import { InputsComponent } from './pages/inputs/inputs.component';
import { SelectComponent } from './pages/select/select.component';
import { SidebarMenuDemoComponent } from './pages/sidebar-menu/sidebar-menu.component';
import { ProjectStarterComponent } from './pages/project-starter/project-starter.component';
import { ShadowsComponent } from './pages/shadows/shadows.component';
import { CheckboxesComponent } from './pages/checkboxes/checkboxes.component';
import { TabsDemoComponent } from './pages/tabs/tabs.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home - UI Components Library' },
  { path: 'buttons', component: ButtonsComponent, title: 'Buttons - UI Components Library' },
  { path: 'cards', component: CardsComponent, title: 'Cards - UI Components Library' },
  { path: 'badges', component: BadgesComponent, title: 'Badges - UI Components Library' },
  {
    path: 'layouts',
    component: LayoutsComponent,
    title: 'Layout Primitives - UI Components Library',
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
  { path: '', redirectTo: 'shadows', pathMatch: 'full' },
  { path: '**', redirectTo: 'shadows' },
];
