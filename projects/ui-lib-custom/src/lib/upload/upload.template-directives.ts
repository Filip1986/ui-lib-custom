import { Directive } from '@angular/core';

/**
 * Marks an `<ng-template>` as the custom header slot for `<ui-lib-upload>`.
 * When provided, replaces the default toolbar (Choose / Upload / Cancel buttons).
 *
 * @example
 * ```html
 * <ui-lib-upload>
 *   <ng-template uiUploadHeader>
 *     <div class="my-header">Custom header</div>
 *   </ng-template>
 * </ui-lib-upload>
 * ```
 */
@Directive({ selector: '[uiUploadHeader]', standalone: true })
export class UploadHeaderDirective {}

/**
 * Marks an `<ng-template>` as the custom content slot for `<ui-lib-upload>`.
 * When provided, replaces the entire drop zone and file list area.
 */
@Directive({ selector: '[uiUploadContent]', standalone: true })
export class UploadContentDirective {}

/**
 * Marks an `<ng-template>` as the custom empty-state slot for `<ui-lib-upload>`.
 * When provided, replaces the default "Drag and drop files here" message.
 */
@Directive({ selector: '[uiUploadEmpty]', standalone: true })
export class UploadEmptyDirective {}

/**
 * Marks an `<ng-template>` as a custom file-item template for `<ui-lib-upload>`.
 * The template context exposes `$implicit` (UploadFileItem) and `index` (number).
 *
 * @example
 * ```html
 * <ui-lib-upload>
 *   <ng-template uiUploadFile let-item let-index="index">
 *     <span>{{ item.file.name }}</span>
 *   </ng-template>
 * </ui-lib-upload>
 * ```
 */
@Directive({ selector: '[uiUploadFile]', standalone: true })
export class UploadFileDirective {}
