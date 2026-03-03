export function saveAs(filename: string, content: string, type: string = 'application/json'): void {
  try {
    const blob: Blob = new Blob([content], { type });
    const url: string = URL.createObjectURL(blob);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch {
    // swallow download errors in restricted environments
  }
}
