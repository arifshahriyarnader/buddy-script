export interface PostType {
  _id: string;
  author: {
    firstname: string;
    lastname: string;
  };
  text: string;
  createdAt: string;
}
