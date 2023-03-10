import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { emailSignUp, ISignUp } from "../../api/user";
import Swal from "sweetalert2";

const Input = styled.input`
  border: 1px solid gray;
  border-radius: 5px;
  height: 35px;
  margin-top: 7px;
  padding-left: 10px;
  ::placeholder {
    font-size: 13px;
  }
`;

const Email = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISignUp>();
  const onSubmit = async (data: ISignUp) => {
    const res = await emailSignUp(data);
    const resultCode = res?.data.data.resultCode;
    if (resultCode === 1) {
      reset({
        email: "",
        password: "",
        name: "",
        phone: "",
        nickName: "",
      });
      Swal.fire({
        position: "center",
        icon: "success",
        iconColor: "rgba(237, 127, 148)",
        title: "회원가입 성공",
        showConfirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "rgba(237, 127, 148)",
        width: "30%",
      });
      navigate("/login");
    } else if (resultCode === 1001) {
      Swal.fire({
        position: "center",
        icon: "warning",
        iconColor: "rgba(237, 127, 148)",
        text: "존재하는 계정입니다",
        showConfirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "rgba(237, 127, 148)",
        timer: 1500,
        width: "30%",
      });
    } else if (resultCode === 1101) {
      Swal.fire({
        position: "center",
        icon: "warning",
        iconColor: "rgba(237, 127, 148)",
        text: "회원가입을 실패했습니다",
        showConfirmButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "rgba(237, 127, 148)",
        timer: 1500,
        width: "30%",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-screen flex-col items-center justify-center"
    >
      <div className="font-semibold text-xl">회원 정보 입력</div>
      <article className="flex flex-col w-72 mt-7">
        <div className="flex items-center">
          <label>아이디</label>
          <svg
            className="w-2 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="rgba(237, 127, 148)"
              d="M208 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V172.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L352 256l122 70.4c15.3 8.8 20.5 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7L304 339.1V480c0 17.7-14.3 32-32 32H240c-17.7 0-32-14.3-32-32V339.1L86 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7c-8.8-15.3-3.6-34.9 11.7-43.7L160 256 38 185.6c-15.3-8.8-20.5-28.4-11.7-43.7l16-27.7C51.1 98.8 70.7 93.6 86 102.4l122 70.4V32z"
            />
          </svg>
        </div>
        <Input
          {...register("email", {
            required: "아이디를 입력해주세요",
          })}
          placeholder="ex) love1234@naver.com"
        />
        <span className="mt-1 ml-1 text-xs text-red-500">
          {errors?.email?.message}
        </span>
      </article>
      <article className="flex flex-col w-72 mt-3">
        <div className="flex items-center">
          <label>비밀번호</label>
          <svg
            className="w-2 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="rgba(237, 127, 148)"
              d="M208 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V172.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L352 256l122 70.4c15.3 8.8 20.5 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7L304 339.1V480c0 17.7-14.3 32-32 32H240c-17.7 0-32-14.3-32-32V339.1L86 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7c-8.8-15.3-3.6-34.9 11.7-43.7L160 256 38 185.6c-15.3-8.8-20.5-28.4-11.7-43.7l16-27.7C51.1 98.8 70.7 93.6 86 102.4l122 70.4V32z"
            />
          </svg>
        </div>
        <Input
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: { value: 5, message: "5글자이상 입력해주세요" },
          })}
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <span className="mt-1 ml-1 text-xs text-red-500">
          {errors?.password?.message}
        </span>
      </article>
      <article className="flex flex-col w-72 mt-3">
        <div className="flex items-center">
          <label>이름</label>
          <svg
            className="w-2 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="rgba(237, 127, 148)"
              d="M208 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V172.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L352 256l122 70.4c15.3 8.8 20.5 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7L304 339.1V480c0 17.7-14.3 32-32 32H240c-17.7 0-32-14.3-32-32V339.1L86 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7c-8.8-15.3-3.6-34.9 11.7-43.7L160 256 38 185.6c-15.3-8.8-20.5-28.4-11.7-43.7l16-27.7C51.1 98.8 70.7 93.6 86 102.4l122 70.4V32z"
            />
          </svg>
        </div>
        <Input
          {...register("name", {
            required: "이름을 입력해주세요",
            minLength: { value: 2, message: "2글자이상 입력해주세요" },
          })}
          placeholder="이름을 입력해주세요"
        />
        <span className="mt-1 ml-1 text-xs text-red-500">
          {errors?.name?.message}
        </span>
      </article>
      <article className="flex flex-col w-72 mt-3">
        <div className="flex items-center">
          <label>핸드폰번호</label>
          <svg
            className="w-2 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="rgba(237, 127, 148)"
              d="M208 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V172.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L352 256l122 70.4c15.3 8.8 20.5 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7L304 339.1V480c0 17.7-14.3 32-32 32H240c-17.7 0-32-14.3-32-32V339.1L86 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7c-8.8-15.3-3.6-34.9 11.7-43.7L160 256 38 185.6c-15.3-8.8-20.5-28.4-11.7-43.7l16-27.7C51.1 98.8 70.7 93.6 86 102.4l122 70.4V32z"
            />
          </svg>
        </div>
        <Input
          {...register("phone", {
            required: "핸드폰 번호를 입력해주세요",
            minLength: { value: 10, message: "10글자이상 입력해주세요" },
          })}
          placeholder="ex) 01012345678"
        />
        <span className="mt-1 ml-1 text-xs text-red-500">
          {errors?.phone?.message}
        </span>
      </article>
      <div className="h-px w-72 mt-5 bg-gray-300" />
      <article className="flex flex-col w-72 mt-5">
        <div className="flex items-center">
          <label>닉네임</label>
          <svg
            className="w-2 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="rgba(237, 127, 148)"
              d="M208 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V172.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L352 256l122 70.4c15.3 8.8 20.5 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7L304 339.1V480c0 17.7-14.3 32-32 32H240c-17.7 0-32-14.3-32-32V339.1L86 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7c-8.8-15.3-3.6-34.9 11.7-43.7L160 256 38 185.6c-15.3-8.8-20.5-28.4-11.7-43.7l16-27.7C51.1 98.8 70.7 93.6 86 102.4l122 70.4V32z"
            />
          </svg>
        </div>
        <Input
          {...register("nickName", {
            required: "닉네임을 입력해주세요",
          })}
          placeholder="사용하실 닉네임을 입력해주세요"
        />
        <span className="mt-1 ml-1 text-xs text-red-500">
          {errors?.nickName?.message}
        </span>
      </article>
      <button className="mt-6 w-72 bg-pet_pink max-w-[318px] h-11 rounded-lg text-white flex justify-center items-center font-semibold">
        가입하기
      </button>
    </form>
  );
};

export default Email;
