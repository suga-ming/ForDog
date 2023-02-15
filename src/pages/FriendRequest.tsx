import React, { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  friendRequestAccept,
  friendRequestList,
  FriendRequestListInterface,
} from "../api/user";
import { isAccessToken } from "../store/recoil";

const Solid = styled.div`
  border-bottom: 1px solid rgb(209 213 219);
`;

const BoxImg = styled.img`
  width: 25%;
  &::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
`;

const BoxDiv = styled.div`
  width: 25%;
  &::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
`;

const Down = styled.svg`
  width: 12px;
  transform: rotate(270deg);
`;

const Bold = styled.div<{ isActive: boolean }>`
  font-weight: ${(props) => (props.isActive ? "600" : "300")};
`;

const FriendRequest = () => {
  const navigate = useNavigate();
  const [infoEdit, setInfoEdit] = useState(false);
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const accessToken = useRecoilValue(isAccessToken);
  //   const isLoginReset = useResetRecoilState(isLogin);
  //   const isAccessTokenReset = useResetRecoilState(isAccessToken);
  //   const isRefreshTokenReset = useResetRecoilState(isRefreshToken);
  const myPageMatch = useMatch("/friendPage");
  const goMyPage = () => {
    navigate("/myPage");
  };
  const goDogPage = () => {
    navigate("/dogPage");
  };
  const goFriend = () => {
    navigate("/friendPage");
  };

  const { isLoading, data } = useQuery<FriendRequestListInterface>(
    [`editComment`],
    () => friendRequestList(accessToken)
  );

  const requestAccept = async (friendId: number) => {
    console.log("ck", friendId);
    const res = await friendRequestAccept(friendId, accessToken);
    const resultCode = res?.data.data.resultCode;
    if (resultCode === 1) {
      alert("수락되었습니다.");
    }
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
            <div>회원정보 수정</div>
            <Down xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </Down>
          </Solid>
          <Solid
            onClick={goDogPage}
            className="py-4 flex justify-between px-5 cursor-pointer"
          >
            <div>반려견 정보</div>
            <Down xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </Down>
          </Solid>
          <div
            onClick={goFriend}
            className="py-4 flex justify-between px-5 cursor-pointer"
          >
            <Bold isActive={myPageMatch !== null}>친구 요청</Bold>
            <Down xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </Down>
          </div>
        </div>
      </div>
      <div className="w-3/5 bg-white rounded-xl my-8 h-fit">
        <Solid className="font-semibold text-xl pb-5 pl-7 py-5">
          친구 요청
        </Solid>
        {data?.data.items.map((r) => (
          <div className="flex justify-between items-center w-full mt-8 mb-5 px-8">
            <div className="w-1/2 flex items-center">
              {r.image ? (
                <BoxImg
                  src={r.image}
                  className="flex items-center justify-center rounded-full"
                />
              ) : (
                <BoxDiv className="flex items-center justify-center rounded-full bg-pet_pink">
                  <svg
                    className="w-2/5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="white"
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                    />
                  </svg>
                </BoxDiv>
              )}
              <div className="ml-6 text-xl font-semibold">{r.nickName}</div>
            </div>
            <div
              onClick={() => requestAccept(r.friendId)}
              className="w-1/5 mr-3 bg-pet_pink h-9 rounded-lg text-white flex justify-center items-center text-sm font-semibold cursor-pointer"
            >
              수락
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequest;
