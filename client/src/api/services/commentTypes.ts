export interface CreateCommentType{
    postId: string;
    text: string;

}

export interface UpdateCommentType{
    commentId: string;
    text?: string;
    
}