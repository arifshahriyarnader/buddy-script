import { useState } from "react";
import { authServices } from "../auth";
import { useNavigate } from "react-router-dom";
import type { RegistrationFormData } from "../auth/authTypes";

export const useRegistrationForm = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [honeypot, setHoneypot] = useState<string>("");
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "honeypot") {
      setHoneypot(e.target.value);
      return;
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      console.log("Bot detected!");
      return;
    }
    if (!isValidEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!isValidPassword(formData.password)) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    if (formData.password !== formData.repeatPassword) {
      alert("Passwords do not match.");
      return;
    }
    const payload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      // repeatPassword: formData.repeatPassword,
    };
    try {
      await authServices.registration(payload);
      alert("Registration successful! Now you can log in.");
      setTimeout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };
  return { formData, honeypot, handleChange, handleSubmit };
};
