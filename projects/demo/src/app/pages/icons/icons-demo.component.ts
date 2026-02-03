import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Icon } from 'ui-lib-custom';
import { IconButton } from 'ui-lib-custom';
import { Alert } from 'ui-lib-custom';
import { Button } from 'ui-lib-custom';
import { IconSize, SemanticIcon, SEMANTIC_ICONS } from 'ui-lib-custom';

@Component({
  selector: 'app-icons-demo',
  standalone: true,
  imports: [CommonModule, Icon, IconButton, Button, Alert, TitleCasePipe],
  template: `
    <div class="demo-page">
      <h1>Icon System</h1>

      <section class="demo-section">
        <h2>Icon Sizes</h2>
        <div class="icon-row">
          @for (size of sizes; track size) {
            <div class="icon-demo">
              <ui-lib-icon name="star" [size]="size" />
              <span>{{ size }}</span>
            </div>
          }
        </div>
      </section>

      <section class="demo-section">
        <h2>Semantic Icons by Variant</h2>
        <div class="variant-grid">
          @for (variant of variants; track variant) {
            <div class="variant-column">
              <h3>{{ variant | titlecase }}</h3>
              @for (icon of semanticIcons; track icon) {
                <div class="icon-item">
                  <ui-lib-icon [name]="icon" [variant]="variant" />
                  <code>{{ icon }}</code>
                </div>
              }
            </div>
          }
        </div>
      </section>

      <section class="demo-section">
        <h2>Button with Icons</h2>
        <div class="button-row">
          <ui-lib-button icon="download">Download</ui-lib-button>
          <ui-lib-button icon="arrow-right" iconPosition="right">Next</ui-lib-button>
          <ui-lib-button icon="refresh" [loading]="loading()">
            {{ loading() ? 'Loading...' : 'Refresh' }}
          </ui-lib-button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Icon Buttons</h2>
        <div class="button-row">
          @for (variant of variants; track variant) {
            <div class="icon-button-group">
              <h4>{{ variant | titlecase }}</h4>
              <ui-lib-icon-button icon="settings" [variant]="variant" ariaLabel="Settings" />
              <ui-lib-icon-button
                icon="edit"
                [variant]="variant"
                color="primary"
                ariaLabel="Edit"
              />
              <ui-lib-icon-button
                icon="delete"
                [variant]="variant"
                color="danger"
                ariaLabel="Delete"
              />
            </div>
          }
        </div>
      </section>

      <section class="demo-section">
        <h2>Alerts with Icons</h2>
        @for (severity of severities; track severity) {
          <ui-lib-alert [severity]="severity" [dismissible]="true">
            This is a {{ severity }} alert message.
          </ui-lib-alert>
        }
      </section>

      <section class="demo-section">
        <h2>Complete Icon Reference</h2>
        <div class="icon-search">
          <ui-lib-icon name="search" />
          <input
            type="text"
            placeholder="Search icons..."
            [value]="searchQuery()"
            (input)="onSearch($event)"
          />
        </div>
        <div class="icon-grid">
          @for (icon of filteredIcons(); track icon) {
            <button class="icon-card" type="button" (click)="copyIconName(icon)">
              <ui-lib-icon [name]="icon" size="lg" />
              <code>{{ icon }}</code>
            </button>
          }
        </div>
        @if (filteredIcons().length === 0) {
          <p class="empty">No icons match "{{ searchQuery() }}"</p>
        }
      </section>
    </div>
  `,
  styleUrl: './icons-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsDemoComponent {
  sizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  variants = ['material', 'bootstrap', 'minimal'] as const;
  severities = ['success', 'error', 'warning', 'info'] as const;
  semanticIcons: SemanticIcon[] = [
    'close',
    'menu',
    'search',
    'settings',
    'add',
    'edit',
    'delete',
    'home',
    'user',
    'mail',
    'check',
    'x',
    'star',
    'heart',
    'bell',
  ];

  loading = signal(false);
  searchQuery = signal('');

  private allIcons = SEMANTIC_ICONS;

  filteredIcons = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.allIcons;
    return this.allIcons.filter((icon) => icon.toLowerCase().includes(query));
  });

  onSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  copyIconName(icon: string) {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(`<ui-lib-icon name="${icon}" />`);
    }
  }
}
