import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Calender from "./pages/Calender";
import Comunity from "./pages/Comunity";
import Dog from "./pages/Dog";
import Email from "./pages/Email";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Rank from "./pages/Rank";
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
        <Route path="/dog" element={<Dog />}></Route>
        <Route path="/comunity" element={<Comunity />}></Route>
        <Route path="/calender" element={<Calender />}></Route>
        <Route path="/rank" element={<Rank />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
