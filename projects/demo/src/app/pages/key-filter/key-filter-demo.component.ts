import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { CodePreviewComponent } from '@demo/shared/components/code-preview/code-preview.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { Card } from 'ui-lib-custom/card';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

type KeyFilterDemoSnippetKey =
  | 'alphanum'
  | 'alpha'
  | 'pint'
  | 'int'
  | 'num'
  | 'hex'
  | 'money'
  | 'email'
  | 'custom'
  | 'bypass';

/**
 * Demo page for the KeyFilter directive, showing all built-in presets,
 * custom RegExp usage, and the bypass toggle.
 */
@Component({
  selector: 'app-key-filter-demo',
  standalone: true,
  imports: [
    FormsModule,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    CodePreviewComponent,
    Card,
    KeyFilterDirective,
  ],
  templateUrl: './key-filter-demo.component.html',
  styleUrl: './key-filter-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyFilterDemoComponent {
  public readonly sections: DocSection[] = [
    { id: 'alphanum', label: 'Alphanumeric' },
    { id: 'alpha', label: 'Alpha' },
    { id: 'pint', label: 'Positive Integer' },
    { id: 'int', label: 'Integer' },
    { id: 'num', label: 'Number' },
    { id: 'hex', label: 'Hexadecimal' },
    { id: 'money', label: 'Money' },
    { id: 'email', label: 'Email' },
    { id: 'custom', label: 'Custom RegExp' },
    { id: 'bypass', label: 'Bypass' },
  ];

  public readonly snippets: Record<KeyFilterDemoSnippetKey, string> = {
    alphanum: '<input [uilibKeyFilter]="\'alphanum\'" placeholder="Alphanumeric only" />',
    alpha: '<input [uilibKeyFilter]="\'alpha\'" placeholder="Letters only" />',
    pint: '<input [uilibKeyFilter]="\'pint\'" placeholder="Positive integers only" />',
    int: '<input [uilibKeyFilter]="\'int\'" placeholder="Integers (with minus sign)" />',
    num: '<input [uilibKeyFilter]="\'num\'" placeholder="Numbers (decimal, minus)" />',
    hex: '<input [uilibKeyFilter]="\'hex\'" placeholder="Hex digits (0-9, a-f)" />',
    money: '<input [uilibKeyFilter]="\'money\'" placeholder="Money (digits, - . ,)" />',
    email: '<input [uilibKeyFilter]="\'email\'" placeholder="Email characters" />',
    custom: '<input [uilibKeyFilter]="vowelPattern" placeholder="Vowels only (a e i o u)" />',
    bypass: [
      '<input',
      '  [uilibKeyFilter]="\'pint\'"',
      '  [keyFilterBypass]="bypassEnabled"',
      '  placeholder="Positive integers (bypass toggleable)"',
      '/>',
    ].join('\n'),
  };

  /** Custom vowel-only filter for the RegExp demo. */
  public readonly vowelPattern: RegExp = /[aeiouAEIOU]/;

  /** Controls the bypass demo toggle. */
  public bypassEnabled: boolean = false;

  public snippet(key: KeyFilterDemoSnippetKey): string {
    return this.snippets[key];
  }
}
