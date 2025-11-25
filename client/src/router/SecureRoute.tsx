import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authServices } from "../auth";

interface SecureRouteProps {
  children: ReactNode;
}

const SecureRoute = ({ children }: SecureRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = authServices.isUserLoggedIn();

    if (!loggedIn) {
      setTimeout(() => {
        navigate("/login");
      }, 0);
    } else {
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 0);
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: "45%" }}
        ></div>
      </div>
    );
  }

  return children;
};

export default SecureRoute;
