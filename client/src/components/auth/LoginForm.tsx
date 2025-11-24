import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

const LoginForm = () => {
  return (
    <div>
      <div className="absolute top-0 left-0 w-40 h-40 bg-purple-300 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute bottom-10 right-0 w-56 h-56 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 relative z-10">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </div>

        <p className="text-center text-gray-600 mb-1">Get Started Now</p>
        <h2 className="text-2xl font-semibold text-center mb-8">Login</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-purple-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-purple-200 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1890FF] hover:bg-[#1479d6] text-white cursor-pointer rounded-lg py-2 mt-4 font-medium transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/" className="text-purple-600 hover:underline font-medium">
            Registration
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
