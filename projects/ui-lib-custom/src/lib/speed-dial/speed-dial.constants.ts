import type {
  SpeedDialDirection,
  SpeedDialSize,
  SpeedDialType,
  SpeedDialVariant,
} from './speed-dial.types';

export const SPEED_DIAL_DEFAULTS: Readonly<{
  type: SpeedDialType;
  direction: SpeedDialDirection;
  radius: number;
  transitionDelay: number;
  mask: boolean;
  hideOnClickOutside: boolean;
  rotateAnimation: boolean;
  variant: SpeedDialVariant;
  size: SpeedDialSize;
  showIcon: string;
  hideIcon: string;
}> = {
  type: 'linear',
  direction: 'up',
  radius: 0,
  transitionDelay: 30,
  mask: false,
  hideOnClickOutside: true,
  rotateAnimation: true,
  variant: 'material',
  size: 'md',
  showIcon: 'plus',
  hideIcon: 'times',
} as const;

export const SPEED_DIAL_IDS: Readonly<{
  Prefix: string;
  speedDialId: (counter: number) => string;
}> = {
  Prefix: 'ui-lib-speed-dial',
  speedDialId: (counter: number): string => `ui-lib-speed-dial-${counter}`,
} as const;
