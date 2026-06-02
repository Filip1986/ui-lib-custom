import type { Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Avatar } from 'ui-lib-custom/avatar';
import { AvatarGroup } from 'ui-lib-custom/avatar';
import { Badge } from 'ui-lib-custom/badge';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Divider } from 'ui-lib-custom/divider';
import { Panel } from 'ui-lib-custom/panel';
import { Tag } from 'ui-lib-custom/tag';

import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';

interface TeamMember {
  initials: string;
  name: string;
  role: string;
  department: string;
  status: 'online' | 'away' | 'offline';
}

/** Free template: Team directory and user profile page. */
@Component({
  selector: 'app-team-profile-template',
  standalone: true,
  imports: [
    RouterModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    Panel,
    Button,
    Badge,
    Tag,
    Avatar,
    AvatarGroup,
    Divider,
    CodeSnippet,
  ],
  templateUrl: './team-profile-template.component.html',
  styleUrl: './team-profile-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamProfileTemplateComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'profile', label: 'User Profile' },
    { id: 'team', label: 'Team Directory' },
    { id: 'usage', label: 'Usage' },
  ];

  public readonly teamMembers: TeamMember[] = [
    {
      initials: 'JD',
      name: 'Jane Doe',
      role: 'Product Designer',
      department: 'Design',
      status: 'online',
    },
    {
      initials: 'MS',
      name: 'Mark Smith',
      role: 'Frontend Engineer',
      department: 'Engineering',
      status: 'online',
    },
    {
      initials: 'AL',
      name: 'Alice Lee',
      role: 'Backend Engineer',
      department: 'Engineering',
      status: 'away',
    },
    {
      initials: 'BM',
      name: 'Bob Martin',
      role: 'Data Scientist',
      department: 'Analytics',
      status: 'offline',
    },
    {
      initials: 'CK',
      name: 'Carol Kim',
      role: 'Product Manager',
      department: 'Product',
      status: 'online',
    },
    {
      initials: 'DW',
      name: 'David Wang',
      role: 'DevOps Engineer',
      department: 'Engineering',
      status: 'away',
    },
  ];

  public readonly skills: string[] = [
    'Angular',
    'TypeScript',
    'Figma',
    'Design Systems',
    'Accessibility',
    'CSS',
  ];

  public readonly codeSnippet: string = `import { Avatar, AvatarGroup } from 'ui-lib-custom/avatar';
import { Badge } from 'ui-lib-custom/badge';
import { Tag } from 'ui-lib-custom/tag';
import { Panel } from 'ui-lib-custom/panel';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [Avatar, AvatarGroup, Badge, Tag, Panel, Button],
  template: \`
    <!-- Profile card -->
    <ui-lib-panel class="profile-card">
      <ui-lib-avatar label="JD" shape="circle" size="xlarge" />
      <h2>Jane Doe</h2>
      <p>Product Designer</p>
      <ui-lib-badge value="Online" severity="success" />
      <ui-lib-button label="Send message" />
    </ui-lib-panel>

    <!-- Team grid -->
    @for (member of team; track member.name) {
      <ui-lib-panel class="member-card">
        <ui-lib-avatar [label]="member.initials" shape="circle" />
        <strong>{{ member.name }}</strong>
        <ui-lib-tag [value]="member.department" />
      </ui-lib-panel>
    }
  \`,
})
export class TeamProfileComponent {}`;

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
