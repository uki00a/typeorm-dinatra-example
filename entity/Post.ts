import type { Category } from "./Category.ts";
export class Post {
  id?: number;
  title!: string;
  text!: string;
  categories!: Category[];
}
