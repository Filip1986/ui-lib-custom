// Semantic icon categories
export type ActionIcon =
  | 'close' | 'menu' | 'search' | 'settings' | 'more'
  | 'add' | 'remove' | 'edit' | 'delete' | 'save'
  | 'refresh' | 'sync' | 'download' | 'upload' | 'share'
  | 'copy' | 'paste' | 'cut' | 'undo' | 'redo';

export type NavigationIcon =
  | 'home' | 'back' | 'forward' | 'up' | 'down'
  | 'chevron-left' | 'chevron-right' | 'chevron-up' | 'chevron-down'
  | 'arrow-left' | 'arrow-right' | 'arrow-up' | 'arrow-down'
  | 'external-link' | 'link';

export type StatusIcon =
  | 'success' | 'error' | 'warning' | 'info'
  | 'check' | 'x' | 'alert' | 'help'
  | 'loading' | 'spinner';

export type ObjectIcon =
  | 'user' | 'users' | 'file' | 'folder' | 'image'
  | 'document' | 'calendar' | 'clock' | 'mail' | 'phone'
  | 'notification' | 'bell' | 'star' | 'heart' | 'bookmark';

export type FormIcon =
  | 'eye' | 'eye-off' | 'lock' | 'unlock'
  | 'checkbox' | 'radio' | 'dropdown';

export type SemanticIcon = ActionIcon | NavigationIcon | StatusIcon | ObjectIcon | FormIcon;

export interface IconMapping {
  [key: string]: string;
}

export const SEMANTIC_ICONS: SemanticIcon[] = [
  'close', 'menu', 'search', 'settings', 'more', 'add', 'remove', 'edit', 'delete', 'save',
  'refresh', 'sync', 'download', 'upload', 'share', 'copy', 'paste', 'cut', 'undo', 'redo',
  'home', 'back', 'forward', 'up', 'down', 'chevron-left', 'chevron-right', 'chevron-up',
  'chevron-down', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'external-link', 'link',
  'success', 'error', 'warning', 'info', 'check', 'x', 'alert', 'help', 'loading', 'spinner',
  'user', 'users', 'file', 'folder', 'image', 'document', 'calendar', 'clock', 'mail', 'phone',
  'notification', 'bell', 'star', 'heart', 'bookmark',
  'eye', 'eye-off', 'lock', 'unlock', 'checkbox', 'radio', 'dropdown',
];
