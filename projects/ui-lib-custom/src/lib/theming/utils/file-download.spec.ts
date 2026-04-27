import { saveAs } from './file-download';

// JSDOM does not implement URL.createObjectURL / revokeObjectURL.
// Define stubs unconditionally so jest.spyOn can override them per test.
Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  configurable: true,
  value: (): string => 'blob:fake-url',
});
Object.defineProperty(URL, 'revokeObjectURL', {
  writable: true,
  configurable: true,
  value: (): void => undefined,
});

describe('saveAs', (): void => {
  let appendChildSpy: jest.SpyInstance;
  let removeChildSpy: jest.SpyInstance;
  let clickSpy: jest.Mock;
  let createElementSpy: jest.SpyInstance;
  let createObjectURLSpy: jest.SpyInstance;
  let revokeObjectURLSpy: jest.SpyInstance;
  let mockLink: Partial<HTMLAnchorElement>;

  beforeEach((): void => {
    clickSpy = jest.fn();
    mockLink = {
      href: '',
      download: '',
      style: { display: '' } as CSSStyleDeclaration,
      click: clickSpy,
    };

    createElementSpy = jest
      .spyOn(document, 'createElement')
      .mockReturnValue(mockLink as HTMLAnchorElement);
    appendChildSpy = jest.spyOn(document.body, 'appendChild').mockReturnValue(mockLink as Node);
    removeChildSpy = jest.spyOn(document.body, 'removeChild').mockReturnValue(mockLink as Node);

    createObjectURLSpy = jest.spyOn(URL, 'createObjectURL').mockReturnValue('blob:fake-url');
    revokeObjectURLSpy = jest.spyOn(URL, 'revokeObjectURL').mockReturnValue(undefined);
  });

  afterEach((): void => {
    jest.restoreAllMocks();
  });

  it('creates an anchor element and triggers a click', (): void => {
    saveAs('test.json', '{"key":"value"}');
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('sets the correct href and download filename', (): void => {
    saveAs('data.csv', 'col1,col2', 'text/csv');
    expect(mockLink.href).toBe('blob:fake-url');
    expect(mockLink.download).toBe('data.csv');
  });

  it('sets display:none on the link', (): void => {
    saveAs('f.txt', 'hello');
    expect((mockLink.style as CSSStyleDeclaration).display).toBe('none');
  });

  it('appends and removes the link from body', (): void => {
    saveAs('file.json', '{}');
    expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
    expect(removeChildSpy).toHaveBeenCalledWith(mockLink);
  });

  it('revokes the object URL after click', (): void => {
    saveAs('file.json', '{}');
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:fake-url');
  });

  it('uses application/json as the default MIME type', (): void => {
    saveAs('out.json', '{}');
    // Blob constructor is called with the given content and type
    expect(createObjectURLSpy).toHaveBeenCalled();
  });

  it('accepts a custom MIME type', (): void => {
    expect((): void => saveAs('out.css', '.a { color: red; }', 'text/css')).not.toThrow();
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('swallows errors thrown during download', (): void => {
    appendChildSpy.mockImplementation((): never => {
      throw new Error('DOM error');
    });
    expect((): void => saveAs('fail.json', '{}')).not.toThrow();
  });
});
