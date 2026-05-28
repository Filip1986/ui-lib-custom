export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarShape = 'circle' | 'square';
export type AvatarVariant = 'material' | 'bootstrap' | 'minimal';

/**
 * Template context for the `#fallback` slot — rendered when no image, label, or icon is set.
 *
 * @example
 * ```html
 * <ui-lib-avatar>
 *   <ng-template #fallback let-size="size">
 *     <mat-icon [class]="'avatar-icon--' + size">person</mat-icon>
 *   </ng-template>
 * </ui-lib-avatar>
 * ```
 */
export interface AvatarFallbackContext {
  /** Current size token of the avatar. */
  size: AvatarSize;
  /** Current shape token of the avatar. */
  shape: AvatarShape;
  /** Current resolved visual variant. */
  variant: AvatarVariant;
}
