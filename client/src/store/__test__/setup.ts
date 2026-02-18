import { beforeEach } from "vitest";
import "@testing-library/jest-dom";

Object.defineProperty(window, "localStorage", {
  value: {
    store: {} as Record<string, string>,
    getItem(key: string): string | null {
      return this.store[key] || null;
    },
    setItem(key: string, value: string) {
      this.store[key] = String(value);
    },
    removeItem(key: string) {
      delete this.store[key];
    },
    clear() {
      this.store = {};
    },
  } as Partial<Storage>,
  writable: true,
});

beforeEach(() => {
  window.localStorage.clear();
});
