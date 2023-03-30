import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Post from "./pages/Comunity/Post";
import AHome from "./pages/Home/AHome";
import Calendar from "./pages/Calender/Calendar";
import Comunity from "./pages/Comunity/Comunity";
import DogPage from "./pages/MyPage/DogPage";
import EditPost from "./pages/Comunity/EditPost";
import Email from "./pages/Login/Email";
import FriendRequest from "./pages/MyPage/FriendRequest";
import Home from "./pages/Home/Home";
import Kakao from "./pages/Login/Kakao";
import Login from "./pages/Login/Login";
import LookDog from "./pages/Look/LookDog";
import MyPage from "./pages/MyPage/MyPage";
import MyProfile from "./pages/MyPage/MyProfile";
import Record from "./pages/Record/Record";
import SignUp from "./pages/Login/SignUp";
import WritePost from "./pages/Comunity/WritePost";
import FriendProfile from "./pages/Look/FriendProfile";
import Spalsh from "./pages/Home/Splash";
import { useRecoilState } from "recoil";
import { isLogin } from "./store/recoil";

const Router = () => {
  const [login] = useRecoilState(isLogin);
  const PrivateRecord = () => {
    return login ? <Record /> : <Navigate to="/login" />;
  };
  const PrivateMyPage = () => {
    return login ? <MyPage /> : <Navigate to="/login" />;
  };
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
        <Route path="/myPage/*" element={<MyPage />}></Route>
        <Route path="/mypage/dogPage" element={<DogPage />}></Route>
        <Route path="/friendPage" element={<FriendRequest />}></Route>
        <Route path="/myProfile" element={<MyProfile />}></Route>
        <Route path="/record" element={<PrivateRecord />}></Route>
        <Route path="/lookDog" element={<LookDog />}></Route>
        <Route path="/friendProfile" element={<FriendProfile />}></Route>
        <Route path="/comunity" element={<Comunity />}></Route>
        <Route path="/comunity/post" element={<WritePost />}></Route>
        <Route path="/comunity/:boardId" element={<Post />}></Route>
        <Route
          path="/comunity/editPost/:boardId"
          element={<EditPost />}
        ></Route>
        <Route path="/calendar" element={<Calendar />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
