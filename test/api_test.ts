import { assertStrictEq } from "../test_deps.ts";
import { createAPITest, createTestingConnectionOptions } from "./test_utils.ts";
import * as generate from "./generate.ts";
import { Post } from "../entity/Post.ts";
import { assertEquals } from "https://deno.land/std@v0.39.0/testing/asserts.ts";
const port = 8080;
const testAPI = createAPITest(createTestingConnectionOptions({
  name: "testing",
  type: "sqlite",
  database: ":memory:",
  synchronize: true
}));

testAPI("GET /posts/:id", async connection => {
  const post = generate.post({ text: "hoge", title: "piyo" });
  const postRepository = connection.getRepository(Post);
  await postRepository.save(post);

  const response = await fetch(`http://localhost:${port}/posts/${post.id}`);
  const json = await response.json();
  assertStrictEq(response.status, 200);
  assertEquals(json, post);
});

testAPI("POST /posts", async connection => {
  const post = generate.post({ text: "foo", title: "bar" });
  const response = await fetch(`http://localhost:${port}/posts`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: { "Content-Type": "text/json" }
  });
  const json = await response.json();
  assertStrictEq(response.status, 201);
  assertStrictEq(typeof json, "number", "should return an id");
});
