import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { deleteUser, IInfoEdit, userInfo, userInfoEdit } from "../../api/user";
import { isAccessToken, isLogin, isRefreshToken } from "../../store/recoil";

const Solid = styled.div`
  border-bottom: 1px solid rgb(209 213 219);
`;

const Solid2 = styled.div`
  border: 1px solid gray;
`;

const Input = styled.input`
  border: 1px solid gray;
`;

const EditMypage = () => {
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [infoEdit, setInfoEdit] = useState(false);
  const accessToken = useRecoilValue(isAccessToken);
  const navigate = useNavigate();
  const isLoginReset = useResetRecoilState(isLogin);
  const isAccessTokenReset = useResetRecoilState(isAccessToken);
  const isRefreshTokenReset = useResetRecoilState(isRefreshToken);

  if (accessToken !== "") {
    userInfo(accessToken).then((res) => {
      const resultCode = res?.data?.data.resultCode;
      if (resultCode === 1) {
        const data = res?.data?.data?.data;
        setName(data?.name);
        setNickName(data?.nickName);
        setEmail(data?.email);
        setPhone(data?.phone);
      }
    });
  }

  const { register, handleSubmit, reset } = useForm<IInfoEdit>();
  const onSubmit = async (data: IInfoEdit) => {
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
    const resultCode = res?.data.data.resultCode;
    if (resultCode === 1) {
      alert("탈퇴되셨습니다");
      isLoginReset();
      isAccessTokenReset();
      isRefreshTokenReset();
      navigate("/home");
    } else if (resultCode === 1031) {
      alert("탈퇴 실패");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-gray-200 h-screen overflow-y-scroll"
    >
      <div className="bg-white rounded-xl my-8 h-fit">
        <Solid className="font-semibold text-xl pb-5 pl-7 py-5">
          회원 정보 수정
        </Solid>
        <div className="flex mt-8 mb-2">
          <div className="flex items-center justify-center w-[72px] h-[72px] rounded-full ml-8 bg-pet_pink">
            <svg
              className="w-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="white"
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
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

export default EditMypage;
