import { api } from "./axios";

export interface ITodoRegister {
  date: string;
  name: string;
}

export const todoRegister = async (name: string, date: string) => {
  console.log(name, date);
  const body = {
    date: date,
    content: name,
  };
  try {
    return await api.post("/todo", body);
  } catch (err) {
    console.log(err);
  }
};

export const todoList = async (body: ITodoRegister) => {
  try {
    return await api.post("/todo/date", body);
  } catch (err) {
    console.log(err);
  }
};
