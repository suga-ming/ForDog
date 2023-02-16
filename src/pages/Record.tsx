import styled from "styled-components";

const BoxDiv = styled.div`
  width: 60%;
  &::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
`;

const Solid = styled.div`
  border-bottom: 2px solid rgb(229 231 235);
`;

const Record = () => {
  return (
    <div className="pt-16 h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-2xl font-semibold mb-5">오늘 하루 기록하기</div>
      <div className="flex justify-center items-center w-3/5  bg-white rounded-lg">
        <BoxDiv className="bg-gray-300 flex justify-center items-center rounded-tl-lg rounded-bl-lg">
          <div className="flex flex-col items-center">
            <svg
              className="w-1/4 mb-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="white"
                d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
              />
            </svg>
            <div className="bg-gray-400 text-white font-semibold w-1/4 text-center py-1 rounded-lg cursor-pointer">
              사진 선택
            </div>
          </div>
        </BoxDiv>
        <div className="w-2/5 h-full">
          <div className="flex p-4 items-center">
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
            <div className="text-base">닉네임</div>
          </div>
          <textarea
            placeholder="내용 입력하기"
            className="resize-none w-full h-60 p-4 border-b-2 border-gray-200 focus:outline-none"
          />
          <Solid className="w-full h-16 p-4 mb-7 border-b-2 border-gray-200">
            <input
              placeholder="태그 입력"
              className="pl-1 focus:outline-none"
            />
          </Solid>
          <div className="flex justify-center">
            <div className="w-4/5 flex justify-center bg-pet_pink text-white font-semibold py-2 rounded-lg cursor-pointer">
              게시하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Record;
