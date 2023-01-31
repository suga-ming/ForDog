import axios from "axios";
import { useState, useRef } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { api } from "../api/axios";
import {
  dogInfo,
  DogInfoInterface,
  dogResiter,
  DogResiterInterface,
} from "../api/dog";
import { isAccessToken, isEditModal } from "../store/recoil";
import DogEdit from "./DogEdit";
import DogList from "./DogList";

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

const ModalArea = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const Modal = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const MaleBox = styled.div<{ gender: string }>`
  border: ${(props) =>
    props.gender == "male"
      ? "1px solid rgba(237, 127, 148)"
      : "1px solid rgb(209 213 219)"};
  color: ${(props) =>
    props.gender == "male" ? "rgba(237, 127, 148)" : "rgb(209 213 219)"};
  padding: 5px 20px;
  border-radius: 5px;
  width: 90px;
  text-align: center;
`;

const FemaleBox = styled.div<{ gender: string }>`
  border: ${(props) =>
    props.gender == "female"
      ? "1px solid rgba(237, 127, 148)"
      : "1px solid rgb(209 213 219)"};
  color: ${(props) =>
    props.gender == "female" ? "rgba(237, 127, 148)" : "rgb(209 213 219)"};
  padding: 5px 20px;
  border-radius: 5px;
  width: 90px;
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid rgb(209 213 219);
  padding: 5px 20px;
  border-radius: 5px;
  width: 80px;
  text-align: center;
  margin-right: 8px;
`;

export interface EditDogInterface {
  petId: number;
  name: string;
  breed: string;
  gender: string;
  birthDay: string;
  editTogetherDay: number;
  imgagePath: any;
}

const DogPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const dogPageMatch = useMatch("/dogPage");
  const [modal, setModal] = useState(false);
  // const [editModal, setEditModal] = useState(false);
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [togetherYear, setTogetherYear] = useState("");
  const [togetherMonth, setTogetherMonth] = useState("");
  const [togetherDate, setTogetherDate] = useState("");
  const [togetherDay, setTogetherDay] = useState("");
  const [editTogetherDay, setEditTogetherDay] = useState(0);
  const accessToken = useRecoilValue(isAccessToken);
  const [editModal, setEditModal] = useRecoilState(isEditModal);
  const [petId, setPetId] = useState(0);

  const goMyPage = () => {
    navigate("/myPage");
  };
  const goDogPage = () => {
    navigate("/dogPage");
  };

  const onChangeBreed = (value: string) => {
    if (value === "") {
      alert("견종을 선택해 주세요");
    } else {
      setBreed(value);
    }
  };
  const onChangeFile = (e: any) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const onSubmits = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onSubmit = async (body: DogResiterInterface, accessToken: string) => {
    const birthDates = birthYear + "-" + birthMonth + "-" + birthDate;
    setBirthDay(birthDates);
    const togetherDates =
      togetherYear + "-" + togetherMonth + "-" + togetherDate;
    setTogetherDay(togetherDates);
    // api
    // const bodyData = {
    //   gender: gender,
    //   birthDay: new Date(birthDates), // 1996-10-07 00:00:00TZ
    //   togetherDay: new Date(togetherDates), // 1996-10-07 00:00:00TZ
    // };

    // for (var entries of formData.keys()) {
    //   console.log(entries);
    // }

    const res = await dogResiter(body, accessToken);
    setModal(!modal);
  };

  const { isLoading, data } = useQuery<DogInfoInterface>([`info`], () =>
    dogInfo(accessToken)
  );

  const goEdit = (
    petId: number,
    name: string,
    breed: string,
    gender: string,
    birthDay: string,
    togetherDay: number,
    imagePath: any
  ) => {
    setEditModal(true);
    setPetId(petId);
    setName(name);
    setBreed(breed);
    setGender(gender);
    setBirthDay(birthDay);
    setEditTogetherDay(togetherDay);
    setFile(imagePath);
  };

  return (
    <form onSubmit={onSubmits}>
      {editModal ? (
        <DogEdit
          petId={petId}
          name={name}
          breed={breed}
          gender={gender}
          birthDay={birthDay}
          editTogetherDay={editTogetherDay}
          imgagePath={file}
        />
      ) : null}
      {modal ? (
        <ModalArea className="absolute w-full h-screen">
          <Modal className="bg-white w-2/5 rounded-lg">
            <Solid className="flex justify-between items-center w-full py-4 px-7">
              <div className="text-lg font-semibold">신규 반려견 추가</div>
              <div
                onClick={() => setModal(false)}
                className="text-xl cursor-pointer p-1 text-gray-500"
              >
                x
              </div>
            </Solid>
            <div className="flex flex-col justify-center items-center mt-8">
              <input
                className="hidden"
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={onChangeFile}
              />
              <div
                className="flex relative items-center justify-center w-[80px] h-[80px] mb-6 rounded-full bg-gray-200"
                onClick={() => inputRef.current?.click()}
              >
                <svg
                  className="w-9"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="rgb(156 163 175)"
                    d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
                  />
                </svg>
                <div className="w-6 h-6 flex justify-center items-center absolute bg-gray-400 bottom-0 right-0 rounded-full">
                  <svg
                    className="w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="white"
                      d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 384c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex py-4">
                  <svg
                    className="w-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="rgba(237, 127, 148)"
                      d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
                    />
                  </svg>
                  <div className="mr-10">반려견 이름</div>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력해주세요"
                  />
                </div>
                <div className="flex py-4">
                  <svg
                    className="w-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="rgba(237, 127, 148)"
                      d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
                    />
                  </svg>
                  <div className="mr-10">반려견 견종</div>
                  <select
                    name="breed"
                    className="pr-2"
                    onChange={(e) => onChangeBreed(e.target.value)}
                  >
                    <option className="text-gray-300" value="">
                      --선택--
                    </option>
                    <option value="푸들">푸들</option>
                    <option value="말티즈">말티즈</option>
                  </select>
                </div>
                <div className="flex items-center py-2">
                  <svg
                    className="w-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="rgba(237, 127, 148)"
                      d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
                    />
                  </svg>
                  <div className="mr-[87px]">성별</div>
                  <div className="flex">
                    <MaleBox
                      gender={gender}
                      className="mr-3 text-gray-400 text-sm"
                      onClick={() => setGender("male")}
                    >
                      남아
                    </MaleBox>
                    <FemaleBox
                      gender={gender}
                      className="text-gray-400 text-sm"
                      onClick={() => setGender("female")}
                    >
                      여아
                    </FemaleBox>
                  </div>
                </div>
                <div className="flex items-center py-3">
                  <svg
                    className="w-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="rgba(237, 127, 148)"
                      d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
                    />
                  </svg>
                  <div className="mr-[60px]">생년월일</div>
                  <Input
                    onChange={(e) => setBirthYear(e.target.value)}
                    className="text-sm"
                    placeholder="년도"
                  />
                  <Input
                    onChange={(e) => setBirthMonth(e.target.value)}
                    className="text-sm"
                    placeholder="월"
                  />
                  <Input
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="text-sm"
                    placeholder="일"
                  />
                </div>
                <div className="flex items-center py-3">
                  <svg
                    className="w-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="rgba(237, 127, 148)"
                      d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
                    />
                  </svg>
                  <div className="mr-[60px]">데려온날</div>
                  <Input
                    onChange={(e) => setTogetherYear(e.target.value)}
                    className="text-sm"
                    placeholder="년도"
                  />
                  <Input
                    onChange={(e) => setTogetherMonth(e.target.value)}
                    className="text-sm"
                    placeholder="월"
                  />
                  <Input
                    onChange={(e) => setTogetherDate(e.target.value)}
                    className="text-sm"
                    placeholder="일"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() =>
                onSubmit(
                  {
                    file,
                    name,
                    breed,
                    gender,
                    birthDay,
                    togetherDay,
                  },
                  accessToken
                )
              }
              className="w-full mt-10 bg-pet_pink h-11 rounded-b-lg text-white flex justify-center items-center font-semibold py-7 cursor-pointer"
            >
              반려견 등록하기
            </button>
          </Modal>
        </ModalArea>
      ) : null}
      <div className="h-screen pt-16 flex justify-center px-40 bg-gray-200">
        <div className="w-5/1 mr-10">
          <div className="bg-pet_pink h-20 items-center my-8 flex justify-center px-7 rounded-xl">
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
        <div className="w-3/5 h-fit bg-white rounded-xl my-8">
          <Solid className="font-semibold text-xl pb-5 pl-7 py-5">
            반려견 정보
          </Solid>
          {!data ? (
            <div className="w-full rounded-xl">
              <div className="flex flex-col items-center">
                <div className="pt-24 mb-5">
                  아직 등록하신 반려견이 없습니다.
                </div>
                <div
                  onClick={() => setModal(!modal)}
                  className="w-full mb-32 bg-pet_pink max-w-[318px] h-11 rounded-lg text-white flex justify-center items-center font-semibold cursor-pointer"
                >
                  반려견 등록하기
                </div>
              </div>
            </div>
          ) : (
            <div>
              {isLoading ? (
                <div>loading...</div>
              ) : (
                data?.data.items.map((item) => (
                  <div
                    onClick={() =>
                      goEdit(
                        item?.myPetId,
                        item?.name,
                        item?.breed,
                        item?.gender,
                        item?.birthDay,
                        item?.togetherDay,
                        item?.imagePath
                      )
                    }
                  >
                    <DogList
                      key={item?.myPetId}
                      myPetId={item?.myPetId}
                      name={item?.name}
                      breed={item?.breed}
                      gender={item?.gender}
                      birthDay={item?.birthDay}
                      togetherDay={item?.togetherDay}
                      imagePath={item?.imagePath}
                    />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default DogPage;
