interface ImportMetaEnv {
  readonly VITE_WEBSOCKET_URL: string;
  readonly VITE_SIGNIN_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
