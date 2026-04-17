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

export const SPEED_DIAL_CLASSNAMES: Readonly<{
  Host: string;
  List: string;
  Item: string;
  Action: string;
  Mask: string;
  Open: string;
  Type: Readonly<{
    Linear: string;
    Circle: string;
    SemiCircle: string;
    QuarterCircle: string;
  }>;
  Direction: Readonly<{
    Up: string;
    Down: string;
    Left: string;
    Right: string;
    UpLeft: string;
    UpRight: string;
    DownLeft: string;
    DownRight: string;
  }>;
}> = {
  Host: 'ui-lib-speed-dial',
  List: 'ui-lib-speed-dial__list',
  Item: 'ui-lib-speed-dial__item',
  Action: 'ui-lib-speed-dial__action',
  Mask: 'ui-lib-speed-dial__mask',
  Open: 'ui-lib-speed-dial--open',
  Type: {
    Linear: 'ui-lib-speed-dial--type-linear',
    Circle: 'ui-lib-speed-dial--type-circle',
    SemiCircle: 'ui-lib-speed-dial--type-semi-circle',
    QuarterCircle: 'ui-lib-speed-dial--type-quarter-circle',
  },
  Direction: {
    Up: 'ui-lib-speed-dial--direction-up',
    Down: 'ui-lib-speed-dial--direction-down',
    Left: 'ui-lib-speed-dial--direction-left',
    Right: 'ui-lib-speed-dial--direction-right',
    UpLeft: 'ui-lib-speed-dial--direction-up-left',
    UpRight: 'ui-lib-speed-dial--direction-up-right',
    DownLeft: 'ui-lib-speed-dial--direction-down-left',
    DownRight: 'ui-lib-speed-dial--direction-down-right',
  },
} as const;

export const SPEED_DIAL_IDS: Readonly<{
  Prefix: string;
  speedDialId: (counter: number) => string;
}> = {
  Prefix: 'ui-lib-speed-dial',
  speedDialId: (counter: number): string => `ui-lib-speed-dial-${counter}`,
} as const;
