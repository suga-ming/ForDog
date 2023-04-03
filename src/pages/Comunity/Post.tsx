import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  editList,
  ICommentEdit,
  IPostDetailInfo,
  postComment,
  postDelete,
  postDetailInfo,
  postLiked,
} from "../../api/comunity";
import { isAccessToken, isLogin } from "../../store/recoil";
import PostComment from "../../components/PostComment";
import Swal from "sweetalert2";

const PostArea = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 50%;
  margin-bottom: 20px;
  background-color: white;
`;

const Solid = styled.div`
  border-bottom: 1px solid rgb(229 231 235);
`;

const Solid2 = styled.div<{ like: boolean }>`
  border: ${(props) =>
    props.like
      ? "1px solid rgba(237, 127, 148)"
      : "1px solid rgb(229 231 235)"};
`;

const Solid3 = styled.div`
  border-top: 1px solid rgb(229 231 235);
`;

const Solid4 = styled.div`
  border: 1px solid rgb(229 231 235);
`;

const Path = styled.path<{ like: boolean }>`
  fill: ${(props) => (props.like ? "rgba(237, 127, 148)" : "rgb(209 213 219)")};
`;

const Text = styled.div<{ like: boolean }>`
  color: ${(props) => (props.like ? "rgba(237, 127, 148)" : "black")};
  font-weight: ${(props) => (props.like ? "600" : "300")};
`;

const Post = () => {
  // const { isLoading, data } = useQuery<IPostDetailInfo>([`info`], () =>
  //   postDetailInfo(Id, accessToken)
  // );

  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = useRecoilValue(isAccessToken);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [writer, setWriter] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [profile, setProfile] = useState("");
  const [mine, setMine] = useState(false);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [commentCount, setCommentCount] = useState("");

  const [comment, setComment] = useState("");
  const [login] = useRecoilState(isLogin);

  useEffect(() => {
    postDetailInfo(Id, accessToken).then((res) => {
      setLike(res?.data.liked);
      setLikeCount(res?.data.likedCount);
      setWriter(res?.data.writer);
      setType(res?.data.type);
      setCreatedAt(res?.data.createdAt);
      setProfile(res?.data.profile);
      setMine(res?.data.mine);
      setContent(res?.data.content);
      setImages(res?.data.images);
      setCommentCount(res?.data.commentCount);
      setTitle(res?.data.title);
    });
  }, []);
  let { boardId } = useParams();
  const Id = Number(boardId);

  const changeLiked = async () => {
    if (login) {
      const res = await postLiked(Id, accessToken);
      setLike(res?.data.liked);
      setLikeCount(res?.data.likedCount);
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        iconColor: "rgba(237, 127, 148)",
        title: "로그인",
        text: "로그인이 필요한 서비스입니다.",
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonColor: "rgb(148 163 184)",
        cancelButtonText: "취소",
        confirmButtonText: "로그인",
        confirmButtonColor: "rgba(237, 127, 148)",
        width: "30%",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/login");
        }
      });
    }
    // ! 좋아요 누르는 api 선언
  };

  const goComunity = () => {
    navigate("/comunity");
  };

  const goEditPost = () => {
    navigate(`/comunity/editPost/${boardId}`);
  };

  const deletePost = async () => {
    const res = await postDelete(Id, accessToken);
    const resultCode = res?.data.data.resultCode;
    if (resultCode === 1) {
      Swal.fire({
        position: "center",
        icon: "success",
        iconColor: "rgba(237, 127, 148)",
        text: "게시글이 삭제되었습니다.",
        showConfirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "rgba(237, 127, 148)",
        width: "30%",
      });
      navigate("/comunity");
    }
  };

  const resisterComment = async () => {
    if (login) {
      const res = await postComment(Id, comment, accessToken);
      const resultCode = res?.data.data.resultCode;
      if (resultCode === 1) {
        alert("댓글이 작성되었습니다.");
        setComment("");
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        iconColor: "rgba(237, 127, 148)",
        title: "로그인",
        text: "로그인이 필요한 서비스입니다.",
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonColor: "rgb(148 163 184)",
        cancelButtonText: "취소",
        confirmButtonText: "로그인",
        confirmButtonColor: "rgba(237, 127, 148)",
        width: "30%",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  const { data: editCommentData } = useQuery<ICommentEdit>(
    [`editComment`],
    () => editList(Id, accessToken)
  );

  console.log(editCommentData);

  return (
    <>
      <div className="flex flex-col items-center pt-16 h-screen bg-gray-100">
        <div className="flex items-center w-1/2 text-sm bg-white py-3 rounded-xl mt-5 mb-5">
          <svg
            onClick={goComunity}
            className="w-4 py-2 rotate-90 ml-3 mr-2 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
          <div className="font-semibold">{type && type}</div>
        </div>
        <PostArea>
          <div className="max-h-[550px] overflow-y-scroll">
            <Solid className="px-7">
              <div className="flex justify-between mt-5">
                <div className="text-2xl font-semibold mb-2">{title}</div>
                <div className="text-gray-500 text-sm">{createdAt}</div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  {profile && profile ? (
                    <img
                      src={profile}
                      className="flex items-center justify-center w-5 h-5 rounded-full mr-1"
                    ></img>
                  ) : (
                    <div className="flex items-center justify-center w-5 h-5 rounded-full mr-1 bg-pet_pink">
                      <svg
                        className="w-3"
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
                  <div className="text-sm"> {writer}</div>
                </div>
                {mine ? (
                  <div className="flex w-1/4">
                    <Solid4
                      onClick={goEditPost}
                      className="flex justify-center items-center text-sm rounded-full w-full px-2 py-1 mr-2 text-gray-400 cursor-pointer"
                    >
                      수정하기
                    </Solid4>
                    <Solid4
                      onClick={deletePost}
                      className="flex justify-center items-center text-sm rounded-full w-full px-2 py-1  text-gray-400 cursor-pointer"
                    >
                      삭제하기
                    </Solid4>
                  </div>
                ) : null}
              </div>
            </Solid>
            <div className="px-7 mt-8">
              <div className="mb-20">
                <div> {content}</div>
              </div>

              {images &&
                images.map((img) => (
                  <img src={img} alt={img} key={img} className="w-96 h-96" />
                ))}
              <div className="flex justify-between items-center mt-8 mb-6">
                <div className="flex mr-3">
                  <div>공감:</div>
                  <div className="text-gray-500 ml-1">{likeCount}</div>
                </div>
                <Solid2
                  like={like}
                  className="flex py-1 px-1 w-1/5 justify-center cursor-pointer rounded-3xl"
                  onClick={changeLiked}
                >
                  <svg
                    className="w-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <Path
                      like={like}
                      d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
                    />
                  </svg>
                  <Text like={like} className="text-sm">
                    공감해요
                  </Text>
                </Solid2>
              </div>
            </div>
            <div className="mt-4 mb-20">
              <Solid className="flex items-center text-sm px-7 pb-3">
                <div className="text-gray-500">댓글</div>
                <div className="ml-1 text-pet_pink font-semibold">
                  {commentCount}
                </div>
              </Solid>
              {editCommentData?.data.items &&
                editCommentData.data.items.map((item) => (
                  <PostComment
                    key={item.commentId}
                    commentId={item.commentId}
                    writer={item.writer}
                    content={item.content}
                    mine={item.mine}
                    createdAt={item.createdAt}
                    reply={item.reply}
                    profile={item.profile}
                  />
                ))}
            </div>
          </div>
          <Solid3 className="flex justify-between w-full py-3 px-7">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-5/6 pl-2"
              placeholder="댓글을 남겨주세요"
            />
            <div
              onClick={resisterComment}
              className="w-1/6 text-center cursor-pointer text-pet_pink font-semibold"
            >
              입력
            </div>
          </Solid3>
        </PostArea>
      </div>
    </>
  );
};

export default Post;
