import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Email from "./pages/Email";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import SignUp from "./pages/SignUp";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/signUp/email" element={<Email />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/myPage" element={<MyPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
