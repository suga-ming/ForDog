import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { editFeedComment, feedCommentList } from "../api/feed";
import { isAccessToken } from "../store/recoil";

export interface IComment {
  commentId: number;
  createdAt: string;
  mine: boolean;
  writer: string;
  content: string;
}

const FeedComment = ({
  commentId,
  createdAt,
  mine,
  content,
  writer,
}: IComment) => {
  const accessToken = useRecoilValue(isAccessToken);
  const [mineEdit, setMineEdit] = useState(false);
  const [edit, setEdit] = useState(false);
  const onEditComment = async () => {
    const res = await editFeedComment(commentId, accessToken);
    const resultCode = res?.data.data.resultCode;
    if (resultCode === 1) {
      alert("수정되었습니다.");
    }
  };
  const onEdit = () => {
    setEdit(!edit);
    setMineEdit(false);
  };

  // const deleteFeed = async () => {
  //   const res = await feedDelete(feedId, accessToken);
  //   const resultCode = res?.data.data.resultCode;
  //   if (resultCode === 1) {
  //     alert("삭제되었습니다.");
  //   }
  // };
  return (
    <div className="flex justify-between">
      <div className="flex items-center mb-4">
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
            <div className="text-base mr-2 font-semibold">{writer}</div>
            <div className="text-sm text-gray-500">{createdAt}</div>
          </div>
          <div>{content}</div>
        </div>
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
            <div className="absolute w-16 h-30 rounded-md bg-white text-base border-solid border-[1px] border-gray-300 text-center right-0 z-30">
              <div
                onClick={onEdit}
                className="border-solid border-b-[1px] px-2 py-1 border-gray-300"
              >
                수정
              </div>
              <div
                // onClick={deleteFeed}
                className="px-2 py-1"
              >
                삭제
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default FeedComment;
