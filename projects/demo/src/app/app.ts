import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, TopbarComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  sidebarVisible = signal(false);

  toggleSidebar() {
    this.sidebarVisible.update(v => !v);
  }
}
