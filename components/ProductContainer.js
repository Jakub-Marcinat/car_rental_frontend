import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useCallback, useContext } from "react";
import { CartContext } from "./CartContext";
import { useRouter } from "next/router";

const Card = styled.div`
  background: #151515;
  padding: 20px;
  border-radius: 32px;
  border: 1px solid #2b2b2b;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 350px;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.5);
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

export default function ProductContainer({ product }) {
  console.log("sad", product);

  const { addProduct } = useContext(CartContext);
  const url = "/product/" + product._id;
  const router = useRouter();

  const { Palivo, Prevodovka, Výkon } = product.properties || {};

  const lowestRentalPrice =
    product.priceListing?.[product.priceListing.length - 1]?.dailyRentalPrice ||
    "N/A";

  return (
    <Card>
      <ImageWrapper>
        <img
          src={product.images[0] || "/placeholder.jpg"}
          alt={product.title}
        />
      </ImageWrapper>
      <div className="flex flex-col w-full">
        <Title>{product.title}</Title>
        <div className="flex gap-3 text-white/60 text-sm mb-4">
          <p>{Prevodovka || "N/A"}</p>
          <p>{Palivo || "N/A"}</p>
          <p>{Výkon ? `${Výkon} kW` : "N/A"}</p>
        </div>

        <div className="flex justify-between items-end">
          <p>
            <span className="opacity-70">od </span>
            <span className="text-3xl opacity-100 text-corklasYellow">
              {lowestRentalPrice}€
              <span className="opacity-70 text-2xl text-white"> / deň</span>
            </span>
          </p>
          <div className="flex items-center rounded-full border border-[#2b2b2b] px-4 py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <Button
            onClick={() => router.push(`/rezervacia?id=${product._id}`)}
            primary={1}
            size={"l"}
          >
            Rezervovať
          </Button>
        </div>
      </div>
    </Card>
  );
}
