import { dinatra } from "../../deps.ts";
import type { Context, Response } from "../types.ts";
import { Post } from "../../entity/Post.ts";

const { contentType } = dinatra;

export async function getPost(ctx: Context): Promise<Response> {
  const postRepository = ctx.connection.getRepository(Post);
  const post = await postRepository.findOne(ctx.params.id);
  return post ? [200, JSON.stringify(post)] : [404, ""];
}

export async function createPost(ctx: Context): Promise<Response> {
  const postRepository = ctx.connection.getRepository(Post);
  const post = Post.create(ctx.params)
  await postRepository.save(post);
  return [201, contentType("json"), String(post.id)];
}