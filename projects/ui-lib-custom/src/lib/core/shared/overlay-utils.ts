export const OVERLAY_APPEND_TARGETS: {
  readonly Body: 'body';
  readonly Self: 'self';
} = {
  Body: 'body',
  Self: 'self',
} as const;

export type OverlayAppendTarget = string | HTMLElement | null | undefined;

const OVERLAY_Z_INDEX_ATTRIBUTE: 'data-uilib-overlay-z-index' = 'data-uilib-overlay-z-index';
let overlayZIndexCounter: number = 1000;

export function resolveOverlayAppendTarget(
  appendTarget: OverlayAppendTarget,
  documentRef: Document
): HTMLElement | null {
  if (appendTarget === undefined || appendTarget === null) {
    return null;
  }

  if (appendTarget instanceof HTMLElement) {
    return appendTarget;
  }

  const normalizedTarget: string = appendTarget.trim();
  if (!normalizedTarget || normalizedTarget === OVERLAY_APPEND_TARGETS.Self) {
    return null;
  }

  if (normalizedTarget === OVERLAY_APPEND_TARGETS.Body) {
    return documentRef.body;
  }

  return documentRef.querySelector<HTMLElement>(normalizedTarget);
}

export function claimOverlayZIndex(panel: HTMLElement, baseZIndex: number = 1000): number {
  overlayZIndexCounter = Math.max(overlayZIndexCounter, baseZIndex) + 1;
  panel.style.setProperty('z-index', `${overlayZIndexCounter}`);
  panel.setAttribute(OVERLAY_Z_INDEX_ATTRIBUTE, `${overlayZIndexCounter}`);
  return overlayZIndexCounter;
}

export function releaseOverlayZIndex(panel: HTMLElement): void {
  panel.style.removeProperty('z-index');
  panel.removeAttribute(OVERLAY_Z_INDEX_ATTRIBUTE);
}
