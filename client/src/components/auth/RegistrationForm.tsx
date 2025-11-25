import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import type { RegistrationFormData } from "../../auth/authTypes";
import { useState } from "react";
import { authServices } from "../../auth";

const RegistrationForm = () => {
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
      repeatPassword: formData.repeatPassword,
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
  return (
    <div>
      <div className="absolute top-0 left-0 w-40 h-40 bg-purple-300 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute bottom-10 right-0 w-56 h-56 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 relative z-10">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </div>

        <p className="text-center text-gray-600 mb-1">Get Started Now</p>
        <h2 className="text-2xl font-semibold text-center mb-8">
          Registration
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <input
              type="text"
              name="honeypot"
              value={honeypot}
              onChange={handleChange}
              className="hidden"
              autoComplete="off"
            />
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-purple-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-purple-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-purple-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-purple-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Repeat Password
            </label>
            <input
              type="password"
              name="repeatPassword"
              placeholder="Password"
              value={formData.repeatPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-purple-200 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" className="h-4 w-4" />
            <span className="text-sm text-gray-600">
              I agree to terms & conditions
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1890FF] hover:bg-[#1479d6] text-white cursor-pointer rounded-lg py-2 mt-4 font-medium transition"
          >
            Register Now
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
