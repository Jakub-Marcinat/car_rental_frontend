import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useCallback, useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div`
  background: #2b2b2b;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  width: 420px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ImageWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 8px;
  background: #1e1e1e;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled(Link)`
  font-weight: 600;
  font-size: 1.8rem;
  text-align: center;
  margin: 10px 0;
  color: #f1f1f1;
  text-decoration: none;
`;

const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding-left: 5px;

  gap: 150px;
  margin-top: 10px;
`;

const Price = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: #fff;
`;

export default function ProductContainer({ _id, title, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;

  return (
    <ProductWrapper>
      <ImageWrapper href={url}>
        <img src={images[0]} alt={title} />
      </ImageWrapper>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>{price}€</Price>
          <Button onClick={() => addProduct(_id)} primary={1} size={"l"}>
            Rezervovať
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
