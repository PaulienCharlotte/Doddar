/// <reference types="vite/client" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly API_KEY: string;
    }
}

declare const process: {
    env: NodeJS.ProcessEnv;
};
