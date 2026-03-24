import { DANGEROUS_ATTRIBUTES, DANGEROUS_TAGS } from './editor.constants';

function canUseDomParser(): boolean {
  return typeof DOMParser !== 'undefined';
}

function removeDangerousElements(container: HTMLElement): void {
  DANGEROUS_TAGS.forEach((tagName: string): void => {
    const elements: NodeListOf<Element> = container.querySelectorAll(tagName);
    elements.forEach((element: Element): void => {
      element.remove();
    });
  });
}

function isDangerousUrlAttribute(attributeName: string, attributeValue: string): boolean {
  const urlAttributeNames: readonly string[] = ['href', 'src', 'xlink:href', 'formaction'] as const;
  if (!urlAttributeNames.includes(attributeName)) {
    return false;
  }

  const normalizedValue: string = attributeValue.replace(/\s+/g, '').toLowerCase();
  return (
    normalizedValue.startsWith('javascript:') ||
    normalizedValue.startsWith('vbscript:') ||
    normalizedValue.startsWith('data:text/html')
  );
}

function shouldRemoveAttribute(attributeName: string, attributeValue: string): boolean {
  const normalizedName: string = attributeName.toLowerCase();

  if (normalizedName.startsWith('on')) {
    return true;
  }

  if (DANGEROUS_ATTRIBUTES.includes(normalizedName)) {
    return true;
  }

  return isDangerousUrlAttribute(normalizedName, attributeValue);
}

function removeDangerousAttributes(container: HTMLElement): void {
  const allElements: Element[] = [container, ...Array.from(container.querySelectorAll('*'))];

  allElements.forEach((element: Element): void => {
    const attributes: Attr[] = Array.from(element.attributes);
    attributes.forEach((attribute: Attr): void => {
      if (shouldRemoveAttribute(attribute.name, attribute.value)) {
        element.removeAttribute(attribute.name);
      }
    });
  });
}

/**
 * Sanitize an HTML string by removing dangerous tags and attributes.
 * Used to clean pasted content before inserting into the editor.
 */
export function sanitizeHtml(html: string): string {
  if (!html) {
    return '';
  }

  if (!canUseDomParser()) {
    return html;
  }

  const parser: DOMParser = new DOMParser();
  const parsedDocument: Document = parser.parseFromString(html, 'text/html');
  const container: HTMLElement = parsedDocument.body;

  removeDangerousElements(container);
  removeDangerousAttributes(container);

  return container.innerHTML;
}

/**
 * Strip all HTML tags, returning only plain text.
 * Used for plain-text paste mode.
 */
export function stripHtmlTags(html: string): string {
  if (!html) {
    return '';
  }

  if (!canUseDomParser()) {
    return html;
  }

  const parser: DOMParser = new DOMParser();
  const parsedDocument: Document = parser.parseFromString(html, 'text/html');
  return parsedDocument.body.textContent;
}
