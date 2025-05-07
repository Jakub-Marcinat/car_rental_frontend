import styled from "styled-components";
import { useRouter } from "next/router";

const Bg = styled.div`
  background-color: #0b0a0b;
  color: #fff;
  padding: 60px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: #151515;
  color: #fff;
  padding: 20px;
  border-radius: 32px;
  border: 1px solid #2b2b2b;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
  text-align: left;
  width: 350px;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 12px;

  img {
    width: 100%;
    border-radius: 12px;

    &:hover {
    }
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin: 20px 0 4px;
  font-weight: 600;
  display: flex;
`;

export default function Featured({ product }) {
  const { Palivo, Prevodovka, Výkon } = product.properties || {};
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${product._id}`);
  };
  const lowestRentalPrice =
    product.priceListing?.[product.priceListing.length - 1]?.dailyRentalPrice ||
    "N/A";

  return (
    <Card
      onClick={handleClick}
      className="transition-all hover:scale-[1.02] duration-200"
    >
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
            <span className="text-3xl opacity-100 text-corklasRed">
              {lowestRentalPrice}€
              <span className="opacity-70 text-2xl text-white"> / deň</span>
            </span>
          </p>

          <button
            className="flex items-center rounded-full border border-[#2b2b2b] px-4 py-4"
            onClick={() => router.push(`/rezervacia?id=${product._id}`)}
          >
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
          </button>
        </div>
      </div>
    </Card>
  );
}
