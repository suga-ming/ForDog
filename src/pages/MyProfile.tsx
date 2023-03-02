import styled from "styled-components";
import { useQuery } from "react-query";
import { IMyprofile, myProfile } from "../api/user";
import { useRecoilValue } from "recoil";
import { isAccessToken } from "../store/recoil";
import { feedList, IFeedList } from "../api/feed";
import { useState } from "react";
import DetailFeed from "./DetailFeed";

const BoxDiv = styled.div`
  width: 100%;
  &::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
`;
const BoxImg = styled.img`
  width: 100%;
  &::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 30px;
  row-gap: 30px;
`;

const MyProfile = () => {
  const accessToken = useRecoilValue(isAccessToken);
  const [detail, setDetail] = useState(false);
  const [feedId, setFeedId] = useState(0);

  const { isLoading, data } = useQuery<IMyprofile>([`editComment`], () =>
    myProfile(accessToken)
  );

  const { data: feedListData } = useQuery<IFeedList>([`feedList`], () =>
    feedList(accessToken)
  );

  const detailFeed = (Id: number) => {
    setDetail(!detail);
    setFeedId(Id);
  };

  return (
    <>
      {detail ? (
        <div className="flex justify-center">
          <DetailFeed detail={detail} setDetail={setDetail} feedId={feedId} />
        </div>
      ) : null}
      <div className="pt-16 min-h-screen bg-gray-100 relative">
        <div className="flex flex-col mt-10">
          <div className="flex items-center justify-center mb-7">
            {data?.data.image ? (
              <img
                src={data?.data.image}
                alt={data?.data.image}
                className="w-36 h-36 rounded-full"
              />
            ) : (
              <div className="flex justify-center items-center w-36 h-36 rounded-full bg-pet_pink">
                <svg
                  className="w-20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="white"
                    d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
                  />
                </svg>
              </div>
            )}
            <div className="flex flex-col items-start">
              <div className="text-3xl font-semibold px-5">
                {data?.data.nickName}
              </div>
              <div className="flex justify-center">
                <div className="flex items-center px-5 py-3">
                  <div className="mr-1 font-medium">게시물:</div>
                  <div className="font-semibold">{data?.data.feedCount}</div>
                </div>
                <div className="flex items-center px-5 py-3">
                  <div className="mr-1 font-medium">펫친:</div>
                  <div className="font-semibold">{data?.data.friendCount}</div>
                </div>
              </div>
              {isLoading ? (
                <div>is Loading...</div>
              ) : (
                data?.data.myPets &&
                data?.data.myPets.map((p) => (
                  <div
                    className="flex justify-center mb-1 px-5 text-sm"
                    key={p.myPetId}
                  >
                    <svg
                      className="w-3 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="rgba(237, 127, 148)"
                        d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
                      />
                    </svg>
                    <div className="flex">
                      <div className="mr-1">{p.name}:</div>
                      <div>{p.breed}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-2">
          {!feedListData?.data.items.length ? (
            <div className="flex justify-center">
              <div className="flex flex-col items-center justify-center mt-5 w-2/5 h-80">
                <BoxDiv className="flex justify-center items-center border-solid border-2 border-black rounded-full">
                  <svg
                    className="w-1/2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                  </svg>
                </BoxDiv>
                <div className="font-semibold mt-3 text-2xl">게시글 없음</div>
              </div>
            </div>
          ) : (
            <Grid className="w-3/5">
              {feedListData?.data.items.map((i) => (
                <BoxImg
                  className="cursor-pointer"
                  onClick={() => detailFeed(i.feedId)}
                  key={i.feedId}
                  src={i.image}
                />
              ))}
            </Grid>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
