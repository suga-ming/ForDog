import { BrowserRouter, Routes, Route, useMatch } from "react-router-dom";
import Header from "./components/Header";
import Post from "./components/Post";
import AHome from "./pages/AHome";
import Calender from "./pages/Calender";
import Comunity from "./pages/Comunity";
import DogPage from "./pages/DogPage";
import EditPost from "./pages/EditPost";
import Email from "./pages/Email";
import FriendRequest from "./pages/FriendRequest";
import Home from "./pages/Home";
import Kakao from "./pages/Kakao";
import Login from "./pages/Login";
import LookDog from "./pages/LookDog";
import MyPage from "./pages/MyPage";
import MyProfile from "./pages/MyProfile";
import Rank from "./pages/Rank";
import Record from "./pages/Record";
import SignUp from "./pages/SignUp";
import Spalsh from "./pages/Spalsh";
import WritePost from "./pages/WritePost";
import FriendProfile from "./pages/FriendProfile";

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
        <Route path="/signUp/kakao" element={<Kakao />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/myPage" element={<MyPage />}></Route>
        <Route path="/dogPage" element={<DogPage />}></Route>
        <Route path="/friendPage" element={<FriendRequest />}></Route>
        <Route path="/myProfile" element={<MyProfile />}></Route>
        <Route path="/record" element={<Record />}></Route>
        <Route path="/lookDog" element={<LookDog />}></Route>
        <Route path="/friendProfile" element={<FriendProfile />}></Route>
        <Route path="/comunity" element={<Comunity />}></Route>
        <Route path="/comunity/post" element={<WritePost />}></Route>
        <Route path="/comunity/:boardId" element={<Post />}></Route>
        <Route
          path="/comunity/editPost/:boardId"
          element={<EditPost />}
        ></Route>
        <Route path="/calender" element={<Calender />}></Route>
        <Route path="/rank" element={<Rank />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
