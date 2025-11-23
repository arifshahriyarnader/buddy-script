export interface CreatePostInput {
  text: string;
  images?: string[];
  visibility?: "public" | "private";
}

export interface CreatePostServiceInput {
  author: string;
  text: string;
  images?: string[];
  visibility?: "public" | "private";
}
