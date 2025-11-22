import bcrypt from "bcryptjs";
import { User } from "../models";
import { SignUpRequestBody } from "../types";

export const signupService = async (data: SignUpRequestBody) => {
  const { firstname, lastname, email, password } = data;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  await user.save();
  return user;
};
