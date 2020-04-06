import { typeorm, dinatra } from "../deps.ts";
import baseORMConfig from "../ormconfig.ts";
import { createApp } from "../web/app.ts";

export function createAPITest(config: typeorm.ConnectionOptions) {
  let app: dinatra.App | undefined;
  function test(description: string, fn: (connnection: typeorm.Connection) => Promise<void>): void {
    Deno.test(description, async () => {
      const connection = await typeorm.createConnection(config);
      if (!app) {
        app = createApp(connection);
      }
      //await app.serve();
      try {
        await fn(connection);
      } finally {
        app.close();
        await connection.close();
      }
    });
  }
  return test;
}

export function createTestingConnectionOptions(override: Partial<typeorm.ConnectionOptions>): typeorm.ConnectionOptions {
  return Object.assign({}, baseORMConfig, override) as typeorm.ConnectionOptions;
}