/** CSS class prefix applied by Timeline host and internal elements. */
export const TIMELINE_CSS_CLASS_PREFIX: 'ui-lib-timeline' = 'ui-lib-timeline';
/** Default configuration values for the Timeline component. */
export const TIMELINE_DEFAULTS: Readonly<{
  layout: 'vertical';
  align: 'left';
  size: 'md';
  ariaLabel: 'Timeline';
}> = {
  layout: 'vertical',
  align: 'left',
  size: 'md',
  ariaLabel: 'Timeline',
} as const;
