import { api } from "./axios";

export interface ITodoRegister {
  date: string;
  name: string;
}

export const todoRegister = async (
  accessToken: string,
  content: string,
  date: string
) => {
  const body = {
    date: date,
    content: content,
  };
  try {
    return await api.post("/todo", body, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const todoList = async (accessToken: string) => {
  try {
    return await api
      .get(`/todo`, {
        headers: {
          "x-access-auth": accessToken,
        },
      })
      .then((res) => res?.data.data);
  } catch (err) {
    console.log(err);
  }
};
