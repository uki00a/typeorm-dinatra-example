import { dinatra, typeorm } from "../deps.ts";

export type Response = dinatra.Response;
export type BaseHandler = Parameters<typeof dinatra.get>[1];
export type BaseContext = Parameters<BaseHandler>[0];
export interface Context extends BaseContext {
  connection: typeorm.Connection;
}
export type Handler = ((ctx: Context) => Promise<dinatra.Response>);
