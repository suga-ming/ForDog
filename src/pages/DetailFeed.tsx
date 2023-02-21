import { SetStateAction, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  feedDelete,
  feedDetail,
  feedEdit,
  IFeedDetail,
  feedLike,
} from "../api/feed";
import { isAccessToken } from "../store/recoil";

const BoxImg = styled.img`
  width: 60%;
  &::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
`;

const Solid = styled.div<{ edit: boolean }>`
  border-bottom: ${(props) =>
    props.edit ? "1px white" : "2px solid rgb(229 231 235)"};
`;

const ModalArea = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const Reverse = styled.svg`
  transform: scaleX(-1);
`;

export interface IDeailFeed {
  detail: boolean;
  setDetail: (value: SetStateAction<boolean>) => void;
  feedId: number;
}

const DetailFeed = ({ detail, setDetail, feedId }: IDeailFeed) => {
  const [mineEdit, setMineEdit] = useState(false);
  const [edit, setEdit] = useState(false);
  const [nickName, setNickName] = useState("");
  const [image, setImage] = useState<string[]>([]);
  const [mine, setMine] = useState(Boolean);
  const [feedLiked, setFeedLiked] = useState(false);
  const [content, setContent] = useState("");
  const [hashtag, setHashtag] = useState<string[]>([]);
  const [likedCount, setLikedCount] = useState(0);
  const [createdAt, setCreatedAt] = useState("");
  const accessToken = useRecoilValue(isAccessToken);

  //   const { isLoading, data } = useQuery<IFeedDetail>([`feedDetail`], () =>
  //     feedDetail(feedId, accessToken)
  //   );

  useEffect(() => {
    feedDetail(feedId, accessToken).then((res) => {
      setNickName(res?.data.nickName);
      setContent(res?.data.content);
      setImage(res?.data.image);
      setFeedLiked(res?.data.feedLiked);
      setHashtag(res?.data.hashtag);
      setLikedCount(res?.data.likedCount);
      setMine(res?.data.mine);
      setCreatedAt(res?.data.createdAt);
    });
  }, []);

  const editFeed = async () => {
    const res = await feedEdit(content, feedId, accessToken);
    const resultCode = res?.data.data.resultCode;
    if (resultCode === 1) {
      alert("수정되었습니다.");
      setEdit(false);
    }
  };

  const deleteFeed = async () => {
    const res = await feedDelete(feedId, accessToken);
    const resultCode = res?.data.data.resultCode;
    if (resultCode === 1) {
      alert("삭제되었습니다.");
      setDetail(false);
    }
  };

  const onEdit = () => {
    setEdit(!edit);
    setMineEdit(false);
  };

  const changeLiked = async () => {
    const res = await feedLike(feedId, accessToken);
    setFeedLiked(res?.data.liked);
    setLikedCount(res?.data.likedCount);
  };
  return (
    <ModalArea
      //   onSubmit={onResiter}
      className="absolute w-full h-screen flex flex-col justify-center items-center"
    >
      <div className="flex justify-center items-center w-9/12  bg-white rounded-lg">
        {image &&
          image.map((img, id) => (
            <BoxImg
              src={img}
              alt={`${img}-${id}`}
              className="flex justify-center items-center rounded-tl-lg rounded-bl-lg"
            ></BoxImg>
          ))}
        <div className="w-2/5 h-full flex flex-col justify-between">
          <div>
            <Solid
              edit={edit}
              className="relative px-4 pt-4 pb-4 border-solid border-b-2 border-gray-200"
            >
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full mr-2 bg-pet_pink">
                    <svg
                      className="w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="white"
                        d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
                      />
                    </svg>
                  </div>
                  <div className="text-base">{nickName}</div>
                  <div className="ml-3 text-sm text-gray-500">{createdAt}</div>
                </div>
                {mine ? (
                  <div className="relative text-2xl font-mediums cursor-pointer">
                    <svg
                      className="w-4"
                      onClick={() => setMineEdit(!mineEdit)}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="rgb(107 114 128)"
                        d="M0 256a56 56 0 1 1 112 0A56 56 0 1 1 0 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
                      />
                    </svg>
                    {mineEdit ? (
                      <div className="absolute w-16 h-30 rounded-md bg-white text-base border-solid border-[1px] border-gray-300 text-center right-0">
                        <div
                          onClick={onEdit}
                          className="border-solid border-b-[1px] px-2 py-1 border-gray-300"
                        >
                          수정
                        </div>
                        <div onClick={deleteFeed} className="px-2 py-1">
                          삭제
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {edit ? (
                  <div
                    onClick={() => setDetail(!detail)}
                    className="absolute text-2xl text-white font-mediums cursor-pointer top-[-37px] right-[-20px]"
                  >
                    x
                  </div>
                ) : (
                  <div
                    onClick={() => setDetail(!detail)}
                    className="absolute text-2xl text-white font-mediums cursor-pointer bottom-36 right-[-20px]"
                  >
                    x
                  </div>
                )}
              </div>
              {edit ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="내용 입력하기"
                  className="resize-none w-full h-40 p-4 focus:outline-none"
                />
              ) : (
                <>
                  <div className="mb-4">{content}</div>
                  {hashtag.map((h) => (
                    <span
                      key={h}
                      className="bg-pet_pink mr-2 py-0.5 px-3 text-white rounded-3xl space-x-1 cursor-default"
                    >
                      <span className="text-sm font-bold">#{h}</span>
                    </span>
                  ))}
                </>
              )}
            </Solid>
            {edit ? null : (
              <div className="p-4">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full mr-3 bg-pet_pink">
                    <svg
                      className="w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="white"
                        d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="text-base mr-2 font-semibold">닉네임</div>
                      <div className="text-sm text-gray-500">2023-02-12</div>
                    </div>
                    <div>귀엽네요</div>
                  </div>
                </div>
                <div className="flex items-center pt-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full mr-3 bg-pet_pink">
                    <svg
                      className="w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="white"
                        d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="text-base mr-2 font-semibold">닉네임</div>
                      <div className="text-sm text-gray-500">2023-02-12</div>
                    </div>
                    <div>귀엽네요</div>
                  </div>
                </div>
                <div className="flex items-center pt-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full mr-3 bg-pet_pink">
                    <svg
                      className="w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="white"
                        d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="text-base mr-2 font-semibold">닉네임</div>
                      <div className="text-sm text-gray-500">2023-02-12</div>
                    </div>
                    <div>귀엽네요</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {edit ? (
            <div className="flex justify-center pb-10 pt-10 border-solid border-t-[1px] border-gray-300">
              <button
                onClick={editFeed}
                className="w-4/5 flex justify-center bg-pet_pink text-white font-semibold py-2 rounded-lg cursor-pointer"
              >
                수정하기
              </button>
            </div>
          ) : (
            <div className="border-solid border-t-2 border-gray-200">
              <div className="p-4 border-solid border-b-2 border-gray-200">
                <div className="flex items-center">
                  {feedLiked ? (
                    <svg
                      onClick={changeLiked}
                      className="w-7 mr-3 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="rgba(237, 127, 148)"
                        d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={changeLiked}
                      className="w-7 mr-3 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="rgb(107 114 128)"
                        d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"
                      />
                    </svg>
                  )}

                  <Reverse
                    className="w-7"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="rgb(107 114 128)"
                      d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"
                    />
                  </Reverse>
                </div>
                <div className="mt-2 text-sm flex items-center text-gray-500">
                  <div className="font-semibold">{likedCount}명</div>
                  <div className="font-medium">이 좋아합니다</div>
                </div>
              </div>
              <div className="flex w-full pl-6 py-4">
                <input
                  className="w-4/5 focus:outline-none"
                  placeholder="댓글 달기"
                />
                <div className="w-1/5 text-center font-semibold text-pet_pink">
                  입력
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModalArea>
  );
};

export default DetailFeed;
