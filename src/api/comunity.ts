import { api } from "./axios";

export interface boardResiter {
  type: string;
  title: string;
  content: string;
  board: File[];
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
  liked: true;
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
    images: [string];
    liked: true;
    likedCount: number;
    commentCount: number;
    createdAt: string;
    type: string;
    mine: boolean;
  };
}
export interface checkLikedInterface {
  resultCode: number;
  data: {
    liked: boolean;
  };
}

export interface editPostInterface {
  title: string;
  type: string;
  content: string;
  deleteImages: File[];
  board: File[];
}

export const comunityResiter = async (
  body: boardResiter,
  accessToken: string
) => {
  console.log(body);
  const formData = new FormData();
  // body?.board.forEach((image) => formData.append("board", image));
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

export const postLiked = async (Id: number, accessToken: string) => {
  try {
    return await api
      .get(`/board/${Id}/like`, {
        headers: {
          "x-access-auth": accessToken,
        },
      })
      .then((res) => res?.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const postEdit = async (
  boardId: number,
  body: editPostInterface,
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
  for (let i = 0; i < body?.deleteImages.length; i++) {
    formData.append("deleteImages", body?.deleteImages[i]);
  }
  for (const value of formData.values()) console.log(value);
  try {
    return await api.patch(`/board/${boardId}`, formData, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const postDelete = async (Id: number, accessToken: string) => {
  try {
    return await api.delete(`/board/${Id}`, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
