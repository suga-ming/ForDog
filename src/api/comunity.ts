import { api } from "./axios";

export interface BoardResiter {
  type: string;
  title: string;
  content: string;
  board: File[];
}

export interface PostInfoProps {
  type: string;
  limit: number;
}

export interface IPostInfo {
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

export interface IPostDetailInfo {
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
export interface ICheckLiked {
  resultCode: number;
  data: {
    liked: boolean;
  };
}

export interface IEditPost {
  title: string;
  type: string;
  content: string;
  board: File[];
}

export interface CommentProps {
  Id: number;
  comment: string;
}

export interface ICommentEdit {
  resultCode: number;
  data: {
    items: [
      {
        commentId: number;
        writer: string;
        content: string;
        mine: true;
        reply: [
          {
            replyId: number;
            writer: string;
            content: string;
            mine: boolean;
            createdAt: string;
          }
        ];
        createdAt: string;
      }
    ];
  };
}

export interface IReplyData {
  items: [
    {
      replyId: number;
      writer: string;
      content: string;
      mine: boolean;
      createdAt: string;
    }
  ];
}

export const comunityResiter = async (
  body: BoardResiter,
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

export const postInfo = async (body: PostInfoProps, accessToken: string) => {
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
  body: IEditPost,
  accessToken: string
) => {
  const formData = new FormData();
  for (let i = 0; i < body?.board.length; i++) {
    formData.append("board", body?.board[i]);
  }
  formData.append("type", body?.type);
  formData.append("title", body?.title);
  formData.append("content", body?.content);
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

export const postComment = async (
  id: number,
  comment: string,
  accessToken: string
) => {
  console.log(id, comment, accessToken);
  const body = {
    boardId: id,
    content: comment,
  };
  console.log(body);
  try {
    return await api.post("/board/comment", body, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const editList = async (Id: number, accessToken: string) => {
  try {
    return await api
      .get(`/board/comment/${Id}`, {
        headers: {
          "x-access-auth": accessToken,
        },
      })
      .then((res) => res?.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const editComment = async (
  comment: string,
  accessToken: string,
  commentId: number
) => {
  const body = {
    content: comment,
  };
  console.log(body);
  console.log(commentId, "commentId");
  try {
    return await api.patch(`/board/comment/${commentId}`, body, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = async (accessToken: string, commentId: number) => {
  console.log(commentId, "commentId");
  try {
    return await api.delete(`/board/comment/${commentId}`, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const commentReply = async (
  accessToken: string,
  commentId: number,
  reply: string
) => {
  console.log(reply, commentId, accessToken);
  const body = {
    content: reply,
    commentId: commentId,
  };
  console.log(body);
  try {
    return await api.post("/board/comment/reply", body, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const editReply = async (
  comment: string,
  accessToken: string,
  replyId: number
) => {
  const body = {
    content: comment,
  };
  console.log(body);
  try {
    return await api.patch(`/board/comment/reply/${replyId}`, body, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteReply = async (accessToken: string, replyId: number) => {
  try {
    return await api.delete(`/board/comment/reply/${replyId}`, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
