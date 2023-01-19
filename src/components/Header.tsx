import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLogin } from "../store/recoil";

const Header = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useRecoilState(isLogin);
  const goLogin = () => {
    navigate("/login");
  };
  const goSignUp = () => {
    navigate("/signUp");
  };
  const goHome = () => {
    navigate("/");
  };
  const goMyPage = () => {
    navigate("/myPage");
  };

  return (
    <div className="flex w-full justify-between px-10 py-5 bg-pet_pink fixed">
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
        <svg
          className="w-5 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="white"
            d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM352 256c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zm32 0c0-70.7-57.3-128-128-128s-128 57.3-128 128s57.3 128 128 128s128-57.3 128-128z"
          />
        </svg>
        {login ? (
          <div className="flex items-center font-medium">
            <div onClick={goMyPage} className="cursor-pointer">
              마이페이지
            </div>
            <div className="w-px h-3 mx-2 bg-black" />
            <div onClick={() => setLogin(false)} className="cursor-pointer">
              로그아웃
            </div>
          </div>
        ) : (
          <div className="flex items-center font-medium">
            <div onClick={goLogin} className="cursor-pointer">
              로그인
            </div>
            <div className="w-px h-3 mx-2 bg-black" />
            <div onClick={goSignUp} className="cursor-pointer">
              회원가입
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
