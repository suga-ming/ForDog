import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  deleteUser,
  InfoEditInterface,
  userInfo,
  userInfoEdit,
  UserInfoInterface,
} from "../api/user";
import { isAccessToken, isLogin, isRefreshToken } from "../store/recoil";

const Solid = styled.div`
  border-bottom: 1px solid rgb(209 213 219);
`;

const Solid2 = styled.div`
  border: 1px solid gray;
`;

const Input = styled.input`
  border: 1px solid gray;
`;

const Down = styled.svg`
  width: 12px;
  transform: rotate(270deg);
`;

const Bold = styled.div<{ isActive: boolean }>`
  font-weight: ${(props) => (props.isActive ? "600" : "300")};
`;

const MyPage = () => {
  const navigate = useNavigate();
  const [infoEdit, setInfoEdit] = useState(false);
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const accessToken = useRecoilValue(isAccessToken);
  const isLoginReset = useResetRecoilState(isLogin);
  const isAccessTokenReset = useResetRecoilState(isAccessToken);
  const isRefreshTokenReset = useResetRecoilState(isRefreshToken);
  const myPageMatch = useMatch("/myPage");
  const goMyPage = () => {
    navigate("/myPage");
  };
  const goDogPage = () => {
    navigate("/dogPage");
  };

  if (accessToken !== "") {
    userInfo(accessToken).then((res) => {
      const resultCode = res?.data?.data.resultCode;
      if (resultCode == 1) {
        const data = res?.data?.data?.data;
        setName(data?.name);
        setNickName(data?.nickName);
        setEmail(data?.email);
        setPhone(data?.phone);
      }
    });
  }

  const { register, handleSubmit, reset } = useForm<InfoEditInterface>();
  const onSubmit = async (data: InfoEditInterface) => {
    console.log("data", data);
    const res = await userInfoEdit(data, accessToken);
    const resultCode = res?.data.data.resultCode;
    if (resultCode === 1) {
      setName("name");
      setNickName("nickName");
      setPhone("phone");
      alert("정보 수정 완료");
      reset({
        name: "",
        nickName: "",
        phone: "",
        password: "",
      });
    } else if (resultCode === 1021) alert("정보 수정 실패");
  };

  const deleteInfo = async (accessToken: string) => {
    const res = await deleteUser(accessToken);
    console.log(res);
    const resultCode = res?.data.data.resultCode;
    if (resultCode == 1) {
      alert("탈퇴되셨습니다");
      isLoginReset();
      isAccessTokenReset();
      isRefreshTokenReset();
      navigate("/home");
    } else if (resultCode == 1031) {
      alert("탈퇴 실패");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-200 pt-16 flex justify-center px-40 h-screen overflow-y-scroll"
    >
      <div className="w-5/1 mr-10">
        <div className="bg-pet_pink h-20  my-8 flex justify-center items-center px-7 rounded-xl">
          <svg
            className="w-7 mr-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="white"
              d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z"
            />
          </svg>
          <div className="text-white">
            <div className="font-semibold mb-1">안녕하세요.</div>
            <div className="flex">
              <div className="font-bold">{name}</div>
              <div className="font-medium">님</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg">
          <Solid
            onClick={goMyPage}
            className="py-4 flex justify-between px-5 cursor-pointer"
          >
            <Bold isActive={myPageMatch !== null}>회원정보 수정</Bold>
            <Down xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </Down>
          </Solid>
          <div
            onClick={goDogPage}
            className="py-4 flex justify-between px-5 cursor-pointer"
          >
            <div>반려견 정보</div>
            <Down xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </Down>
          </div>
        </div>
      </div>
      <div className="w-3/5 bg-white rounded-xl my-8 h-fit">
        <Solid className="font-semibold text-xl pb-5 pl-7 py-5">
          회원 정보 수정
        </Solid>
        <div className="flex mt-8 mb-5">
          <div className="flex items-center justify-center w-[72px] h-[72px] rounded-full ml-8 bg-pet_pink">
            <svg
              className="w-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="white"
                d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
              />
            </svg>
          </div>
          <div className="ml-6">
            <div className="flex items-center">
              <div className="text-xl font-semibold">{name}</div>
              <div className="w-[2px] h-5 bg-gray-300 mx-2" />
              <div className="text-base font-semibold">{nickName}</div>
            </div>
            <div className="font-semibold text-gray-600 my-1">{email}</div>
            <div>{phone}</div>
          </div>
        </div>
        <div className="flex justify-center items-center px-8">
          <Solid2 className="w-full mb-3 h-11 rounded-lg  max-w-[650px] flex justify-center items-center text-sm font-medium">
            휴대전화 인증으로 개인 정보 수정/입력
          </Solid2>
        </div>
        <span
          onClick={() => setInfoEdit(!infoEdit)}
          className="flex items-center pt-4 ml-8 mb-5 text-sm text-gray-600 cursor-pointer"
        >
          <div>개인정보 수정하기</div>
          <svg
            className="w-3 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="rgb(107 114 128)"
              d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
            />
          </svg>
        </span>
        {infoEdit ? (
          <div>
            <div className="px-8">
              <div className="mb-2">이름</div>
              <Input
                {...register("name")}
                className="w-full h-10 rounded-lg pl-2 placeholder:text-sm mb-4"
                placeholder={name}
              ></Input>
            </div>
            <div className="px-8">
              <div className="mb-2">폰 번호</div>
              <Input
                {...register("phone")}
                className="w-full h-10 rounded-lg pl-2 placeholder:text-sm mb-4"
                placeholder={phone}
              />
            </div>
            <div className="px-8">
              <div className="mb-2">닉네임</div>
              <Input
                {...register("nickName")}
                className="w-full h-10 rounded-lg pl-2 placeholder:text-sm mb-4"
                placeholder={nickName}
              />
            </div>
            <div className="px-8 mb-8">
              <div className="mb-2">새 비밀번호</div>
              <Input
                {...register("password")}
                type="password"
                className="w-full h-10 rounded-lg pl-2 placeholder:text-sm"
                placeholder="새로운 비밀번호를 입력해주세요."
              />
            </div>
          </div>
        ) : null}
        <div className="flex flex-col justify-center items-center px-8">
          <button className="w-full mb-5 bg-pet_pink max-w-[650px] h-11 rounded-lg text-white flex justify-center items-center text-sm font-semibold cursor-pointer">
            변경 정보 저장하기
          </button>
          <div
            onClick={() => deleteInfo(accessToken)}
            className="w-full mb-10 bg-gray-500 max-w-[650px] h-11 rounded-lg text-white flex justify-center items-center text-sm font-semibold cursor-pointer"
          >
            회원 탈퇴하기
          </div>
        </div>
      </div>
    </form>
  );
};

export default MyPage;
