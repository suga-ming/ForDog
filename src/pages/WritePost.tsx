import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { comunityResiter } from "../api/comunity";
import { isAccessToken } from "../store/recoil";

const PostArea = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 50%;
  background-color: white;
  /* box-shadow: 2px 2px 2px rgb(209 213 219); */
`;

const Solid = styled.div`
  border-bottom: 1px solid rgb(229 231 235);
`;

const Solid2 = styled.select`
  border: 1px solid rgb(229 231 235);
`;

const ImgBox = styled.img`
  width: 18.7%;
  background-color: skyblue;
  margin-right: 1.5%;
  ::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
  &:last-child {
    margin: 0;
  }
`;

const WritePost = () => {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [board, setBoard] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const accessToken = useRecoilValue(isAccessToken);

  const navigate = useNavigate();
  const onChangeCategory = (value: string) => {
    if (value === "") {
      alert("카테고리를 선택해 주세요");
    } else {
      setType(value);
    }
  };

  const goComunity = () => {
    navigate("/comunity");
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (!files[0]) return;
    if (board.length + files.length > 5) {
      return alert("최대 5개 사진만 첨부할 수 있습니다.");
    }
    const readAndPreview = (file: any) => {
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.onload = () =>
          setBoard((prev) => [...prev, reader.result as string]);
        reader.readAsDataURL(file);
      }
    };
    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiData = {
      type: type,
      title: title,
      content: content,
      board: board,
    };
    console.log(apiData);
    const res = await comunityResiter(apiData, accessToken);
    const resultCode = res?.data.data.resultCode;
    if (resultCode === 1) {
      alert("게시글이 작성되었습니다.");
      navigate("/comunity");
    }
  };

  // const handleDeleteImage = (id) => {
  //   setBoard(board.filter((_, index) => index !== id));
  // };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col justify-center items-center pt-16 h-screen bg-gray-100"
    >
      <PostArea>
        <div className="max-h-[550px] overflow-y-scroll w-full">
          <Solid className="flex items-center py-4 px-8 mt-1">
            <svg
              onClick={goComunity}
              className="w-4 rotate-90 mr-2 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
            <div className="text-2xl font-semibold">게시글 작성하기</div>
          </Solid>
          <div className="px-7 flex flex-col justify-center my-4">
            <Solid2
              name="category"
              className="w-full mb-3 py-2 px-2 rounded-md"
              onChange={(e) => onChangeCategory(e.target.value)}
            >
              <option className="text-gray-400" value="">
                카테고리를 선택해주세요.
              </option>
              <option value="일상생활">일상생활</option>
              <option value="정보공유">정보공유</option>
              <option value="궁금해요">궁금해요</option>
            </Solid2>
            <Solid>
              <input
                onChange={(e) => setTitle(e.target.value)}
                className="py-2 pl-3 w-full text-lg font-semibold"
                placeholder="제목을 입력해주세요"
              />
            </Solid>
          </div>
          <div className="px-7 w-full relative">
            <textarea
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력해주세요"
              className="mb-3 w-full h-52 pl-3 py-3 bg-gray-100 rounded-lg resize-none"
            />
            <input
              className="hidden"
              type="file"
              multiple
              accept="image/*"
              ref={inputRef}
              onChange={onChangeFile}
            />
            <div
              onClick={() => inputRef.current?.click()}
              className="flex justify-center items-center w-10 h-10 bg-gray-500 rounded-full absolute bottom-6 left-10"
            >
              <svg
                className="w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="white"
                  d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48z"
                />
              </svg>
            </div>
          </div>
          <div className="px-7 flex w-full">
            {board.map((image, id) => (
              <>
                <ImgBox src={image} alt={`${image}-${id}`} />
                {/* <div onClick={() => handleDeleteImage(id)}>x</div> */}
              </>
            ))}
          </div>
        </div>
        <div className="px-7 my-5 text-white flex justify-center items-center">
          <button className="w-full flex justify-center items-center bg-pet_pink rounded-lg py-2 font-semibold cursor-pointer">
            게시하기
          </button>
        </div>
      </PostArea>
    </form>
  );
};

export default WritePost;
