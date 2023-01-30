import styled from "styled-components";

const BoderBox = styled.div`
  border: 1px solid rgb(209 213 219);
  border-radius: 5px;
  color: rgb(107 114 128);
  font-size: 13px;
  padding: 13px 0;
  width: 18%;
  text-align: center;
  margin-right: 12px;
  &:last-child {
    margin: 0;
  }
`;

const Post = styled.div`
  border: 1px solid gray;
  width: 48%;
`;

const Solid = styled.div`
  border-top: 1px solid gray;
  &:first-child {
    border-right: 1px solid gray;
  }
`;

const Comunity = () => {
  return (
    <div className="pt-16 flex flex-col items-center">
      <div className="flex w-full justify-center mt-5 ">
        <BoderBox>일상생활</BoderBox>
        <BoderBox>정보공유</BoderBox>
        <BoderBox>궁금해요</BoderBox>
      </div>
      <Post>
        <div className="flex justify-between">
          <div className="text-2xl font-semibold mb-1">제목</div>
          <div>올린날짜</div>
        </div>
        <div className="flex items-center mb-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full mr-1 bg-pet_pink">
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
          <div>닉네임</div>
        </div>
        <div>내용</div>
        <div>내용</div>
        <div>내용</div>
        <div className="flex mt-4">
          <div className="flex mr-2 mb-4">
            <div>공감:</div>
            <div>0</div>
          </div>
          <div className="flex">
            <div>댓글:</div>
            <div>0</div>
          </div>
        </div>
        <Solid className="flex justify-around">
          <div className="py-3">공감해요</div>
          <div className="w-px bg-gray-400" />
          <div className="py-3">댓글달기</div>
        </Solid>
      </Post>
    </div>
  );
};

export default Comunity;
