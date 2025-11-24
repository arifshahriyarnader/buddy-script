import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegistrationPage, LoginPage } from "../pages";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
