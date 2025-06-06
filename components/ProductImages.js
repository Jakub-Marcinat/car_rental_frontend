import { useState } from "react";
import styled from "styled-components";

const Image = styled.img`
  max-width: 100%;
  border-radius: 5px;
`;

const BigImage = styled.img`
  max-width: 100%;
  border-radius: 12px;
`;

const BigImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageButtons = styled.div`
  display: grid;
  margin-top: 10px;
  justify-self: center;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  padding: 10px 0 20px 0;
`;

const ImageButton = styled.div`
  border: 2px solid #aaa;
  ${(props) =>
    props.active
      ? "border-color: #ccc;"
      : "border-color: transparent; opacity: .5;"}
  cursor: pointer;
  border-radius: 5px;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image, index) => (
          <ImageButton
            key={index}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
