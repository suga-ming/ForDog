import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { isLogin } from "../../store/recoil";
import Swal from "sweetalert2";

const PostIt = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(237, 127, 148);
  padding: 40px 50px 160px 50px;
  cursor: pointer;
`;

const Home = () => {
  const navigate = useNavigate();
  const [login] = useRecoilState(isLogin);
  const boxVariants = {
    hover: { scale: 1.2 },
    click: { opacity: 0.8 },
  };
  const goRecord = () => {
    login
      ? navigate("/record")
      : Swal.fire({
          position: "center",
          icon: "warning",
          iconColor: "rgba(237, 127, 148)",
          title: "로그인",
          text: "로그인이 필요한 서비스입니다.",
          showCancelButton: true,
          showConfirmButton: true,
          cancelButtonColor: "rgb(148 163 184)",
          cancelButtonText: "취소",
          confirmButtonText: "로그인",
          confirmButtonColor: "rgba(237, 127, 148)",
          width: "30%",
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/login");
          }
        });
  };

  const goCalendar = () => {
    login
      ? navigate("/calendar")
      : Swal.fire({
          position: "center",
          icon: "warning",
          iconColor: "rgba(237, 127, 148)",
          title: "로그인",
          text: "로그인이 필요한 서비스입니다.",
          showCancelButton: true,
          showConfirmButton: true,
          cancelButtonColor: "rgb(148 163 184)",
          cancelButtonText: "취소",
          confirmButtonText: "로그인",
          confirmButtonColor: "rgba(237, 127, 148)",
          width: "30%",
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/login");
          }
        });
  };
  return (
    <div className="h-screen bg-white flex flex-col justify-end items-center">
      <div className="flex flex-col justify-center items-center">
        <img src={logo} alt={logo} className="w-32 h-32 mb-5" />
        <div className="font-bold text-3xl mb-3 text-black">For Dog</div>
        <div className="text-black font-semibold">
          오직 강아지를 위한 필요한것들이 다 모여있다!!
        </div>
      </div>
      <div className="flex justify-around w-3/5 mt-20">
        <PostIt
          onClick={goRecord}
          variants={boxVariants}
          whileHover="hover"
          whileTap="click"
        >
          <svg
            className="w-16 h-16 mb-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="white"
              d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
            />
          </svg>
          <div className="text-white font-semibold">기록하기</div>
        </PostIt>
        <PostIt
          onClick={() => navigate("/lookDog")}
          variants={boxVariants}
          whileHover="hover"
          whileTap="click"
        >
          <svg
            className="w-16 h-16 mb-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="white"
              d="M309.6 158.5L332.7 19.8C334.6 8.4 344.5 0 356.1 0c7.5 0 14.5 3.5 19 9.5L392 32h52.1c12.7 0 24.9 5.1 33.9 14.1L496 64h56c13.3 0 24 10.7 24 24v24c0 44.2-35.8 80-80 80H464 448 426.7l-5.1 30.5-112-64zM416 256.1L416 480c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V364.8c-24 12.3-51.2 19.2-80 19.2s-56-6.9-80-19.2V480c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V249.8c-28.8-10.9-51.4-35.3-59.2-66.5L1 167.8c-4.3-17.1 6.1-34.5 23.3-38.8s34.5 6.1 38.8 23.3l3.9 15.5C70.5 182 83.3 192 98 192h30 16H303.8L416 256.1zM464 80c0-8.8-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16s16-7.2 16-16z"
            />
          </svg>
          <div className="text-white font-semibold">자랑하기</div>
        </PostIt>
        <PostIt
          onClick={() => navigate("/comunity")}
          variants={boxVariants}
          whileHover="hover"
          whileTap="click"
        >
          <svg
            className="w-16 h-16 mb-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path
              fill="white"
              d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z"
            />
          </svg>
          <div className="text-white font-semibold">커뮤니티</div>
        </PostIt>
        <PostIt
          onClick={goCalendar}
          variants={boxVariants}
          whileHover="hover"
          whileTap="click"
        >
          <svg
            className="w-[60px] h-[60px] mb-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="white"
              d="M216.1 408.1C207.6 418.3 192.4 418.3 183 408.1L119 344.1C109.7 335.6 109.7 320.4 119 311C128.4 301.7 143.6 301.7 152.1 311L200 358.1L295 263C304.4 253.7 319.6 253.7 328.1 263C338.3 272.4 338.3 287.6 328.1 296.1L216.1 408.1zM128 0C141.3 0 152 10.75 152 24V64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0zM400 192H48V448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192z"
            />
          </svg>
          <div className="text-white font-semibold">캘린더</div>
        </PostIt>
      </div>
    </div>
  );
};

export default Home;
