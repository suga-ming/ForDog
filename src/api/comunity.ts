import { api } from "./axios";

export interface boardResiter {
  type: string;
  title: string;
  content: string;
  board: string[];
}

export const comunityResiter = async (
  body: boardResiter,
  accessToken: string
) => {
  const formData = new FormData();

  //   body?.board.forEach((image) => formData.append("board", image));

  for (let i = 0; i < body?.board.length; i++) {
    formData.append("board", body?.board[i]);
  }

  formData.append("type", body?.type);
  formData.append("title", body?.title);
  formData.append("content", body?.content);

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
