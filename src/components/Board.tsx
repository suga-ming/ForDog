import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postInfoInterface } from "../api/comunity";

const PostArea = styled.div`
  /* border: 1px solid gray; */
  border-radius: 10px;
  /* width: 50%; */
  margin-bottom: 20px;
  background-color: white;
  box-shadow: 2px 2px 2px rgb(209 213 219);
`;

const Solid = styled.div`
  border-top: 1px solid rgb(209 213 219);
  &:first-child {
    border-right: 1px solid gray;
  }
`;

const Solid2 = styled.div`
  border-right: 1px solid rgb(209 213 219);
`;

const Path = styled.path<{ like: boolean }>`
  fill: ${(props) => (props.like ? "rgba(237, 127, 148)" : "rgb(209 213 219)")};
`;

const Text = styled.div<{ like: boolean }>`
  color: ${(props) => (props.like ? "rgba(237, 127, 148)" : "black")};
  font-weight: ${(props) => (props.like ? "600" : "300")};
`;

export interface BoardDataProps {
  boardId: number;
  writer: string;
  image: string;
  title: string;
  content: string;
  createdAt: string;
}

const Board = ({
  boardId,
  writer,
  image,
  title,
  content,
  createdAt,
  liked,
  likedCount,
  commentCount,
}: postInfoInterface) => {
  // console.log("boardId", boardId);
  // console.log("writer", writer);
  // console.log("image", image);
  // console.log("title", title);
  // console.log("content", content);
  // console.log("createdAt", createdAt);
  console.log("liked", liked);
  // console.log("likedCount", likedCount);
  const navigate = useNavigate();
  // const [like, setLike] = useState(liked);
  // console.log("like", like);

  const goPost = () => {
    navigate(`/comunity/${boardId}`);
  };
  return (
    <PostArea>
      <div className="px-7 cursor-pointer" onClick={goPost}>
        <div className="flex justify-between mt-5">
          <div className="text-2xl font-semibold mb-1">{title}</div>
          <div className="text-gray-500 text-sm">{createdAt}</div>
        </div>
        <div className="flex items-center mb-3">
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
          <div className="text-sm">{writer}</div>
        </div>
        <div>{content}</div>
        <div className="flex mt-4">
          <div className="flex mr-3 mb-6">
            <div>공감:</div>
            <div className="text-gray-500 ml-1">{likedCount}</div>
          </div>
          <div className="flex">
            <div>댓글:</div>
            <div className="text-gray-500  ml-1">{commentCount}</div>
          </div>
        </div>
      </div>
      <Solid className="flex justify-around">
        <Solid2
          className="flex py-3 w-1/2 justify-center cursor-pointer"
          onClick={() => !liked}
        >
          <svg
            className="w-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <Path
              like={liked}
              d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
            />
          </svg>
          <Text like={liked} className="text-base">
            공감해요
          </Text>
        </Solid2>
        <div
          className="flex py-3 w-1/2 justify-center cursor-pointer"
          onClick={goPost}
        >
          <svg
            className="w-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="rgb(156 163 175)"
              d="M144 208C126.3 208 112 222.2 112 239.1C112 257.7 126.3 272 144 272s31.1-14.25 31.1-32S161.8 208 144 208zM256 207.1c-17.75 0-31.1 14.25-31.1 32s14.25 31.1 31.1 31.1s31.1-14.25 31.1-31.1S273.8 207.1 256 207.1zM368 208c-17.75 0-31.1 14.25-31.1 32s14.25 32 31.1 32c17.75 0 31.99-14.25 31.99-32C400 222.2 385.8 208 368 208zM256 31.1c-141.4 0-255.1 93.12-255.1 208c0 47.62 19.91 91.25 52.91 126.3c-14.87 39.5-45.87 72.88-46.37 73.25c-6.624 7-8.373 17.25-4.624 26C5.818 474.2 14.38 480 24 480c61.49 0 109.1-25.75 139.1-46.25c28.87 9 60.16 14.25 92.9 14.25c141.4 0 255.1-93.13 255.1-207.1S397.4 31.1 256 31.1zM256 400c-26.75 0-53.12-4.125-78.36-12.12l-22.75-7.125L135.4 394.5c-14.25 10.12-33.87 21.38-57.49 29c7.374-12.12 14.37-25.75 19.87-40.25l10.62-28l-20.62-21.87C69.81 314.1 48.06 282.2 48.06 240c0-88.25 93.24-160 207.1-160s207.1 71.75 207.1 160S370.8 400 256 400z"
            />
          </svg>
          <div className="text-base">댓글달기</div>
        </div>
      </Solid>
    </PostArea>
  );
};

export default Board;
