import { Schema, model, Types, Document } from "mongoose";

export interface IPost extends Document {
  author: Types.ObjectId;
  text: string;
  images: string[];
  visibility: "public" | "private";
  likes: Types.ObjectId[];
  createdAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    images: [{ type: String }],
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default model<IPost>("Post", postSchema);
