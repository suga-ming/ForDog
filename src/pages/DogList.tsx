import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { dogInfo, DogInfoInterface } from "../api/dog";
import { isAccessToken } from "../store/recoil";

const Middle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

export interface DogInfoProps {
  myPetId: number;
  name: string;
  gender: string;
  breed: string;
  birthDay: string;
  togetherDay: number;
  imagePath: string;
}

const DogList = ({
  name,
  breed,
  gender,
  birthDay,
  togetherDay,
  imagePath,
  myPetId,
}: DogInfoProps) => {
  //   const accessToken = useRecoilValue(isAccessToken);
  //   const [name, setName] = useState("");
  //   const [gender, setGender] = useState("");
  //   const [breed, setBreed] = useState("");
  //   const [birthDay, setBirthDay] = useState("");
  //   const [togetherDay, setTogetherDay] = useState(0);

  //   useEffect(() => {
  //     if (accessToken !== "") {
  //       dogInfo(accessToken).then((res) => {
  //         const resultCode = res?.data?.data.resultCode;
  //         if (resultCode == 1) {
  //           const data = res?.data?.data?.data.items[0];
  //           setName(data?.name);
  //           setGender(data?.gender);
  //           setBreed(data?.breed);
  //           setBirthDay(data?.birthDay);
  //           setTogetherDay(data?.togetherDay);
  //         }
  //       });
  //     }
  //   }, []);

  return (
    <div className="w-full h-fit rounded-xl py-6 px-8 flex items-center justify-between">
      <div className="flex">
        <div className="flex items-center justify-center w-20 h-20 rounded-full mr-5 bg-pet_pink">
          <svg
            className="w-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="white"
              d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
            />
          </svg>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center mb-px">
            <div className="mr-1 text-xl font-semibold">{name}</div>
            <div className="font-medium text-xl">
              {gender == "female" ? "공주" : "왕자"}
            </div>
          </div>
          <div className="text-sm font-medium">{breed}</div>
          <div className="text-sm">{birthDay}</div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {/* <div className="font-semibold">만난지</div> */}
        <div className="flex relative">
          <svg
            className="w-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="pink"
              d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
            />
          </svg>
          <Middle className="font-semibold text-xl text-white">
            {Math.floor(togetherDay)}
          </Middle>
        </div>
      </div>
    </div>
  );
};

export default DogList;
