import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { ScrollPanel } from 'ui-lib-custom/scroll-panel';
import type { ScrollPanelVariant } from 'ui-lib-custom/scroll-panel';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';

/**
 * Demo page for the ScrollPanel component.
 */
@Component({
  selector: 'app-scroll-panel-demo',
  standalone: true,
  imports: [CodeSnippet, ScrollPanel, Button],
  templateUrl: './scroll-panel-demo.component.html',
  styleUrl: './scroll-panel-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollPanelDemoComponent {
  public readonly importCode: string = "import { ScrollPanel } from 'ui-lib-custom/scroll-panel'";

  public readonly activeVariant: WritableSignal<ScrollPanelVariant> =
    signal<ScrollPanelVariant>('material');

  public readonly variants: ScrollPanelVariant[] = ['material', 'bootstrap', 'minimal'];

  public readonly longParagraphs: string[] = [
    'Angular is a platform and framework for building single-page client applications using HTML and TypeScript. Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your applications.',
    'The architecture of an Angular application relies on certain fundamental concepts. The basic building blocks of the Angular framework are Angular components that are organized into NgModules.',
    'Components define views, which are sets of screen elements that Angular can choose among and modify according to your program logic and data. Components use services, which provide specific functionality not directly related to views.',
    'Angular provides a framework for building interactive single-page applications that run in the browser. Applications built with Angular are fast, responsive, and can work on mobile, web, and desktop platforms.',
    "Dependency injection lets you keep your component classes lean and efficient. They don't fetch data from the server, validate user input, or log directly to the console; they delegate such tasks to services.",
    'A module is a coherent block of code dedicated to an application domain, a workflow, or a closely related set of capabilities. Each module can contain components, service providers, and other code files whose scope is defined by the containing NgModule.',
  ];

  public readonly imageItems: { label: string; color: string }[] = [
    { label: 'Ocean Blue', color: '#0ea5e9' },
    { label: 'Forest Green', color: '#22c55e' },
    { label: 'Sunset Orange', color: '#f97316' },
    { label: 'Royal Purple', color: '#a855f7' },
    { label: 'Rose Red', color: '#f43f5e' },
    { label: 'Golden Yellow', color: '#eab308' },
    { label: 'Teal Cyan', color: '#14b8a6' },
    { label: 'Indigo', color: '#6366f1' },
  ];

  public setVariant(variant: ScrollPanelVariant): void {
    this.activeVariant.set(variant);
  }
}
