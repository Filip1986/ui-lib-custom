import type { SpeedDialDirection, SpeedDialType } from './speed-dial.types';

export interface SpeedDialLayoutOptions {
  readonly type: SpeedDialType;
  readonly direction: SpeedDialDirection;
  readonly radius: number;
  readonly count: number;
}

export interface SpeedDialItemPosition {
  readonly transform: string;
}

export function computeSpeedDialLayout(
  options: SpeedDialLayoutOptions
): readonly SpeedDialItemPosition[] {
  if (options.count <= 0) {
    return [];
  }

  if (options.count === 1) {
    return [{ transform: 'translate(0px, 0px)' }];
  }

  if (options.type === 'linear') {
    return Array.from({ length: options.count }, (): SpeedDialItemPosition => ({ transform: '' }));
  }

  const radius: number = Number.isFinite(options.radius) ? options.radius : 0;

  if (options.type === 'circle') {
    return computeCircle(radius, options.count);
  }

  if (options.type === 'semi-circle') {
    return computeSemiCircle(radius, options.count, options.direction);
  }

  return computeQuarterCircle(radius, options.count, options.direction);
}

function computeCircle(radius: number, count: number): readonly SpeedDialItemPosition[] {
  const step: number = (2 * Math.PI) / count;
  return Array.from({ length: count }, (_value: unknown, index: number): SpeedDialItemPosition => {
    const angle: number = step * index;
    return {
      transform: translateFromAngle(radius, angle),
    };
  });
}

function computeSemiCircle(
  radius: number,
  count: number,
  direction: SpeedDialDirection
): readonly SpeedDialItemPosition[] {
  const step: number = Math.PI / (count - 1);
  const startAngle: number = semiCircleStartAngle(direction);

  return Array.from({ length: count }, (_value: unknown, index: number): SpeedDialItemPosition => {
    const angle: number = startAngle + step * index;
    return {
      transform: translateFromAngle(radius, angle),
    };
  });
}

function computeQuarterCircle(
  radius: number,
  count: number,
  direction: SpeedDialDirection
): readonly SpeedDialItemPosition[] {
  const step: number = Math.PI / 2 / (count - 1);
  const startAngle: number = quarterCircleStartAngle(direction);

  return Array.from({ length: count }, (_value: unknown, index: number): SpeedDialItemPosition => {
    const angle: number = startAngle + step * index;
    return {
      transform: translateFromAngle(radius, angle),
    };
  });
}

function semiCircleStartAngle(direction: SpeedDialDirection): number {
  if (direction === 'down') {
    return 0;
  }
  if (direction === 'left') {
    return Math.PI / 2;
  }
  if (direction === 'right') {
    return -Math.PI / 2;
  }
  return Math.PI;
}

function quarterCircleStartAngle(direction: SpeedDialDirection): number {
  if (direction === 'up-right') {
    return (3 * Math.PI) / 2;
  }
  if (direction === 'down-left') {
    return Math.PI / 2;
  }
  if (direction === 'down-right') {
    return 0;
  }
  return Math.PI;
}

function translateFromAngle(radius: number, angle: number): string {
  const x: number = radius * Math.cos(angle);
  const y: number = radius * Math.sin(angle);
  return `translate(${x}px, ${y}px)`;
}
