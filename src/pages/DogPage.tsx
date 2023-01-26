import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const DogPage = () => {
  const navigate = useNavigate();
  const dogPageMatch = useMatch("/dogPage");
  const goMyPage = () => {
    navigate("/myPage");
  };
  const goDogPage = () => {
    navigate("/dogPage");
  };
  console.log(dogPageMatch);
  return (
    <div className="h-screen pt-16 flex justify-center px-40 bg-gray-200">
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
          <div
            onClick={goDogPage}
            className="py-4 flex justify-between px-5 cursor-pointer"
          >
            <Bold isActive={dogPageMatch !== null}>반려견 정보</Bold>
            <Down xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </Down>
          </div>
        </div>
      </div>
      <div className="w-3/5 h-3/5 bg-white rounded-xl my-8">
        <Solid className="font-semibold text-xl pb-5 pl-7 py-5">
          반려견 정보
        </Solid>
        <div className="w-full rounded-xl">
          <div className="flex flex-col items-center">
            <div className="pt-24 mb-5">아직 등록하신 반려견이 없습니다.</div>
            <div className="w-full mb-32 bg-pet_pink max-w-[318px] h-11 rounded-lg text-white flex justify-center items-center font-semibold">
              반려견 등록하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogPage;
