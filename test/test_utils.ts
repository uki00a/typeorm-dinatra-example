import { typeorm, dinatra } from "../deps.ts";
import baseORMConfig from "../ormconfig.ts";
import { createApp } from "../web/app.ts";

export function createAPITest(config: typeorm.ConnectionOptions) {
  function test(description: string, fn: (connnection: typeorm.Connection) => Promise<void>): void {
    Deno.test(description, async () => {
      const connection = await typeorm.createConnection(config);
      const app = createApp(connection);
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