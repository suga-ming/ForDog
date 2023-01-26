import { BrowserRouter, Routes, Route, useMatch } from "react-router-dom";
import Header from "./components/Header";
import AHome from "./pages/AHome";
import Calender from "./pages/Calender";
import Comunity from "./pages/Comunity";
import Dog from "./pages/Dog";
import DogPage from "./pages/DogPage";
import Email from "./pages/Email";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Rank from "./pages/Rank";
import SignUp from "./pages/SignUp";
import Spalsh from "./pages/Spalsh";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Spalsh />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/aHome" element={<AHome />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/signUp/email" element={<Email />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/myPage" element={<MyPage />}></Route>
        <Route path="/dogPage" element={<DogPage />}></Route>
        <Route path="/comunity" element={<Comunity />}></Route>
        <Route path="/calender" element={<Calender />}></Route>
        <Route path="/rank" element={<Rank />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
