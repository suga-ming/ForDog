import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../../assets/css/swiper.css";
import { feedResiter } from "../../api/feed";
import { HashTag } from "../../components/HashTag";
import { isAccessToken } from "../../store/recoil";
import Swal from "sweetalert2";

const BoxDiv = styled.div`
  width: 60%;
  &::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
`;
const BoxImg = styled.img`
  width: 100%;
`;

const Solid = styled.div`
  border-bottom: 2px solid rgb(229 231 235);
`;

const Record = () => {
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [feed, setFeed] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const accessToken = useRecoilValue(isAccessToken);

  const navigate = useNavigate();

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (!files[0]) return;
    if (feed.length + files.length > 5) {
      return alert("최대 5개 사진만 첨부할 수 있습니다.");
    }
    const readAndPreview = (file: any) => {
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        const reader = new FileReader();
        setFeed([...feed, file]);
        reader.onload = () =>
          setPreview((prev) => [...prev, reader.result as string]);
        reader.readAsDataURL(file);
      }
    };
    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  };

  const onResiter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (feed.length < 1) {
      Swal.fire({
        position: "center",
        icon: "warning",
        iconColor: "rgba(237, 127, 148)",
        text: "사진을 최소 한장 등록해주세요.",
        showConfirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "rgba(237, 127, 148)",
        width: "30%",
      });
    } else {
      const apiData = {
        content: content,
        hashtag: tags,
        feed: feed,
      };
      const res = await feedResiter(apiData, accessToken);
      const resultCode = res?.data.data.resultCode;
      if (resultCode === 1) {
        navigate("/myProfile");
        Swal.fire({
          position: "center",
          icon: "success",
          iconColor: "rgba(237, 127, 148)",
          text: "게시글이 작성되었습니다.",
          showConfirmButton: true,
          confirmButtonText: "확인",
          confirmButtonColor: "rgba(237, 127, 148)",
          width: "30%",
        });
      }
    }
  };

  return (
    <form
      onSubmit={onResiter}
      className="pt-8 h-screen flex flex-col justify-center items-center bg-gray-100"
    >
      <div className="text-2xl font-semibold mb-5">오늘 하루 기록하기</div>
      <div className="flex justify-center items-center w-3/5  bg-white rounded-lg relative">
        {!feed.length ? (
          <BoxDiv className="bg-gray-300 flex justify-center items-center rounded-tl-lg rounded-bl-lg">
            <input
              className="hidden"
              type="file"
              multiple
              accept="image/*"
              ref={inputRef}
              onChange={onChangeFile}
            />
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
              <div
                onClick={() => inputRef.current?.click()}
                className="bg-gray-400 text-white font-semibold w-1/4 text-center py-1 rounded-lg cursor-pointer"
              >
                사진 선택
              </div>
            </div>
          </BoxDiv>
        ) : (
          <div className="w-3/5">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={60}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {preview.map((img, id) => (
                <SwiperSlide>
                  <BoxImg
                    src={img}
                    alt={`${img}-${id}`}
                    className="flex justify-center items-center rounded-tl-lg rounded-bl-lg"
                  ></BoxImg>
                </SwiperSlide>
              ))}
            </Swiper>
            <input
              className="hidden"
              type="file"
              // multiple
              accept="image/*"
              ref={inputRef}
              onChange={onChangeFile}
            />
            <div
              onClick={() => inputRef.current?.click()}
              className="flex justify-center items-center w-10 h-10 bg-gray-500 rounded-full absolute bottom-2 left-2 z-30"
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
        )}
        <div className="w-2/5 h-full">
          <textarea
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용 입력하기"
            className="resize-none w-full h-72 mt-4 p-4 border-b-2 border-gray-200 focus:outline-none"
          />
          <Solid className="flex w-full h-28 p-2 mb-7 border-b-2 border-gray-200">
            <HashTag tag={tag} tags={tags} setTag={setTag} setTags={setTags} />
          </Solid>
          <div className="flex justify-center">
            <button className="w-4/5 flex justify-center bg-pet_pink text-white font-semibold py-2 rounded-lg cursor-pointer">
              게시하기
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Record;
