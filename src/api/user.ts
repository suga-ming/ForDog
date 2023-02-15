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

export interface UserInfoInterface {
  resultCode: number;
  data: {
    email: string;
    name: string;
    phone: string;
    nickName: string;
    registType: string;
  };
}

export interface InfoEditInterface {
  password: string;
  name: string;
  nickName: string;
  phone: string;
}

export interface RandomUserInterface {
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

export interface FriendProfileInterface {
  resultCode: number;
  data: {
    userId: number;
    nickName: string;
    feedCount: number;
    freindCount: number;
    myPets: {
      myPetId: number;
      breed: string;
      name: string;
    };
  };
}

export const kakaoSignIn = async () => {
  try {
    return await api.get("/auth/kakao").then((res) => console.log(res));
  } catch (err) {
    console.log(err);
  }
};

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

export const userInfoEdit = async (
  body: InfoEditInterface,
  accessToken: string
) => {
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

export const userRandom = async () => {
  try {
    return await api.get("/user").then((res) => res?.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const friendProfile = async (userId: number) => {
  try {
    return await api
      .get(`/user/profile/friend/${userId}`)
      .then((res) => res?.data.data);
  } catch (err) {
    console.log(err);
  }
};
