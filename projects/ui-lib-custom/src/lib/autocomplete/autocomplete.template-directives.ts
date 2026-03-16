/* eslint-disable jsdoc/require-jsdoc */
import { Directive } from '@angular/core';

@Directive({ selector: '[uiAutoCompleteItem]', standalone: true })
export class AutoCompleteItemDirective {}

@Directive({ selector: '[uiAutoCompleteSelectedItem]', standalone: true })
export class AutoCompleteSelectedItemDirective {}

@Directive({ selector: '[uiAutoCompleteGroup]', standalone: true })
export class AutoCompleteGroupDirective {}

@Directive({ selector: '[uiAutoCompleteHeader]', standalone: true })
export class AutoCompleteHeaderDirective {}

@Directive({ selector: '[uiAutoCompleteFooter]', standalone: true })
export class AutoCompleteFooterDirective {}

@Directive({ selector: '[uiAutoCompleteEmpty]', standalone: true })
export class AutoCompleteEmptyDirective {}

@Directive({ selector: '[uiAutoCompleteLoading]', standalone: true })
export class AutoCompleteLoadingDirective {}

@Directive({ selector: '[uiAutoCompleteDropdownIcon]', standalone: true })
export class AutoCompleteDropdownIconDirective {}

@Directive({ selector: '[uiAutoCompleteRemoveTokenIcon]', standalone: true })
export class AutoCompleteRemoveTokenIconDirective {}
