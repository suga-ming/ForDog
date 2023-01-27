import { api } from "./axios";

export const dogInfo = async (accessToken: string) => {
  try {
    return await api.get("/pet", {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
