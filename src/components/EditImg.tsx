import React from "react";
import styled from "styled-components";

const ImgBox = styled.img`
  /* width: 18.7%; */
  background-color: skyblue;
  margin-right: 1.5%;
  ::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
  &:last-child {
    margin: 0;
  }
`;

export interface ImgProps {
  image: string;
  id: number;
}

const EditImg = ({ image, id }: ImgProps) => {
  const handleDeleteImage = () => {
    // setBoard(board.filter((_, index) => index !== id));
  };
  return (
    <div className="w-full relative">
      <ImgBox src={image} alt={`${image}-${id}`} />
      <div
        className="absolute top-0 right-1 text-red-400 font-semibold cursor-pointer"
        onClick={handleDeleteImage}
      >
        x
      </div>
    </div>
  );
};

export default EditImg;
