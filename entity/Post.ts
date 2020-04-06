import type { Category } from "./Category.ts";
export class Post {
  id?: number;
  title!: string;
  text!: string;
  categories!: Category[];

  static create(json: Partial<Post>): Post {
    return new Post(json.id, json.title, json.text, json.categories);
  }

  constructor(id?: number, title?: string, text?: string, categories?: Category[]) {
    this.id = id;
    this.title = title || "";
    this.text = text || "";
    this.categories = categories || [];
  }
}
