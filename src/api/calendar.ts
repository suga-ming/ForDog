import { api } from "./axios";

export interface ITodoRegister {
  date: string;
  name: string;
}

export interface ITodoList {
  todoId: number;
  content: string;
  date: string;
  status: string;
}

export interface IEditTodo {
  todoId: number;
  content: string;
  date: string;
  status: string;
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

export const getTodoList = async (accessToken: string) => {
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

export const dateTodo = async (accessToken: string, date: string) => {
  try {
    return await api
      .get(`/todo/date?date=${date}`, {
        headers: {
          "x-access-auth": accessToken,
        },
      })
      .then((res) => res?.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const editTodo = async (
  content: string,
  accessToken: string,
  todoId: number
) => {
  const body = {
    content: content,
  };
  try {
    return await api.patch(`/todo/${todoId}`, body, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
