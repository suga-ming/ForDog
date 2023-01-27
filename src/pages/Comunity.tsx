import styled from "styled-components";

const BoderBox = styled.div`
  border: 1px solid rgb(209 213 219);
  border-radius: 5px;
  color: rgb(107 114 128);
  font-size: 13px;
  padding: 13px 0;
  width: 18%;
  text-align: center;
  margin-right: 12px;
`;

const Comunity = () => {
  return (
    <div className="pt-16">
      <div className="flex w-full justify-center mt-5">
        <BoderBox>일상생활</BoderBox>
        <BoderBox>정보공유</BoderBox>
        <BoderBox>궁금해요</BoderBox>
      </div>
    </div>
  );
};

export default Comunity;
