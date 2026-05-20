import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { Panel } from 'ui-lib-custom/panel';
import { Button } from 'ui-lib-custom/button';
import { Badge } from 'ui-lib-custom/badge';
import { Avatar } from 'ui-lib-custom/avatar';
import { Icon } from 'ui-lib-custom/icon';
import { Tag } from 'ui-lib-custom/tag';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';

/** Free template: App Shell layout using the ui-lib-custom component library. */
@Component({
  selector: 'app-app-shell-template',
  standalone: true,
  imports: [
    RouterModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    Panel,
    Button,
    Badge,
    Avatar,
    Icon,
    Tag,
    CodeSnippet,
  ],
  templateUrl: './app-shell-template.component.html',
  styleUrl: './app-shell-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellTemplateComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'preview', label: 'Live Preview' },
    { id: 'usage', label: 'Usage' },
  ];

  public readonly codeSnippet: string = `import { Panel } from 'ui-lib-custom/panel';
import { Button } from 'ui-lib-custom/button';
import { Avatar } from 'ui-lib-custom/avatar';
import { Badge } from 'ui-lib-custom/badge';
import { Icon } from 'ui-lib-custom/icon';

@Component({
  standalone: true,
  imports: [Panel, Button, Avatar, Badge, Icon],
  template: \`
    <div class="app-shell">
      <!-- Top bar -->
      <header class="app-topbar">
        <span class="app-logo">MyApp</span>
        <ui-lib-avatar label="JD" shape="circle" />
      </header>
      <!-- Body -->
      <div class="app-body">
        <nav class="app-sidebar">...</nav>
        <main class="app-main">
          <ui-lib-panel>
            <h2>Dashboard</h2>
          </ui-lib-panel>
        </main>
      </div>
    </div>
  \`,
})
export class AppShellComponent {}`;

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
