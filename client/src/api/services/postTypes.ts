export interface CreatePostType {
  text: string;
  images?: string[];
  visibility?: "public" | "private";
}

export interface UpdatePostType {
  text?: string;
  images?: string[];
  visibility?: "public" | "private";
}

export interface deletePostType{
    postId: string;
}
