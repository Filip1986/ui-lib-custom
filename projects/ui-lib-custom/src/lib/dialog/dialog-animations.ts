/**
 * Dialog motion parameters used by CSS-based animations.
 */
export type DialogAnimationParams = {
  readonly enterDuration: string;
  readonly easing: string;
  readonly startScale: string;
  readonly startTranslateY: string;
};

/**
 * Backdrop motion parameters used by CSS-based animations.
 */
export type BackdropAnimationParams = {
  readonly enterDuration: string;
  readonly easing: string;
};
