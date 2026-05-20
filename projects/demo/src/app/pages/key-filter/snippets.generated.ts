/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const alphaHtml = `<input [uilibKeyFilter]="'alpha'" placeholder="Letters only" />`;

export const alphaTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './alpha.example.html',
})
export class MyComponent {}`;

export const alphanumHtml = `<input [uilibKeyFilter]="'alphanum'" hintText="Letters and numbers only" placeholder="Enter account ID" />`;

export const alphanumTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './alphanum.example.html',
})
export class MyComponent {}`;

export const bypassHtml = `<input
  [uilibKeyFilter]="'pint'"
  [keyFilterBypass]="bypassEnabled"
  placeholder="Positive integers (bypass toggleable)"
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

export const customHtml = `<input [uilibKeyFilter]="vowelPattern" placeholder="Vowels only (a e i o u)" />`;

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

export const emailHtml = `<input [uilibKeyFilter]="'email'" placeholder="Email characters" />`;

export const emailTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './email.example.html',
})
export class MyComponent {}`;

export const hexHtml = `<input [uilibKeyFilter]="'hex'" placeholder="Hex digits (0-9, a-f)" />`;

export const hexTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './hex.example.html',
})
export class MyComponent {}`;

export const intHtml = `<input [uilibKeyFilter]="'int'" placeholder="Integers (with minus sign)" />`;

export const intTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './int.example.html',
})
export class MyComponent {}`;

export const moneyHtml = `<input [uilibKeyFilter]="'money'" placeholder="Money (digits, - . ,)" />`;

export const moneyTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './money.example.html',
})
export class MyComponent {}`;

export const numHtml = `<input [uilibKeyFilter]="'num'" placeholder="Numbers (decimal, minus)" />`;

export const numTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './num.example.html',
})
export class MyComponent {}`;

export const pintHtml = `<input [uilibKeyFilter]="'pint'" placeholder="Positive integers only" />`;

export const pintTs = `import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './pint.example.html',
})
export class MyComponent {}`;
