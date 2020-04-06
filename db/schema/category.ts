import { typeorm } from "../../deps.ts";
import { Category } from "../../entity/Category.ts";

export default new typeorm.EntitySchema<Category>({
  target: Category,
  name: "categories",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    name: {
      type: "text",
      nullable: false
    }
  }
});
