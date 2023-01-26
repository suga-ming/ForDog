import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  console.log(infoEdit);
  const myPageMatch = useMatch("/myPage");
  const goMyPage = () => {
    navigate("/myPage");
  };
  const goDogPage = () => {
    navigate("/dogPage");
  };

  return (
    <div className="bg-gray-200 pt-16 flex justify-center px-40 h-screen overflow-y-scroll">
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
              <div className="font-bold">김보영</div>
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
          <div className="w-[72px] h-[72px] rounded-full ml-8 bg-we_pink" />
          <div className="ml-6">
            <div className="flex items-center">
              <div className="text-xl font-semibold">김보영</div>
              <div className="w-[2px] h-5 bg-gray-300 mx-2" />
              <div className="text-base font-semibold">슈가밍</div>
            </div>
            <div className="font-semibold text-gray-600 my-1">이메일</div>
            <div>핸드폰 번호</div>
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
                // value={name}
                className="w-full h-10 rounded-lg pl-2 placeholder:text-sm mb-4"
                placeholder="이름"
              ></Input>
            </div>
            <div className="px-8">
              <div className="mb-2">폰 번호</div>
              <Input
                // value={phone}
                className="w-full h-10 rounded-lg pl-2 placeholder:text-sm mb-4"
                placeholder="폰번호"
              />
            </div>
            <div className="px-8">
              <div className="mb-2">닉네임</div>
              <Input
                // value={gender}
                className="w-full h-10 rounded-lg pl-2 placeholder:text-sm mb-4"
                placeholder="닉네임"
              />
            </div>
            <div className="px-8 mb-8">
              <div className="mb-2">새 비밀번호</div>
              <Input
                type="password"
                className="w-full h-10 rounded-lg pl-2 placeholder:text-sm"
                placeholder="영문자, 숫자, 특수문자로 이루어진 8~20자"
              />
            </div>
          </div>
        ) : null}
        <div className="flex flex-col justify-center items-center px-8">
          <button className="w-full mb-5 bg-pet_pink max-w-[650px] h-11 rounded-lg text-white flex justify-center items-center text-sm font-semibold cursor-pointer">
            변경 정보 저장하기
          </button>
          <div className="w-full mb-10 bg-gray-500 max-w-[650px] h-11 rounded-lg text-white flex justify-center items-center text-sm font-semibold cursor-pointer">
            회원 탈퇴하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
