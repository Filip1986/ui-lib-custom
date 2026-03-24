import { sanitizeHtml, stripHtmlTags } from './editor-sanitizer';

describe('editor-sanitizer', (): void => {
  describe('sanitizeHtml', (): void => {
    it('strips script tags and their content', (): void => {
      const input: string = '<p>safe</p><script>alert(1)</script><p>after</p>';
      const output: string = sanitizeHtml(input);

      expect(output).toContain('<p>safe</p>');
      expect(output).toContain('<p>after</p>');
      expect(output).not.toContain('<script');
      expect(output).not.toContain('alert(1)');
    });

    it('strips iframe, object, and embed tags', (): void => {
      const input: string =
        '<p>safe</p><iframe src="x"></iframe><object></object><embed src="x" />';
      const output: string = sanitizeHtml(input);

      expect(output).toContain('<p>safe</p>');
      expect(output).not.toContain('<iframe');
      expect(output).not.toContain('<object');
      expect(output).not.toContain('<embed');
    });

    it('strips form-related tags', (): void => {
      const input: string =
        '<p>safe</p><form><input /><textarea>x</textarea><select><option>1</option></select><button>go</button></form>';
      const output: string = sanitizeHtml(input);

      expect(output).toContain('<p>safe</p>');
      expect(output).not.toContain('<form');
      expect(output).not.toContain('<input');
      expect(output).not.toContain('<textarea');
      expect(output).not.toContain('<select');
      expect(output).not.toContain('<button');
    });

    it('strips style and link tags', (): void => {
      const input: string =
        '<style>.x{color:red}</style><link rel="stylesheet" href="x"><p>safe</p>';
      const output: string = sanitizeHtml(input);

      expect(output).toContain('<p>safe</p>');
      expect(output).not.toContain('<style');
      expect(output).not.toContain('<link');
    });

    it('removes on* event handler attributes', (): void => {
      const input: string =
        '<img src="ok.png" onload="x()" onerror="x()"><p onclick="x()">safe</p>';
      const output: string = sanitizeHtml(input);

      expect(output).toContain('<img src="ok.png">');
      expect(output).toContain('<p>safe</p>');
      expect(output).not.toContain('onclick=');
      expect(output).not.toContain('onload=');
      expect(output).not.toContain('onerror=');
    });

    it('preserves safe tags', (): void => {
      const input: string =
        '<p><strong>a</strong><em>b</em><a href="/x">c</a></p><ul><li>1</li></ul><h1>h</h1><h6>h6</h6><br><img src="x.png">';
      const output: string = sanitizeHtml(input);

      expect(output).toContain('<p><strong>a</strong><em>b</em><a href="/x">c</a></p>');
      expect(output).toContain('<ul><li>1</li></ul>');
      expect(output).toContain('<h1>h</h1>');
      expect(output).toContain('<h6>h6</h6>');
      expect(output).toContain('<br>');
      expect(output).toContain('<img src="x.png">');
    });

    it('preserves href on anchors and src on images', (): void => {
      const input: string =
        '<a href="https://example.com">go</a><img src="https://example.com/a.png">';
      const output: string = sanitizeHtml(input);

      expect(output).toContain('href="https://example.com"');
      expect(output).toContain('src="https://example.com/a.png"');
    });

    it('strips javascript protocol from href and src', (): void => {
      const input: string =
        '<a href="javascript:alert(1)">x</a><img src="javascript:alert(1)"><img src=" data:text/html;base64,AAA">';
      const output: string = sanitizeHtml(input);

      expect(output).toContain('<a>x</a>');
      expect(output).toContain('<img>');
      expect(output).not.toContain('javascript:');
      expect(output).not.toContain('data:text/html');
    });

    it('handles empty string input', (): void => {
      expect(sanitizeHtml('')).toBe('');
    });

    it('handles plain text input', (): void => {
      expect(sanitizeHtml('just text')).toBe('just text');
    });

    it('handles nested dangerous tags', (): void => {
      const input: string = '<p>safe<script><iframe src="x"></iframe>alert(1)</script>done</p>';
      const output: string = sanitizeHtml(input);

      expect(output).toBe('<p>safedone</p>');
    });
  });

  describe('stripHtmlTags', (): void => {
    it('returns plain text from html', (): void => {
      const input: string = '<p>Hello <strong>World</strong></p>';
      expect(stripHtmlTags(input)).toBe('Hello World');
    });

    it('preserves text content from nested elements', (): void => {
      const input: string =
        '<div><h2>Title</h2><p>One <em>Two</em> <a href="/">Three</a></p></div>';
      expect(stripHtmlTags(input)).toBe('TitleOne Two Three');
    });

    it('handles empty string', (): void => {
      expect(stripHtmlTags('')).toBe('');
    });
  });
});
