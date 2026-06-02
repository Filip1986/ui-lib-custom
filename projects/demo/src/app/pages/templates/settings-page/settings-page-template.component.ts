import type { Signal, WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Avatar } from 'ui-lib-custom/avatar';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Divider } from 'ui-lib-custom/divider';
import { Panel } from 'ui-lib-custom/panel';
import { ToggleSwitch } from 'ui-lib-custom/toggle-switch';

import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';

/** Free template: Settings Page with tabs, inputs, and toggle switches. */
@Component({
  selector: 'app-settings-page-template',
  standalone: true,
  imports: [
    RouterModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    Panel,
    Button,
    Divider,
    Avatar,
    ToggleSwitch,
    CodeSnippet,
  ],
  templateUrl: './settings-page-template.component.html',
  styleUrl: './settings-page-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageTemplateComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly activeTab: WritableSignal<'profile' | 'notifications' | 'security' | 'billing'> =
    signal<'profile' | 'notifications' | 'security' | 'billing'>('profile');

  public readonly emailNotifications: WritableSignal<boolean> = signal<boolean>(true);
  public readonly pushNotifications: WritableSignal<boolean> = signal<boolean>(false);
  public readonly weeklyDigest: WritableSignal<boolean> = signal<boolean>(true);
  public readonly twoFactor: WritableSignal<boolean> = signal<boolean>(false);
  public readonly sessionAlerts: WritableSignal<boolean> = signal<boolean>(true);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'preview', label: 'Live Preview' },
    { id: 'usage', label: 'Usage' },
  ];

  public readonly codeSnippet: string = `import { Panel } from 'ui-lib-custom/panel';
import { Button } from 'ui-lib-custom/button';
import { ToggleSwitch } from 'ui-lib-custom/toggle-switch';
import { Divider } from 'ui-lib-custom/divider';

@Component({
  standalone: true,
  imports: [Panel, Button, ToggleSwitch, Divider],
  template: \`
    <div class="settings-layout">
      <aside class="settings-nav">
        <button class="settings-nav-item active">Profile</button>
        <button class="settings-nav-item">Notifications</button>
        <button class="settings-nav-item">Security</button>
        <button class="settings-nav-item">Billing</button>
      </aside>
      <main class="settings-content">
        <ui-lib-panel>
          <h3>Profile Settings</h3>
          <!-- inputs, toggle switches, save button -->
          <ui-lib-toggle-switch [(checked)]="emailNotifications" label="Email notifications" />
          <ui-lib-button variant="material" label="Save changes" />
        </ui-lib-panel>
      </main>
    </div>
  \`,
})
export class SettingsPageComponent {
  emailNotifications = signal(true);
}`;

  public setTab(tab: 'profile' | 'notifications' | 'security' | 'billing'): void {
    this.activeTab.set(tab);
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
