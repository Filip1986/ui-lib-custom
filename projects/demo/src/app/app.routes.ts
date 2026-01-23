import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ButtonsComponent } from './pages/buttons/buttons.component';
import { CardsComponent } from './pages/cards/cards.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutsComponent } from './pages/layouts/layouts.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home - UI Components Library' },
  { path: 'buttons', component: ButtonsComponent, title: 'Buttons - UI Components Library' },
  { path: 'cards', component: CardsComponent, title: 'Cards - UI Components Library' },
  { path: 'layouts', component: LayoutsComponent, title: 'Layout Primitives - UI Components Library' },
  { path: 'login', component: LoginComponent, title: 'Login Forms - UI Components Library' },
  { path: '**', redirectTo: '' }
];
