import { api } from "./axios";

export interface ISignUp {
  email: string;
  password: string;
  name: string;
  nickName: string;
  phone: string;
}

export interface IKakaoSignUp {
  email?: string;
  name: string;
  nickName: string;
  phone: string;
  accountId?: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IInfoEdit {
  password: string;
  name: string;
  nickName: string;
  phone: string;
}

export interface IRandomUser {
  resultCode: number;
  data: {
    items: [
      {
        userId: number;
        breed: string;
        image: string;
        name: string;
      }
    ];
  };
}

export interface IMyprofile {
  resultCode: number;
  data: {
    userId: number;
    nickName: string;
    image: string;
    feedCount: number;
    friendCount: number;
    myPets: [
      {
        myPetId: number;
        breed: string;
        name: string;
      }
    ];
  };
}

export const kakaoSignIn = async () => {
  try {
    return await api.get("/auth/kakao").then((res) => console.log(res));
  } catch (err) {
    console.log(err);
  }
};

export const emailSignUp = async (body: ISignUp) => {
  try {
    return await api.post("/user/signUp/email", body);
  } catch (err) {
    console.log(err);
  }
};

export const kakaoSignUp = async (body: IKakaoSignUp) => {
  try {
    return await api.post("/user/signUp/social", body);
  } catch (err) {
    console.log(err);
  }
};

export const emailSignIn = async (body: ISignIn) => {
  try {
    return await api.post("/auth/email/signIn", body);
  } catch (err) {
    console.log(err);
  }
};

export const userInfo = async (accessToken: string) => {
  try {
    return await api.get("/user/info", {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const userInfoEdit = async (body: IInfoEdit, accessToken: string) => {
  try {
    return await api.patch("/user/update", body, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (accessToken: string) => {
  try {
    return await api.delete("/user/delete", {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const userRandom = async (accessToken: string) => {
  try {
    return await api
      .get("/user", {
        headers: {
          "x-access-auth": accessToken,
        },
      })
      .then((res) => res?.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const myProfile = async (accessToken: string) => {
  try {
    return await api
      .get(`/user/profile`, {
        headers: {
          "x-access-auth": accessToken,
        },
      })
      .then((res) => res?.data.data);
  } catch (err) {
    console.log(err);
  }
};
