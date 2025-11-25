import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginData, LoginFormData } from "../auth/authTypes";
import { authServices } from "../auth";

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login form submitted", formData);
    const payload: LoginData = {
      type: "email",
      email: formData.email,
      password: formData.password,
    };
    try {
      const authUser = await authServices.login(payload);
      console.log("Login successful:", authUser);
      navigate("/feed");
    } catch (error) {
      console.error(error);
      alert("Login failed, please try again");
    }
  };
  return { formData, handleChange, handleSubmit };
};
