import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { editComment } from "../api/comunity";
import { isAccessToken } from "../store/recoil";

export interface commentEditProps {
  replyId: number;
  writer: string;
  content: string;
  mine: true;
  createdAt: string;
}

const Solid = styled.div`
  border-bottom: 1px solid rgb(229 231 235);
`;

const Solid2 = styled.div`
  border: 1px solid rgb(229 231 235);
`;

const Solid3 = styled.textarea`
  border: 1px solid rgb(209 213 219);
`;

const PostComment = ({
  replyId,
  writer,
  content,
  mine,
  createdAt,
}: commentEditProps) => {
  const [comment, setComment] = useState(content);
  const [edit, setEdit] = useState(false);
  const accessToken = useRecoilValue(isAccessToken);

  const commentEdit = async () => {
    const res = await editComment(comment, accessToken, replyId);
    console.log("replyId", replyId);
  };
  return (
    <Solid className="pb-4 px-7 mb-3">
      <div className="flex items-center mb-2 relative">
        <div className="flex items-center mr-2">
          <div className="flex items-center justify-center w-5 h-5 rounded-full mr-1 bg-pet_pink">
            <svg
              className="w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="white"
                d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
              />
            </svg>
          </div>
          <div className="text-gray-600 text-sm">{writer}</div>
        </div>
        <div className="text-gray-500 text-xs">{createdAt}</div>
        {mine ? (
          <div className="absolute flex text-gray-400 text-xs top-0 right-0">
            <Solid2
              onClick={() => setEdit(!edit)}
              className="mr-1 cursor-pointer rounded-xl py-px px-2"
            >
              수정
            </Solid2>
            <Solid2 className="cursor-pointer rounded-xl py-px px-2">
              삭제
            </Solid2>
          </div>
        ) : null}
      </div>
      {edit ? (
        <div className="flex items-center mb-2">
          <Solid3
            className="w-10/12 h-9 py-2 px-2 rounded-lg resize-none mr-3"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div
            onClick={commentEdit}
            className="font-semibold px-2 py-1 bg-pet_pink text-white rounded-md text-sm cursor-pointer"
          >
            수정하기
          </div>
        </div>
      ) : (
        <div>{content}</div>
      )}
      <div className="text-xs text-gray-500 mt-1">댓글 쓰기</div>
    </Solid>
  );
};

export default PostComment;
