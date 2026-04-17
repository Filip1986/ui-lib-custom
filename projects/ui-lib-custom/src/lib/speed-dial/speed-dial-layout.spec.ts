import { computeSpeedDialLayout } from './speed-dial-layout';
import type { SpeedDialItemPosition } from './speed-dial-layout';
import type { SpeedDialDirection, SpeedDialType } from './speed-dial.types';

function getCoordinates(transform: string): { x: number; y: number } {
  const match: RegExpMatchArray | null = transform.match(
    /^translate\(([-\d.eE]+)px, ([-\d.eE]+)px\)$/
  );
  expect(match).not.toBeNull();

  return {
    x: Number(match?.[1] ?? 0),
    y: Number(match?.[2] ?? 0),
  };
}

describe('computeSpeedDialLayout', (): void => {
  describe('linear', (): void => {
    const directions: readonly SpeedDialDirection[] = [
      'up',
      'down',
      'left',
      'right',
      'up-left',
      'up-right',
      'down-left',
      'down-right',
    ];

    it.each(directions)(
      'returns empty transforms for direction %s',
      (direction: SpeedDialDirection): void => {
        const layout: readonly SpeedDialItemPosition[] = computeSpeedDialLayout({
          type: 'linear',
          direction,
          radius: 50,
          count: 5,
        });

        expect(layout).toHaveLength(5);
        layout.forEach((position: { readonly transform: string }): void => {
          expect(position.transform).toBe('');
        });
      }
    );
  });

  it('returns expected circle coordinates for count=4 radius=50', (): void => {
    const layout: readonly SpeedDialItemPosition[] = computeSpeedDialLayout({
      type: 'circle',
      direction: 'up',
      radius: 50,
      count: 4,
    });

    expect(layout).toHaveLength(4);

    const p0: { x: number; y: number } = getCoordinates(layout[0]?.transform ?? '');
    const p1: { x: number; y: number } = getCoordinates(layout[1]?.transform ?? '');
    const p2: { x: number; y: number } = getCoordinates(layout[2]?.transform ?? '');
    const p3: { x: number; y: number } = getCoordinates(layout[3]?.transform ?? '');

    expect(p0.x).toBeCloseTo(50, 5);
    expect(p0.y).toBeCloseTo(0, 5);

    expect(p1.x).toBeCloseTo(0, 5);
    expect(p1.y).toBeCloseTo(50, 5);

    expect(p2.x).toBeCloseTo(-50, 5);
    expect(p2.y).toBeCloseTo(0, 5);

    expect(p3.x).toBeCloseTo(0, 5);
    expect(p3.y).toBeCloseTo(-50, 5);
  });

  describe('semi-circle boundaries', (): void => {
    const cases: readonly {
      readonly direction: SpeedDialDirection;
      readonly first: { readonly x: number; readonly y: number };
      readonly last: { readonly x: number; readonly y: number };
    }[] = [
      { direction: 'up', first: { x: -10, y: 0 }, last: { x: 10, y: 0 } },
      { direction: 'down', first: { x: 10, y: 0 }, last: { x: -10, y: 0 } },
      { direction: 'left', first: { x: 0, y: 10 }, last: { x: 0, y: -10 } },
      { direction: 'right', first: { x: 0, y: -10 }, last: { x: 0, y: 10 } },
    ];

    it.each(cases)(
      'matches start/end for %s',
      (testCase: {
        readonly direction: SpeedDialDirection;
        readonly first: { readonly x: number; readonly y: number };
        readonly last: { readonly x: number; readonly y: number };
      }): void => {
        const layout: readonly SpeedDialItemPosition[] = computeSpeedDialLayout({
          type: 'semi-circle',
          direction: testCase.direction,
          radius: 10,
          count: 3,
        });

        const first: { x: number; y: number } = getCoordinates(layout[0]?.transform ?? '');
        const last: { x: number; y: number } = getCoordinates(
          layout[layout.length - 1]?.transform ?? ''
        );

        expect(first.x).toBeCloseTo(testCase.first.x, 5);
        expect(first.y).toBeCloseTo(testCase.first.y, 5);
        expect(last.x).toBeCloseTo(testCase.last.x, 5);
        expect(last.y).toBeCloseTo(testCase.last.y, 5);
      }
    );
  });

  describe('quarter-circle boundaries', (): void => {
    const cases: readonly {
      readonly direction: SpeedDialDirection;
      readonly first: { readonly x: number; readonly y: number };
      readonly last: { readonly x: number; readonly y: number };
    }[] = [
      { direction: 'up-left', first: { x: -20, y: 0 }, last: { x: 0, y: -20 } },
      { direction: 'up-right', first: { x: 0, y: -20 }, last: { x: 20, y: 0 } },
      { direction: 'down-left', first: { x: 0, y: 20 }, last: { x: -20, y: 0 } },
      { direction: 'down-right', first: { x: 20, y: 0 }, last: { x: 0, y: 20 } },
    ];

    it.each(cases)(
      'matches start/end for %s',
      (testCase: {
        readonly direction: SpeedDialDirection;
        readonly first: { readonly x: number; readonly y: number };
        readonly last: { readonly x: number; readonly y: number };
      }): void => {
        const layout: readonly SpeedDialItemPosition[] = computeSpeedDialLayout({
          type: 'quarter-circle',
          direction: testCase.direction,
          radius: 20,
          count: 3,
        });

        const first: { x: number; y: number } = getCoordinates(layout[0]?.transform ?? '');
        const last: { x: number; y: number } = getCoordinates(
          layout[layout.length - 1]?.transform ?? ''
        );

        expect(first.x).toBeCloseTo(testCase.first.x, 5);
        expect(first.y).toBeCloseTo(testCase.first.y, 5);
        expect(last.x).toBeCloseTo(testCase.last.x, 5);
        expect(last.y).toBeCloseTo(testCase.last.y, 5);
      }
    );
  });

  it('returns empty array for count=0', (): void => {
    const layout: readonly SpeedDialItemPosition[] = computeSpeedDialLayout({
      type: 'circle',
      direction: 'up',
      radius: 20,
      count: 0,
    });

    expect(layout).toEqual([]);
  });

  it('returns one zero-offset entry for count=1', (): void => {
    const types: readonly SpeedDialType[] = ['linear', 'circle', 'semi-circle', 'quarter-circle'];

    types.forEach((type: SpeedDialType): void => {
      const layout: readonly SpeedDialItemPosition[] = computeSpeedDialLayout({
        type,
        direction: 'up',
        radius: 20,
        count: 1,
      });

      expect(layout).toHaveLength(1);
      expect(layout[0]?.transform).toBe('translate(0px, 0px)');
    });
  });

  it('keeps negative radius behavior (no abs normalization)', (): void => {
    const layout: readonly SpeedDialItemPosition[] = computeSpeedDialLayout({
      type: 'circle',
      direction: 'up',
      radius: -10,
      count: 2,
    });

    const first: { x: number; y: number } = getCoordinates(layout[0]?.transform ?? '');
    const second: { x: number; y: number } = getCoordinates(layout[1]?.transform ?? '');

    expect(first.x).toBeCloseTo(-10, 5);
    expect(first.y).toBeCloseTo(0, 5);
    expect(second.x).toBeCloseTo(10, 5);
    expect(second.y).toBeCloseTo(0, 5);
  });
});
