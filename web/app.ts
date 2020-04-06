import { dinatra, typeorm } from "../deps.ts";
import * as posts from "./handlers/post.ts";
import type { Handler, BaseHandler, BaseContext } from "./types.ts";

export function createApp(connection: typeorm.Connection): dinatra.App {
  const {
    app,
    get,
    post
  } = dinatra;

  return app(
    get("/posts", createHandler(posts.getPost, connection)),
    post("/posts", createHandler(posts.createPost, connection))
  );
}

function createHandler(handler: Handler, connection: typeorm.Connection): BaseHandler {
  return (ctx: BaseContext) => handler({ ...ctx, connection });
}

