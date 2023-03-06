import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IRandomUser, userRandom } from "../../api/user";
import { isAccessToken } from "../../store/recoil";

const Solid3 = styled.div`
  border-left: 1px solid rgb(156 163 175);
  border-right: 1px solid rgb(156 163 175);
`;

const RoundImg = styled.img`
  border-top: 1px solid rgb(156 163 175);
  border-left: 1px solid rgb(156 163 175);
  border-right: 1px solid rgb(156 163 175);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
const RoundDiv = styled.div`
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
`;

const LookDog = () => {
  const navigate = useNavigate();
  const accessToken = useRecoilValue(isAccessToken);
  const goProfile = (userId: number) => {
    navigate("/friendProfile", { state: { userId: userId } });
  };
  const { isLoading, data } = useQuery<IRandomUser>([`random`], () =>
    userRandom(accessToken)
  );

  return (
    <div className="pt-24 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="font-semibold text-2xl mt-8 mb-8">
        다른 강아지 구경하기
      </div>
      {isLoading ? (
        <div>is Loading...</div>
      ) : (
        <Grid className="w-2/5 flex">
          {data?.data.items.map((item) => (
            <div className="bg-white rounded-lg" key={item.userId}>
              {item?.image ? (
                <RoundImg
                  src={item.image}
                  className="w-full h-40 rounded-t-lg"
                />
              ) : (
                <RoundDiv className="w-full flex justify-center items-center h-40 bg-pet_pink rounded-t-lg">
                  <svg
                    className="w-16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="white"
                      d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
                    />
                  </svg>
                </RoundDiv>
              )}

              <Solid3 className="flex w-full py-2 justify-center font-semibold">
                <div>{item.name}</div>
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
                <div>{item.breed}</div>
              </Solid3>
              <Solid4
                onClick={() => goProfile(item.userId)}
                className="w-full text-center px-4 py-2 bg-pet_pink text-white font-semibold text-sm cursor-pointer"
              >
                프로필 보러가기
              </Solid4>
            </div>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default LookDog;
