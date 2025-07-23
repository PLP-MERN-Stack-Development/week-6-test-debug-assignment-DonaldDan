// setup.js

// Extend Jest with custom matchers from React Testing Library
import '@testing-library/jest-dom/extend-expect';

// Optional: Silence unnecessary warnings (React 18 strict mode, etc.)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      args[0]?.includes('ReactDOM.render is no longer supported in React 18') ||
      args[0]?.includes('You might have more than one copy of React')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

// Optional: Mock common browser APIs not implemented in jsdom
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),  // deprecated
      removeListener: jest.fn(),  // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

// Optional: Global test cleanup (handled automatically by RTL)
afterEach(() => {
  jest.clearAllMocks();
});
