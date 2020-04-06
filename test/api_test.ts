import { assertStrictEq } from "../test_deps.ts";
import { createAPITest, createTestingConnectionOptions } from "./test_utils.ts";
import * as generate from "./generate.ts";

const port = 8080;
const testAPI = createAPITest(createTestingConnectionOptions({
  name: "testing",
  type: "sqlite",
  database: ":memory:",
  synchronize: true
}));

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
