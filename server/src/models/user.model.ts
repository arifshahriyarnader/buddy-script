import { Schema, Types, model, Document } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  firtname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firtname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
