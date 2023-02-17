import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const BoxDiv = styled.div`
    width: 30%;
    &::after {
      display: block;
      content: "";
      padding-bottom: 100%;
    }
  `;
  return (
    <div className="pt-20">
      <div>dd</div>
      <div className="">
        <Slider {...settings}>
          <div className="bg-gray-300 w-20 h-20 flex justify-center items-center rounded-tl-lg rounded-bl-lg">
            <div className="flex flex-col items-center">
              <svg
                className="w-1/4 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="white"
                  d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
                />
              </svg>
              <div className="bg-gray-400 text-white font-semibold w-1/4 text-center py-1 rounded-lg cursor-pointer">
                사진 선택
              </div>
            </div>
          </div>
          <div>
            <h3 className="w-10 h-10 bg-red-300">2</h3>
          </div>
          <div>
            <h3 className="w-10 h-10 bg-red-300">3</h3>
          </div>
          <div>
            <h3 className="w-10 h-10 bg-red-300">4</h3>
          </div>
          <div>
            <h3 className="w-10 h-10 bg-red-300">5</h3>
          </div>
          <div>
            <h3 className="w-10 h-10 bg-red-300">6</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
