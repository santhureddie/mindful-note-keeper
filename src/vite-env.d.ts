
/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly [key: string]: string | undefined;
    readonly VITE_BASE_PATH: string | undefined;
    readonly BASE_URL: string;
    readonly MODE: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly SSR: boolean;
  };
}
