import { useQuery } from "react-query";
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

const FriendRequest = () => {
  const accessToken = useRecoilValue(isAccessToken);

  const { isLoading, data } = useQuery<FriendRequestListInterface>(
    [`editComment`],
    () => friendRequestList(accessToken)
  );

  const requestAccept = async (friendId: number) => {
    const res = await friendRequestAccept(friendId, accessToken);
    const resultCode = res?.data.data.resultCode;
    if (resultCode === 1) {
      alert("수락되었습니다.");
    }
  };

  return (
    <div className="w-full bg-gray-200 flex justify-center h-screen overflow-y-scroll">
      <div className="bg-white rounded-xl my-8 h-fit">
        <Solid className="font-semibold text-xl pb-5 pl-7 py-5">
          친구 요청
        </Solid>
        {isLoading ? (
          <div>is Loading...</div>
        ) : (
          <>
            {data?.data.items && !data?.data.items.length ? (
              <div className="flex justify-center items-center w-full mt-8 mb-5 px-8 h-64 bg-white text-lg font-semibold">
                요청한 친구가 없습니다.
              </div>
            ) : (
              <>
                {data?.data.items &&
                  data?.data.items.map((r) => (
                    <div
                      className="flex justify-between items-center w-full mt-8 mb-5 px-8"
                      key={r.friendId}
                    >
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
                        <div className="ml-6 text-xl font-semibold">
                          {r.nickName}
                        </div>
                      </div>
                      <div
                        onClick={() => requestAccept(r.friendId)}
                        className="w-1/5 bg-pet_pink h-9 rounded-lg text-white flex justify-center items-center text-sm font-semibold cursor-pointer"
                      >
                        수락
                      </div>
                    </div>
                  ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FriendRequest;
