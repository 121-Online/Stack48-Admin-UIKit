import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});

class ResizeObserverStub implements ResizeObserver {
  private readonly callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element): void {
    const rect = target.getBoundingClientRect();
    this.callback(
      [
        {
          target,
          contentRect: rect,
          borderBoxSize: [],
          contentBoxSize: [],
          devicePixelContentBoxSize: [],
        },
      ],
      this,
    );
  }

  unobserve(): void {}
  disconnect(): void {}
}

if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = ResizeObserverStub;
}

function box(width: number, height: number): DOMRect {
  return {
    width,
    height,
    top: 0,
    left: 0,
    bottom: height,
    right: width,
    x: 0,
    y: 0,
    toJSON() {
      return this;
    },
  };
}

HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect() {
  return box(800, 400);
};

Object.defineProperties(HTMLElement.prototype, {
  offsetWidth: {
    configurable: true,
    get() {
      return 800;
    },
  },
  offsetHeight: {
    configurable: true,
    get() {
      return 400;
    },
  },
  clientWidth: {
    configurable: true,
    get() {
      return 800;
    },
  },
  clientHeight: {
    configurable: true,
    get() {
      return 400;
    },
  },
});
