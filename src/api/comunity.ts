import { api } from "./axios";

export interface boardResiter {
  type: string;
  title: string;
  content: string;
  board: string[];
}

export interface postInfoProps {
  type: string;
  limit: number;
}

export interface postInfoInterface {
  boardId: number;
  writer: string;
  image: string;
  title: string;
  content: string;
  liked: boolean;
  likedCount: number;
  createdAt: string;
  commentCount: number;
}

export interface postDetailInfoInterface {
  resultCode: number;
  data: {
    boardId: number;
    writer: string;
    title: string;
    content: string;
    images: [];
    liked: true;
    likedCount: number;
    commentCount: number;
    createdAt: string;
    type: string;
  };
}

export const comunityResiter = async (
  body: boardResiter,
  accessToken: string
) => {
  console.log(body);
  const formData = new FormData();

  for (let i = 0; i < body?.board.length; i++) {
    formData.append("board", body?.board[i]);
  }
  formData.append("type", body?.type);
  formData.append("title", body?.title);
  formData.append("content", body?.content);
  for (const value of formData.values()) console.log(value);

  try {
    return await api.post("/board", formData, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const postInfo = async (body: postInfoProps, accessToken: string) => {
  try {
    return await api.post("/board/list", body, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const postDetailInfo = async (Id: number, accessToken: string) => {
  try {
    return await api
      .get(`/board/${Id}`, {
        headers: {
          "x-access-auth": accessToken,
        },
      })
      .then((res) => res?.data.data);
  } catch (err) {
    console.log(err);
  }
};
