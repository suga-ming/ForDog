import { api } from "./axios";

export interface SignUpInterface {
  email: string;
  password: string;
  name: string;
  nickName: string;
  phone: string;
}

export interface SignInInterface {
  email: string;
  password: string;
}

export const emailSignUp = async (body: SignUpInterface) => {
  try {
    return await api.post("/user/signUp/email", body);
  } catch (err) {
    console.log(err);
  }
};

export const emailSignIn = async (body: SignInInterface) => {
  try {
    return await api.post("/auth/email/signIn", body);
  } catch (err) {
    console.log(err);
  }
};
