import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegistrationPage, LoginPage, FeedPage } from "../pages";
import SecureRoute from "./SecureRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/feed"
          element={
            <SecureRoute>
              <FeedPage />
            </SecureRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
