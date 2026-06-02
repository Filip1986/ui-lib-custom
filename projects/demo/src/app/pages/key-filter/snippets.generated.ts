/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const alphaHtml = `<input placeholder="Letters only" [uilibKeyFilter]="'alpha'" />`;

export const alphaTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './alpha.example.html',
})
export class MyComponent {}`;

export const alphanumHtml = `<input
  hintText="Letters and numbers only"
  placeholder="Enter account ID"
  [uilibKeyFilter]="'alphanum'"
/>`;

export const alphanumTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './alphanum.example.html',
})
export class MyComponent {}`;

export const bypassHtml = `<input
  placeholder="Positive integers (bypass toggleable)"
  [keyFilterBypass]="bypassEnabled"
  [uilibKeyFilter]="'pint'"
/>`;

export const bypassTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './bypass.example.html',
})
export class MyComponent {
  public bypassEnabled: boolean = false;
}`;

export const customHtml = `<input placeholder="Vowels only (a e i o u)" [uilibKeyFilter]="vowelPattern" />`;

export const customTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './custom.example.html',
})
export class MyComponent {
  public readonly vowelPattern: RegExp = /[aeiouAEIOU]/;
}`;

export const emailHtml = `<input placeholder="Email characters" [uilibKeyFilter]="'email'" />`;

export const emailTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './email.example.html',
})
export class MyComponent {}`;

export const hexHtml = `<input placeholder="Hex digits (0-9, a-f)" [uilibKeyFilter]="'hex'" />`;

export const hexTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './hex.example.html',
})
export class MyComponent {}`;

export const intHtml = `<input placeholder="Integers (with minus sign)" [uilibKeyFilter]="'int'" />`;

export const intTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './int.example.html',
})
export class MyComponent {}`;

export const moneyHtml = `<input placeholder="Money (digits, - . ,)" [uilibKeyFilter]="'money'" />`;

export const moneyTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './money.example.html',
})
export class MyComponent {}`;

export const numHtml = `<input placeholder="Numbers (decimal, minus)" [uilibKeyFilter]="'num'" />`;

export const numTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './num.example.html',
})
export class MyComponent {}`;

export const pintHtml = `<input placeholder="Positive integers only" [uilibKeyFilter]="'pint'" />`;

export const pintTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './pint.example.html',
})
export class MyComponent {}`;
