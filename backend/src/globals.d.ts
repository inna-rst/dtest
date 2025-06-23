import { ProcessEnv } from '@types/node';

declare global {
  var process: NodeJS.Process & { env: ProcessEnv };
}

export {};