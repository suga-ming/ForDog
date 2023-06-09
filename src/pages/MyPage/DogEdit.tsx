import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { deleteDog, dogEditInfo, editDog } from "../../api/dog";
import { isAccessToken, isEditModal } from "../../store/recoil";
import { EditDogInterface } from "./DogPage";
import { breedList } from "../../constant/breed";
import Swal from "sweetalert2";

const ModalArea = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const MaleBox = styled.div<{ gender: string }>`
  border: ${(props) =>
    props.gender === "male"
      ? "1px solid rgba(237, 127, 148)"
      : "1px solid rgb(209 213 219)"};
  color: ${(props) =>
    props.gender === "male" ? "rgba(237, 127, 148)" : "rgb(209 213 219)"};
  padding: 5px 20px;
  border-radius: 5px;
  width: 90px;
  text-align: center;
`;

const FemaleBox = styled.div<{ gender: string }>`
  border: ${(props) =>
    props.gender === "female"
      ? "1px solid rgba(237, 127, 148)"
      : "1px solid rgb(209 213 219)"};
  color: ${(props) =>
    props.gender === "female" ? "rgba(237, 127, 148)" : "rgb(209 213 219)"};
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

const BottomSolid = styled.div`
  border-bottom: 1px solid rgb(209 213 219);
`;

const RepresentDog = styled.span<{ represent: boolean }>`
  background-color: ${(props) =>
    props.represent ? "rgba(237, 127, 148)" : "white"};
  color: ${(props) => (props.represent ? "white" : "rgba(237, 127, 148)")};
  border: ${(props) =>
    props.represent ? "none" : "1px solid rgba(237, 127, 148)"};
  border-radius: 20px;
  padding: 8px 30px;
`;

const DeleteDog = styled.span`
  border-radius: 20px;
  padding: 8px 30px;
`;

const DogEdit = ({ petId }: EditDogInterface) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [togetherYear, setTogetherYear] = useState("");
  const [togetherMonth, setTogetherMonth] = useState("");
  const [togetherDate, setTogetherDate] = useState("");
  const [represent, setRepresent] = useState(false);
  const accessToken = useRecoilValue(isAccessToken);
  const [editModal, setEditModal] = useRecoilState(isEditModal);
  const [fileImage, setFileImage] = useState("");

  const onChangeBreed = (value: string) => {
    if (value === "") {
      Swal.fire({
        position: "center",
        icon: "warning",
        iconColor: "rgba(237, 127, 148)",
        text: "견종을 선택해 주세요",
        showConfirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "rgba(237, 127, 148)",
        timer: 1500,
        width: "30%",
      });
    } else {
      setBreed(value);
    }
  };
  const onChangeFile = (e: any) => {
    setFile(e.target.files[0]);
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    dogEditInfo(accessToken, petId).then((res) => {
      setFileImage(res?.data.imagePath);
      setName(res?.data.name);
      setGender(res?.data.gender);
      setBreed(res?.data.breed);
      setBirthYear(res?.data.birthYear);
      setBirthMonth(res?.data.birthMonth);
      setBirthDate(res?.data.birthDate);
      setTogetherYear(res?.data.togetherYear);
      setTogetherMonth(res?.data.togetherMonth);
      setTogetherDate(res?.data.togetherDate);
      setRepresent(res?.data.represent);
    });
  }, []);

  const onDeletePet = async () => {
    const res = await deleteDog(accessToken, petId);
    const resultCode = res?.data.data.resultCode;
    if (resultCode === 1) {
      alert("펫이 삭제되었습니다.");
      setEditModal(false);
    }
  };

  const onSubmit = async () => {
    const birthDates = birthYear + "-" + birthMonth + "-" + birthDate;
    const togetherDates =
      togetherYear + "-" + togetherMonth + "-" + togetherDate;

    const apiData = {
      file: file,
      name: name,
      breed: breed,
      gender: gender,
      birthDay: birthDates === "--" ? "" : birthDates,
      togetherDay: togetherDates === "--" ? "" : togetherDates,
      represent: represent,
    };

    const res = await editDog(apiData, accessToken, petId);
    const resultCode = res?.data.data.resultCode;
    if (resultCode === 1) {
      setEditModal(!editModal);
      alert("수정이 완료되었습니다.");
    }
  };

  return (
    <ModalArea className="absolute w-full h-screen">
      <Modal className="bg-white w-2/5 rounded-lg">
        <BottomSolid className="flex justify-between items-center w-full py-4 px-7">
          <div className="text-lg font-semibold">반려견 수정</div>
          <div
            onClick={() => setEditModal(false)}
            className="text-xl cursor-pointer p-1 text-gray-500"
          >
            x
          </div>
        </BottomSolid>
        <div className="flex flex-col justify-center items-center mt-8">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onChangeFile}
          />
          {fileImage ? (
            <div className="flex relative items-center justify-center w-[80px] h-[80px] mb-6 rounded-full">
              {fileImage ? (
                <img
                  src={fileImage}
                  alt={fileImage}
                  className="w-[80px] h-[80px] rounded-full"
                  onClick={() => inputRef.current?.click()}
                />
              ) : (
                <img
                  src={fileImage}
                  alt={fileImage}
                  className="w-[80px] h-[80px] rounded-full"
                  onClick={() => inputRef.current?.click()}
                />
              )}
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
          ) : (
            <>
              {fileImage ? (
                <img
                  src={fileImage}
                  alt={fileImage}
                  className="flex relative items-center justify-center w-[80px] h-[80px] mb-6 rounded-full"
                  onClick={() => inputRef.current?.click()}
                />
              ) : (
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
              )}
            </>
          )}
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
                placeholder={name}
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
                value={breed}
                onChange={(e) => onChangeBreed(e.target.value)}
              >
                <option className="text-gray-300" value="">
                  --선택--
                </option>
                {breedList.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
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
                placeholder={birthYear}
              />
              <Input
                onChange={(e) => setBirthMonth(e.target.value)}
                className="text-sm"
                placeholder={birthMonth}
              />
              <Input
                onChange={(e) => setBirthDate(e.target.value)}
                className="text-sm"
                placeholder={birthDate}
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
                placeholder={togetherYear}
              />
              <Input
                onChange={(e) => setTogetherMonth(e.target.value)}
                className="text-sm"
                placeholder={togetherMonth}
              />
              <Input
                onChange={(e) => setTogetherDate(e.target.value)}
                className="text-sm"
                placeholder={togetherDate}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-center">
            <RepresentDog
              represent={represent}
              onClick={() => setRepresent(!represent)}
              className="bg-pet_pink text-white font-semibold mt-5 text-sm cursor-pointer mr-3"
            >
              대표 강아지
            </RepresentDog>
          </div>
          <div className="flex justify-center">
            <DeleteDog
              onClick={onDeletePet}
              className="bg-gray-500 text-white font-semibold mt-5 text-sm cursor-pointer"
            >
              반려견 삭제하기
            </DeleteDog>
          </div>
        </div>
        <button
          onClick={onSubmit}
          className="w-full mt-5 bg-pet_pink h-11 rounded-b-lg text-white flex justify-center items-center font-semibold py-7 cursor-pointer"
        >
          반려견 수정하기
        </button>
      </Modal>
    </ModalArea>
  );
};

export default DogEdit;
