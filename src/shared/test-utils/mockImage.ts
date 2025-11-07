export class MockImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  set src(_v: string) {
    setTimeout(() => {
      if (this.onload) this.onload();
    }, 0);
  }
  set crossOrigin(_v: string) {}
}