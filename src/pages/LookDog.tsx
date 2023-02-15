import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RandomUserInterface, userRandom } from "../api/user";
import dane from "../assets/단.png";

const Solid = styled.div`
  border: 1px solid rgba(237, 127, 148);
`;

const Solid2 = styled.div`
  border: 1px solid rgba(237, 127, 148);
`;

const Solid3 = styled.div`
  border-left: 1px solid rgb(156 163 175);
  border-right: 1px solid rgb(156 163 175);
`;

const Round = styled.img`
  border-top: 1px solid rgb(156 163 175);
  border-left: 1px solid rgb(156 163 175);
  border-right: 1px solid rgb(156 163 175);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
const Solid4 = styled.div`
  border-left: 1px solid rgb(156 163 175);
  border-right: 1px solid rgb(156 163 175);
  border-bottom: 1px solid rgb(156 163 175);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  row-gap: 40px;
  /* gap: 20px; */
`;
// const Box = styled.div`
//   width: 40%;
//   &::after {
//     display: block;
//     content: "";
//     padding-bottom: 100%;
//   }
// `;

const LookDog = () => {
  const navigate = useNavigate();
  const goProfile = () => {
    navigate("/dogProfile");
  };
  const { isLoading, data } = useQuery<RandomUserInterface>([`random`], () =>
    userRandom()
  );

  console.log(data);

  return (
    <div className="pt-16 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="font-semibold text-2xl mt-8 mb-10">
        다른 강아지 구경하기
      </div>
      <Grid className="w-2/5 flex">
        <div className="bg-white rounded-lg">
          <Round
            src={dane}
            className="w-full h-40 bg-orange-300 rounded-t-lg"
          />
          <Solid3 className="flex w-full py-2 justify-center font-semibold">
            <div>단이</div>
            <svg
              className="w-2 mx-1 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="rgb(75 85 99)"
                d="M186 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V172.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L330 256l122 70.4c15.3 8.8 20.5 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7L282 339.1V480c0 17.7-14.3 32-32 32H218c-17.7 0-32-14.3-32-32V339.1L64 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7C-4.5 354.8 .7 335.3 16 326.4L138 256 16 185.6C.7 176.7-4.5 157.2 4.3 141.9l16-27.7C29.1 98.8 48.7 93.6 64 102.4l122 70.4V32z"
              />
            </svg>
            <div>푸들</div>
          </Solid3>
          <Solid4
            onClick={goProfile}
            className="w-full text-center px-4 py-2 bg-pet_pink text-white font-semibold text-sm cursor-pointer"
          >
            프로필 보러가기
          </Solid4>
        </div>
        <div className="bg-white rounded-lg">
          <Round
            src={dane}
            className="w-full h-40 bg-orange-300 rounded-t-lg"
          />
          <Solid3 className="flex w-full py-2 justify-center font-semibold">
            <div>단이</div>
            <svg
              className="w-2 mx-1 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="rgb(75 85 99)"
                d="M186 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V172.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L330 256l122 70.4c15.3 8.8 20.5 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7L282 339.1V480c0 17.7-14.3 32-32 32H218c-17.7 0-32-14.3-32-32V339.1L64 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7C-4.5 354.8 .7 335.3 16 326.4L138 256 16 185.6C.7 176.7-4.5 157.2 4.3 141.9l16-27.7C29.1 98.8 48.7 93.6 64 102.4l122 70.4V32z"
              />
            </svg>
            <div>푸들</div>
          </Solid3>
          <Solid4
            onClick={goProfile}
            className="w-full text-center px-4 py-2 bg-pet_pink text-white font-semibold text-sm cursor-pointer"
          >
            프로필 보러가기
          </Solid4>
        </div>
        <div className="bg-white rounded-lg">
          <Round
            src={dane}
            className="w-full h-40 bg-orange-300 rounded-t-lg"
          />
          <Solid3 className="flex w-full py-2 justify-center font-semibold">
            <div>단이</div>
            <svg
              className="w-2 mx-1 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="rgb(75 85 99)"
                d="M186 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V172.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L330 256l122 70.4c15.3 8.8 20.5 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7L282 339.1V480c0 17.7-14.3 32-32 32H218c-17.7 0-32-14.3-32-32V339.1L64 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7C-4.5 354.8 .7 335.3 16 326.4L138 256 16 185.6C.7 176.7-4.5 157.2 4.3 141.9l16-27.7C29.1 98.8 48.7 93.6 64 102.4l122 70.4V32z"
              />
            </svg>
            <div>푸들</div>
          </Solid3>
          <Solid4
            onClick={goProfile}
            className="w-full text-center px-4 py-2 bg-pet_pink text-white font-semibold text-sm cursor-pointer"
          >
            프로필 보러가기
          </Solid4>
        </div>
        <div className="bg-white rounded-lg">
          <Round
            src={dane}
            className="w-full h-40 bg-orange-300 rounded-t-lg"
          />
          <Solid3 className="flex w-full py-2 justify-center font-semibold">
            <div>단이</div>
            <svg
              className="w-2 mx-1 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="rgb(75 85 99)"
                d="M186 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V172.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L330 256l122 70.4c15.3 8.8 20.5 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7L282 339.1V480c0 17.7-14.3 32-32 32H218c-17.7 0-32-14.3-32-32V339.1L64 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7C-4.5 354.8 .7 335.3 16 326.4L138 256 16 185.6C.7 176.7-4.5 157.2 4.3 141.9l16-27.7C29.1 98.8 48.7 93.6 64 102.4l122 70.4V32z"
              />
            </svg>
            <div>푸들</div>
          </Solid3>
          <Solid4
            onClick={goProfile}
            className="w-full text-center px-4 py-2 bg-pet_pink text-white font-semibold text-sm cursor-pointer"
          >
            프로필 보러가기
          </Solid4>
        </div>
        <div className="bg-white rounded-lg">
          <Round
            src={dane}
            className="w-full h-40 bg-orange-300 rounded-t-lg"
          />
          <Solid3 className="flex w-full py-2 justify-center font-semibold">
            <div>단이</div>
            <svg
              className="w-2 mx-1 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="rgb(75 85 99)"
                d="M186 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V172.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L330 256l122 70.4c15.3 8.8 20.5 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7L282 339.1V480c0 17.7-14.3 32-32 32H218c-17.7 0-32-14.3-32-32V339.1L64 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7C-4.5 354.8 .7 335.3 16 326.4L138 256 16 185.6C.7 176.7-4.5 157.2 4.3 141.9l16-27.7C29.1 98.8 48.7 93.6 64 102.4l122 70.4V32z"
              />
            </svg>
            <div>푸들</div>
          </Solid3>
          <Solid4
            onClick={goProfile}
            className="w-full text-center px-4 py-2 bg-pet_pink text-white font-semibold text-sm cursor-pointer"
          >
            프로필 보러가기
          </Solid4>
        </div>
        <div className="bg-white rounded-lg">
          <Round
            src={dane}
            className="w-full h-40 bg-orange-300 rounded-t-lg"
          />
          <Solid3 className="flex w-full py-2 justify-center font-semibold">
            <div>단이</div>
            <svg
              className="w-2 mx-1 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="rgb(75 85 99)"
                d="M186 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V172.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L330 256l122 70.4c15.3 8.8 20.5 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7L282 339.1V480c0 17.7-14.3 32-32 32H218c-17.7 0-32-14.3-32-32V339.1L64 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7C-4.5 354.8 .7 335.3 16 326.4L138 256 16 185.6C.7 176.7-4.5 157.2 4.3 141.9l16-27.7C29.1 98.8 48.7 93.6 64 102.4l122 70.4V32z"
              />
            </svg>
            <div>푸들</div>
          </Solid3>
          <Solid4
            onClick={goProfile}
            className="w-full text-center px-4 py-2 bg-pet_pink text-white font-semibold text-sm cursor-pointer"
          >
            프로필 보러가기
          </Solid4>
        </div>
      </Grid>
      {/* <div className="flex flex-col items-center w-1/3 bg-white p-5 rounded-lg mb-4">
        <div className="w-full flex justify-center mb-4">
          <div className="w-1/2 h-40 bg-orange-300" />
          <div className="w-1/2 h-40 bg-red-300" />
        </div>
        <div className="flex px-2 w-full justify-between items-center">
          <div className="flex font-semibold">
            <div>단이</div>
            <svg
              className="w-2 mx-1 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="rgb(75 85 99)"
                d="M186 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V172.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L330 256l122 70.4c15.3 8.8 20.5 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7L282 339.1V480c0 17.7-14.3 32-32 32H218c-17.7 0-32-14.3-32-32V339.1L64 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7C-4.5 354.8 .7 335.3 16 326.4L138 256 16 185.6C.7 176.7-4.5 157.2 4.3 141.9l16-27.7C29.1 98.8 48.7 93.6 64 102.4l122 70.4V32z"
              />
            </svg>
            <div>푸들</div>
          </div>
          <Solid className="px-4 py-1 text-pet_pink font-semibold text-sm rounded-2xl">
            프로필 보러가기
          </Solid>
        </div>
      </div>
      <div className="flex flex-col items-center w-1/3 bg-white p-5 rounded-lg mb-4">
        <div className="w-full flex justify-center mb-4">
          <div className="w-1/2 h-40 bg-orange-300" />
          <div className="w-1/2 h-40 bg-red-300" />
        </div>
        <div className="flex px-2 w-full justify-between items-center">
          <div className="flex font-semibold">
            <div>단이</div>
            <svg
              className="w-2 mx-1 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="rgb(75 85 99)"
                d="M186 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V172.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L330 256l122 70.4c15.3 8.8 20.5 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7L282 339.1V480c0 17.7-14.3 32-32 32H218c-17.7 0-32-14.3-32-32V339.1L64 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7C-4.5 354.8 .7 335.3 16 326.4L138 256 16 185.6C.7 176.7-4.5 157.2 4.3 141.9l16-27.7C29.1 98.8 48.7 93.6 64 102.4l122 70.4V32z"
              />
            </svg>
            <div>푸들</div>
          </div>
          <Solid className="px-4 py-1 text-pet_pink font-semibold text-sm rounded-2xl">
            프로필 보러가기
          </Solid>
        </div>
      </div> */}
    </div>
  );
};

export default LookDog;
