export interface CreateCommentType {
  postId: string;
  text: string;
  parentId?: string;
}

export interface CommentType {
  _id: string;
  author: {
    firstname: string;
    lastname: string;
  };
  text: string;
  parentId?: string;
  createdAt: string;
  replies: CommentType[];   
}
