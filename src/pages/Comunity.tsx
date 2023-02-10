import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { postInfo, postInfoInterface } from "../api/comunity";
import Board from "../components/Board";
import { isAccessToken, isType } from "../store/recoil";
import WritePost from "./WritePost";

const BoderBox1 = styled.div<{ type: string }>`
  box-shadow: 2px 2px 2px rgb(209 213 219);
  background-color: white;
  border-radius: 5px;
  color: ${(props) =>
    props.type === "일상생활" ? "white" : "rgb(107 114 128)"};
  font-size: 13px;
  background-color: ${(props) =>
    props.type === "일상생활" ? "rgba(237, 127, 148)" : "white"};
  font-weight: ${(props) => (props.type === "일상생활" ? "600" : "300")};
  padding: 13px 0;
  width: 18%;
  text-align: center;
  cursor: pointer;
  margin-right: 12px;
  &:last-child {
    margin: 0;
  }
`;
const BoderBox2 = styled.div<{ type: string }>`
  box-shadow: 2px 2px 2px rgb(209 213 219);
  background-color: white;
  border-radius: 5px;
  color: ${(props) =>
    props.type === "정보공유" ? "white" : "rgb(107 114 128)"};
  font-size: 13px;
  background-color: ${(props) =>
    props.type === "정보공유" ? "rgba(237, 127, 148)" : "white"};
  font-weight: ${(props) => (props.type === "정보공유" ? "600" : "300")};
  padding: 13px 0;
  width: 18%;
  text-align: center;
  cursor: pointer;
  margin-right: 12px;
  &:last-child {
    margin: 0;
  }
`;
const BoderBox3 = styled.div<{ type: string }>`
  box-shadow: 2px 2px 2px rgb(209 213 219);
  background-color: white;
  border-radius: 5px;
  color: ${(props) =>
    props.type === "궁금해요" ? "white" : "rgb(107 114 128)"};
  font-size: 13px;
  background-color: ${(props) =>
    props.type === "궁금해요" ? "rgba(237, 127, 148)" : "white"};
  font-weight: ${(props) => (props.type === "궁금해요" ? "600" : "300")};
  padding: 13px 0;
  width: 18%;
  text-align: center;
  cursor: pointer;
  margin-right: 12px;
  &:last-child {
    margin: 0;
  }
`;

const Comunity = () => {
  // const [type, setType] = useState("일상생활");
  const [limit, setLimit] = useState(4);
  const [data, setData] = useState([]);
  const [like, setLike] = useState(false);
  const [maxResult, setMaxResult] = useState(0);
  const accessToken = useRecoilValue(isAccessToken);
  const [type, setType] = useRecoilState(isType);

  const navigate = useNavigate();
  const goPost = () => {
    navigate("/comunity/post");
  };

  useEffect(() => {
    postInfo({ type, limit }, accessToken).then((res) => {
      const resultCode = res?.data.data.resultCode;
      const data = res?.data.data.data.items;
      const count = res?.data.data.data.count;
      console.log("data", data);
      if (resultCode == 1) {
        setLimit(4);
        setData(data);
        setMaxResult(count);
      }
    });
  }, [type]);

  useEffect(() => {
    postInfo({ type, limit }, accessToken).then((res) => {
      const resultCode = res?.data.data.resultCode;
      const data = res?.data.data.data.items;
      const count = res?.data.data.data.count;
      if (resultCode == 1) {
        setData(data);
        setMaxResult(count);
      }
    });
  }, [limit]);

  return (
    <div className="pt-16 flex flex-col min-h-screen items-center bg-gray-100">
      <div className="flex w-full justify-center mt-5 mb-5">
        <BoderBox1 type={type} onClick={() => setType("일상생활")}>
          일상생활
        </BoderBox1>
        <BoderBox2 type={type} onClick={() => setType("정보공유")}>
          정보공유
        </BoderBox2>
        <BoderBox3 type={type} onClick={() => setType("궁금해요")}>
          궁금해요
        </BoderBox3>
      </div>
      <div className="flex flex-col items-center w-full relative">
        <div className="flex flex-col w-1/2 relative">
          {data?.map((data: postInfoInterface) => (
            <>
              <Board
                key={data?.boardId}
                boardId={data?.boardId}
                writer={data?.writer}
                image={data?.image}
                title={data?.title}
                content={data?.content}
                liked={data?.liked}
                likedCount={data?.likedCount}
                commentCount={data?.commentCount}
                createdAt={data?.createdAt}
              />
            </>
          ))}

          <div className="flex justify-center w-full mt-3 mb-5">
            {maxResult >= limit ? (
              <div
                onClick={() => setLimit(limit + 4)}
                className="bg-pet_pink text-white font-semibold w-1/2 text-center py-3 rounded-lg cursor-pointer"
              >
                더보기
              </div>
            ) : null}
          </div>
          <div
            onClick={goPost}
            className="fixed bottom-24 right-32 flex flex-col justify-center items-center w-16 h-16 rounded-full bg-pet_pink cursor-pointer"
          >
            <svg
              className="w-5 mb-px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="white"
                d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"
              />
            </svg>
            <div className="text-xs text-white font-semibold">작성하기</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comunity;
