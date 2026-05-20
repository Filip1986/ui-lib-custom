import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { Panel } from 'ui-lib-custom/panel';
import { Button } from 'ui-lib-custom/button';
import { Divider } from 'ui-lib-custom/divider';
import { Icon } from 'ui-lib-custom/icon';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';

/** Free template: Auth Pages (Login, Register, Forgot Password) using ui-lib-custom. */
@Component({
  selector: 'app-auth-pages-template',
  standalone: true,
  imports: [
    RouterModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    Panel,
    Button,
    Divider,
    Icon,
    CodeSnippet,
  ],
  templateUrl: './auth-pages-template.component.html',
  styleUrl: './auth-pages-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPagesTemplateComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly activeTab: WritableSignal<'login' | 'register' | 'forgot'> = signal<
    'login' | 'register' | 'forgot'
  >('login');

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'preview', label: 'Live Preview' },
    { id: 'usage', label: 'Usage' },
  ];

  public readonly codeSnippet: string = `import { Button } from 'ui-lib-custom/button';
import { Divider } from 'ui-lib-custom/divider';
import { Panel } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Button, Divider, Panel],
  template: \`
    <div class="auth-page">
      <ui-lib-panel class="auth-card">
        <h2>Sign in</h2>
        <div class="auth-field">
          <label for="email">Email</label>
          <input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div class="auth-field">
          <label for="password">Password</label>
          <input id="password" type="password" placeholder="••••••••" />
        </div>
        <ui-lib-button variant="material" label="Sign in" [fluid]="true" />
        <ui-lib-divider label="or" />
        <ui-lib-button variant="minimal" label="Sign in with Google"
          leftIcon="pi pi-google" [fluid]="true" />
      </ui-lib-panel>
    </div>
  \`,
})
export class LoginPageComponent {}`;

  public setTab(tab: 'login' | 'register' | 'forgot'): void {
    this.activeTab.set(tab);
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
