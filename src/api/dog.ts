import { api } from "./axios";

export interface DogResiterInterface {
  file: any;
  name: string;
  breed: string;
  gender: string;
  birthDay: string;
  togetherDay: string;
}

export interface DogInfoInterface {
  resultCode: number;
  data: {
    items: [
      {
        myPetId: number;
        name: string;
        age: number;
        gender: string;
        breed: string;
        birthDay: string;
        togetherDay: number;
        imagePath: string;
      }
    ];
  };
}
export interface DogEditInterface {
  resultCode: number;
  data: {
    myPetId: number;
    name: string;
    breed: string;
    gender: string;
    imagePath: string;
    birthYear: string;
    birthMonth: string;
    birthDate: string;
    togetherYear: string;
    togetherMonth: string;
    togetherDate: string;
  };
}

export const dogResiter = async (
  body: DogResiterInterface,
  accessToken: string
) => {
  const formData = new FormData();
  formData.append("profile", body?.file);
  formData.append("name", body?.name); // name
  formData.append("breed", body?.breed);
  formData.append("gender", body?.gender);
  formData.append("birthDay", body?.birthDay);
  formData.append("togetherDay", body?.togetherDay);
  try {
    return await api.post("/pet", formData, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const dogInfo = async (accessToken: string) => {
  try {
    return await api
      .get("/pet", {
        headers: {
          "x-access-auth": accessToken,
        },
      })
      .then((res) => res.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const dogEditInfo = async (accessToken: string, petId: number) => {
  try {
    return await api
      .get(`/pet/${petId}`, {
        headers: {
          "x-access-auth": accessToken,
        },
      })
      .then((res) => res.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const editDog = async (
  body: DogResiterInterface,
  accessToken: string,
  petId: number
) => {
  console.log(body);
  try {
    return await api.patch(`/pet/${petId}`, body, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteDog = async (accessToken: string, petId: number) => {
  try {
    return await api.delete(`/pet/${petId}`, {
      headers: {
        "x-access-auth": accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
