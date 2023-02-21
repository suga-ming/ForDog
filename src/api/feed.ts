import { api } from "./axios";

export interface FeedResiterInterface {
  content: string;
  hashtag: string[];
  feed: File[];
}

export interface FeedListInterface {
  resultCode: number;
  data: {
    items: [
      {
        feedId: number;
        image: string;
      }
    ];
  };
}

export interface FriendFeedListInterface {
  resultCode: number;
  data: {
    items: [
      {
        feedId: number;
        image: string;
      }
    ];
  };
}

export interface IFeedDetail {
  resultCode: number;
  data: {
    feedId: number;
    nickName: string;
    image: [string];
    profileImage: string;
    mine: true;
    feedLiked: true;
    content: string;
    hashtag: [string];
    commentCount: number;
    likedCount: number;
    createdAt: string;
  };
}

export interface IFeedComment {
  resultCode: number;
  data: {
    items: [
      {
        commentId: number;
        writer: string;
        content: string;
        mine: boolean;
        createdAt: string;
        profileImage: string;
      }
    ];
  };
}

export const feedResiter = async (
  body: FeedResiterInterface,
  accessToken: string
) => {
  const formData = new FormData();
  for (let i = 0; i < body?.feed.length; i++) {
    formData.append("feed", body?.feed[i]);
  }
  formData.append("content", body?.content);
  for (let i = 0; i < body?.hashtag.length; i++) {
    formData.append("hashtag", body?.hashtag[i]);
  }
  for (const entries of formData.entries()) {
    console.log("entries", entries);
  }
  try {
    return await api.post("/feed", formData, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const feedList = async (accessToken: string) => {
  try {
    return await api
      .get(`/feed/list`, {
        headers: {
          "x-access-auth": accessToken,
        },
      })
      .then((res) => res?.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const friendFeedList = async (userId: number, accessToken: string) => {
  try {
    return await api
      .get(`/feed/friend/${userId}`, {
        headers: {
          "x-access-auth": accessToken,
        },
      })
      .then((res) => res?.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const feedDetail = async (feedID: number, accessToken: string) => {
  try {
    return await api
      .get(`/feed/${feedID}`, {
        headers: {
          "x-access-auth": accessToken,
        },
      })
      .then((res) => res?.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const feedEdit = async (
  content: string,
  feedID: number,
  accessToken: string
) => {
  const body = {
    content: content,
  };
  try {
    return await api.patch(`/feed/${feedID}`, body, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const feedDelete = async (feedID: number, accessToken: string) => {
  try {
    return await api.delete(`/feed/${feedID}`, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const feedLike = async (feedID: number, accessToken: string) => {
  try {
    return await api
      .get(`/feed/${feedID}/like`, {
        headers: {
          "x-access-auth": accessToken,
        },
      })
      .then((res) => res?.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const feedCommentRegister = async (
  feedId: number,
  content: string,
  accessToken: string
) => {
  const body = {
    feedId: feedId,
    content: content,
  };
  console.log(body);
  try {
    return await api.post("/feed/comment", body, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const feedCommentList = async (feedID: number, accessToken: string) => {
  try {
    return await api
      .get(`/feed/comment/${feedID}`, {
        headers: {
          "x-access-auth": accessToken,
        },
      })
      .then((res) => res?.data.data);
  } catch (err) {
    console.log(err);
  }
};
export const editFeedComment = async (
  content: string,
  commentId: number,
  accessToken: string
) => {
  const body = {
    content: content,
  };
  try {
    return await api.patch(`/feed/comment/${commentId}`, body, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const deleteFeedComment = async (
  commentId: number,
  accessToken: string
) => {
  try {
    return await api.delete(`/feed/comment/${commentId}`, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
