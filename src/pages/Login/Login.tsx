import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { emailSignIn, ISignIn } from "../../api/user";
import { isAccessToken, isLogin, isRefreshToken } from "../../store/recoil";
import Swal from "sweetalert2";
import { useEffect } from "react";
import queryParse from "query-string";

const Solid = styled.div`
  border-bottom: 1px solid rgb(203 213 225);
`;

const Login = () => {
  const navigate = useNavigate();
  const setLogin = useSetRecoilState(isLogin);
  const setAccesstoken = useSetRecoilState(isAccessToken);
  const setRefreshtoken = useSetRecoilState(isRefreshToken);
  const goSignUp = () => {
    navigate("/signUp");
  };
  const queryString = useLocation().search;
  useEffect(() => {
    if (queryString) {
      const queryObject: any = queryParse.parse(queryString);
      setLogin(true);
      setAccesstoken(queryObject.accessToken);
      setRefreshtoken(queryObject.refreshToken);
      console.log(queryObject);
      navigate("/");
    }
  });
  const { register, handleSubmit, reset } = useForm<ISignIn>();
  const onSubmit = async (data: ISignIn) => {
    const res = await emailSignIn(data);
    console.log(res);
    const resultCode = res?.data.data.resultCode;
    if (resultCode === 1) {
      reset({
        email: "",
        password: "",
      });
      setLogin(true);
      setAccesstoken(res?.data.data.data.accessToken);
      setRefreshtoken(res?.data.data.data.refreshToken);
      navigate("/");
      Swal.fire({
        position: "center",
        icon: "success",
        iconColor: "rgba(237, 127, 148)",
        title: "로그인 성공",
        showConfirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "rgba(237, 127, 148)",
        timer: 1500,
        width: "30%",
      });
    } else if (resultCode === 1102) {
      Swal.fire({
        position: "center",
        icon: "warning",
        iconColor: "rgba(237, 127, 148)",
        text: "존재하지 않는 계정입니다",
        showConfirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "rgba(237, 127, 148)",
        timer: 1500,
        width: "30%",
      });
    } else if (resultCode === 1103) {
      Swal.fire({
        position: "center",
        icon: "warning",
        iconColor: "rgba(237, 127, 148)",
        text: "비밀번호가 틀렸습니다",
        showConfirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "rgba(237, 127, 148)",
        timer: 1500,
        width: "30%",
      });
      reset({
        password: "",
      });
    } else if (resultCode === 1101) {
      Swal.fire({
        position: "center",
        icon: "warning",
        iconColor: "rgba(237, 127, 148)",
        text: "로그인에 실패하셨습니다",
        showConfirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "rgba(237, 127, 148)",
        timer: 1500,
        width: "30%",
      });
    }
  };

  const kakaoSignIn = () => {
    window.location.href = `${process.env.REACT_APP_PUBLIC_BASE_URL}/v1/api/auth/kakao`;
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-screen flex-col justify-center items-center"
      >
        <div className="flex justify-center font-semibold text-lg py-8">
          이메일 로그인
        </div>
        <Solid className="flex flex-col items-center max-w-[318px] w-full pb-6">
          <article className="w-full flex justify-center">
            <input
              {...register("email")}
              className="bg-gray-200 rounded-lg w-full h-10 pl-3 max-w-[318px] placeholder:text-gray-400 focus:outline-none"
              placeholder="이메일"
            />
          </article>
          <article className="w-full flex justify-center">
            <input
              {...register("password")}
              type="password"
              className="bg-gray-200 rounded-lg w-full h-10 pl-3 max-w-[318px] placeholder:text-gray-400 focus:outline-none my-5"
              placeholder="비밀번호"
            />
          </article>
          <button className="w-full bg-pet_pink max-w-[318px] h-11 rounded-lg text-white flex justify-center items-center font-semibold">
            로그인
          </button>
        </Solid>
        <div className="flex items-center pt-3 mb-8">
          <div className="text-sm">아이디 찾기</div>
          <div className="w-px h-3 mx-2 bg-gray-300" />
          <div className="text-sm">비밀번호 찾기</div>
          <div className="w-px h-3 mx-2 bg-gray-300" />
          <div onClick={goSignUp} className="text-sm cursor-pointer">
            회원가입
          </div>
        </div>
        <div
          onClick={kakaoSignIn}
          className="w-full relative bg-yellow-300 max-w-[318px] h-11 rounded-lg text-black flex justify-center items-center font-semibold cursor-pointer"
        >
          <div className="text-sm">카카오 로그인</div>
        </div>
      </form>
    </div>
  );
};

export default Login;
