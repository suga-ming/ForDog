import { api } from "./axios";

export interface FeedResiterInterface {
  content: string;
  hashtag: string[];
  feed: File[];
}

export const feedResiter = async (
  body: FeedResiterInterface,
  accessToken: string
) => {
  console.log("body", body);
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
