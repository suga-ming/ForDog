import { api } from "./axios";

export interface IFriendProfile {
  resultCode: number;
  data: {
    userId: number;
    nickName: string;
    feedCount: number;
    friendCount: number;
    friendStatus: number;
    image: string;
    myPets: [
      {
        myPetId: number;
        breed: string;
        name: string;
      }
    ];
  };
}

export interface IFriendRequestList {
  resultCode: number;
  data: {
    items: [
      {
        friendId: number;
        image: string;
        nickName: string;
      }
    ];
  };
}

export const friendProfile = async (userId: number, accessToken: string) => {
  try {
    return await api
      .get(`/user/profile/friend/${userId}`, {
        headers: {
          "x-access-auth": accessToken,
        },
      })
      .then((res) => res?.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const friendRequest = async (friendId: number, accessToken: string) => {
  const body = {
    friendId: friendId,
  };
  try {
    return await api.post(`/friend`, body, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const friendRequestList = async (accessToken: string) => {
  try {
    return await api
      .get(`/friend/request`, {
        headers: {
          "x-access-auth": accessToken,
        },
      })
      .then((res) => res?.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const friendRequestAccept = async (
  friendId: number,
  accessToken: string
) => {
  console.log(friendId);
  try {
    return await api.get(`/friend/confirmed/${friendId}`, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const friendDelete = async (friendId: number, accessToken: string) => {
  try {
    return await api.delete(`/friend/${friendId}`, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
