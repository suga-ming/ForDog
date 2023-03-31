import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { isAccessToken, isLogin, isRefreshToken } from "../store/recoil";
import { useState } from "react";
import styled from "styled-components";
import { myProfile } from "../api/user";
import Swal from "sweetalert2";

const Solid = styled.div`
  border-bottom: 1px solid rgb(156 163 175);
`;

const Solid2 = styled.div`
  border: 1px solid rgb(156 163 175);
`;

const Header = () => {
  const navigate = useNavigate();
  const [login] = useRecoilState(isLogin);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
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
    navigate("/");
    setModal(false);
  };
  const goMyPage = () => {
    navigate("/myPage/editMyPage");
    setModal(false);
  };
  const goLogOut = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      iconColor: "rgba(237, 127, 148)",
      title: "로그아웃 성공",
      showConfirmButton: true,
      confirmButtonText: "확인",
      confirmButtonColor: "rgba(237, 127, 148)",
      width: "30%",
    });
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

  if (accessToken !== "") {
    myProfile(accessToken).then((res) => {
      const resultCode = res?.resultCode;
      if (resultCode === 1) {
        const data = res?.data;
        setName(data?.nickName);
        setImage(data?.image);
      }
    });
  }
  return (
    <>
      {login ? (
        <div className="flex w-full justify-between items-center px-10 py-3 bg-pet_pink fixed z-50">
          <div onClick={goHome} className="font-bold cursor-pointer">
            ForDog
          </div>
          <div className="flex">
            <div className="relative flex items-center font-medium">
              <div
                onClick={() => setModal(!modal)}
                className="flex mr-5 cursor-pointer text-lg"
              >
                <div className="mr-1 font-semibold">{name}</div>
                <div className="mr-1 font-medium">님</div>
                <svg
                  className="w-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                </svg>
              </div>
              {image ? (
                <img
                  src={image}
                  alt={image}
                  onClick={goMyProfile}
                  className="w-10 rounded-full cursor-pointer"
                />
              ) : (
                <div
                  onClick={goMyProfile}
                  className="w-10 h-10 rounded-full cursor-pointer bg-white flex items-center justify-center"
                >
                  <svg
                    className="w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="rgba(237, 127, 148)"
                      d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
                    />
                  </svg>
                </div>
              )}
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
