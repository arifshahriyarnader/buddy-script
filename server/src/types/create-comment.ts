export interface CreateCommentInput {
  postId: string;
  author: string;
  text: string;
  parentId?: string;
}
