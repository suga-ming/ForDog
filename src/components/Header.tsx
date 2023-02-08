import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { isAccessToken, isLogin, isRefreshToken } from "../store/recoil";
import dane from "../assets/단.png";
import { useState } from "react";
import styled from "styled-components";

const Solid = styled.div`
  border-bottom: 1px solid rgb(156 163 175);
`;

const Solid2 = styled.div`
  border: 1px solid rgb(156 163 175);
`;

const Header = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useRecoilState(isLogin);
  const [modal, setModal] = useState(false);
  const accessToken = useRecoilValue(isAccessToken);
  const isLoginReset = useResetRecoilState(isLogin);
  const isAccessTokenReset = useResetRecoilState(isAccessToken);
  const isRefreshTokenReset = useResetRecoilState(isRefreshToken);

  const goLogin = () => {
    navigate("/login");
    setModal(false);
  };
  const goSignUp = () => {
    navigate("/signUp");
    setModal(false);
  };
  const goHome = () => {
    navigate("/home");
    setModal(false);
  };
  const goMyPage = () => {
    navigate("/myPage");
    setModal(false);
  };
  const goLogOut = () => {
    setModal(false);
    isLoginReset();
    isAccessTokenReset();
    isRefreshTokenReset();
    navigate("/home");
  };
  const goMyProfile = () => {
    navigate("/myProfile");
    setModal(false);
  };

  console.log(modal);

  return (
    <>
      {login ? (
        <div className="flex w-full justify-between items-center px-10 py-3 bg-pet_pink fixed z-50">
          <div onClick={goHome} className="font-bold cursor-pointer">
            ForDog
          </div>
          {/* <div className="flex font-semibold">
            <div className="px-5">자랑하기</div>
            <div className="px-5">커뮤니티</div>
            <div className="px-5">캘린더</div>
            <div className="px-5">랭킹</div>
          </div> */}
          <div className="flex">
            <div className="relative flex items-center font-medium">
              <div
                onClick={() => setModal(!modal)}
                className="flex mr-5 cursor-pointer text-lg"
              >
                <div className="mr-1 font-semibold">보영쨩</div>
                <div className="mr-1 font-medium">님</div>
                <svg
                  className="w-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                </svg>
              </div>
              <img
                src={dane}
                onClick={goMyProfile}
                className="w-10 rounded-full cursor-pointer"
              />
              {modal ? (
                <Solid2 className="absolute top-10 left-0 text-sm bg-white text-center rounded-lg">
                  <Solid
                    onClick={goMyPage}
                    className="py-3 px-3 cursor-pointer"
                  >
                    마이페이지
                  </Solid>
                  <div onClick={goLogOut} className="py-3 px-3 cursor-pointer">
                    로그아웃
                  </div>
                </Solid2>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-between items-center px-10 py-6 bg-pet_pink fixed z-50">
          <div onClick={goHome} className="font-bold cursor-pointer">
            ForDog
          </div>
          {/* <div className="flex font-semibold">
            <div className="px-5">자랑하기</div>
            <div className="px-5">커뮤니티</div>
            <div className="px-5">캘린더</div>
            <div className="px-5">랭킹</div>
          </div> */}
          <div className="flex">
            <div className="flex items-center font-medium">
              <div onClick={goLogin} className="cursor-pointer">
                로그인
              </div>
              <div className="w-px h-3 mx-2 bg-black" />
              <div onClick={goSignUp} className="cursor-pointer">
                회원가입
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
