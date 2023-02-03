import { api } from "./axios";

export interface boardResiter {
  type: string;
  title: string;
  content: string;
  board: [];
}

// export const dogResiter = async (body: boardResiter, accessToken: string) => {
//   console.log("body", body);
//   const formData = new FormData();
//   formData.append("board", body?.file);
//   formData.append("type", body?.name);
//   formData.append("title", body?.name);
//   formData.append("content", body?.breed);
//   try {
//     return await api.post("/board", formData, {
//       headers: {
//         "x-access-auth": accessToken,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
