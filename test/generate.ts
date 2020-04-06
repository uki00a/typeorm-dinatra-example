import { Post } from "../entity/Post.ts";

export function post({
  id,
  text = "text",
  title = "title"
}: Partial<{
  id: number,
  text: string,
  title: string
}>): Post {
  const post = new Post();
  post.id = id;
  post.text = text;
  post.title = title;
  return post;
}

