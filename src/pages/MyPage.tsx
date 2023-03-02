import { useState } from "react";
import { useQuery } from "react-query";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { friendRequestList, IFriendRequestList } from "../api/friend";
import { userInfo } from "../api/user";
import { isAccessToken } from "../store/recoil";
import EditMypage from "./EditMypage";
import FriendRequest from "./FriendRequest";

const Solid = styled.div`
  border-bottom: 1px solid rgb(209 213 219);
`;

const Down = styled.svg`
  width: 12px;
  transform: rotate(270deg);
`;

const Bold = styled.div<{ isActive: boolean }>`
  font-weight: ${(props) => (props.isActive ? "600" : "300")};
`;

const MyPage = () => {
  const [name, setName] = useState("");
  const accessToken = useRecoilValue(isAccessToken);
  const myPageMatch = useMatch("/myPage/editMyPage");
  const dogPageMatch = useMatch("/myPage/dogPage");
  const friendPageMatch = useMatch("/myPage/friendPage");

  if (accessToken !== "") {
    userInfo(accessToken).then((res) => {
      const resultCode = res?.data?.data.resultCode;
      if (resultCode === 1) {
        const data = res?.data?.data?.data;
        setName(data?.name);
      }
    });
  }

  const { data } = useQuery<IFriendRequestList>([`editComment`], () =>
    friendRequestList(accessToken)
  );

  return (
    <div className="bg-gray-200 pt-16 flex justify-center px-40 h-screen overflow-y-scroll">
      <div className="mr-10">
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
          <Link to="editMyPage">
            <Solid className="py-4 flex justify-between px-5 cursor-pointer">
              <Bold isActive={myPageMatch !== null}>회원정보 수정</Bold>
              <Down xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </Down>
            </Solid>
          </Link>
          <Link to="/myPage/dogPage">
            <Solid className="py-4 flex justify-between px-5 cursor-pointer">
              <Bold isActive={dogPageMatch !== null}>반려견 정보</Bold>
              <Down xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </Down>
            </Solid>
          </Link>
          <Link to="friendPage">
            <div className="relative py-4 flex justify-between px-5 cursor-pointer">
              <Bold isActive={friendPageMatch !== null}>친구 요청</Bold>
              <Down xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </Down>
              <div className="absolute left-[90px] bg-pet_pink w-4 h-4 text-center rounded-full text-xs text-white font-semibold">
                {data?.data.items && data?.data.items.length}
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-3/5">
        <Routes>
          <Route path="editMyPage" element={<EditMypage />} />
          {/* <Route path="dogPage" element={<DogPage />} /> */}
          <Route path="friendPage" element={<FriendRequest />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyPage;
