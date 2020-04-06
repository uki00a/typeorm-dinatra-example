import { typeorm } from "../../deps.ts";
import { Post } from "../../entity/Post.ts";

export default new typeorm.EntitySchema<Post>({
  target: Post,
  name: "posts",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    title: {
      type: "text",
      nullable: false
    },
    text: {
      type: "text",
      nullable: false
    }
  }
});
