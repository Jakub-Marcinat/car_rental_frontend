import styled from "styled-components";
import { useRouter } from "next/router";

const Bg = styled.div`
  background-color: #0b0a0b;
  color: #fff;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: #151515;
  padding: 20px;
  border-radius: 32px;
  border: 1px solid #2b2b2b;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
  max-width: 320px;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.5);
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 12px;

  img {
    width: 100%;
    border-radius: 12px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  color: #fdd724;
`;

export default function ProductCard({ product }) {
  const { Palivo, Prevodovka, Výkon } = product.properties || {};
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${product.title}`);
  };

  const lowestRentalPrice =
    product.priceListing?.[product.priceListing.length - 1]?.dailyRentalPrice ||
    "N/A";

  return (
    <Bg>
      <Card
        onClick={handleClick}
        className="h-[430px] flex flex-col overflow-hidden"
      >
        <ImageWrapper className="h-48 w-full flex-shrink-0">
          <img
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.title}
            className="object-cover w-full h-full"
          />
        </ImageWrapper>

        <div className="flex flex-col justify-between flex-1 mt-4 w-full">
          <Title className="text-pretty min-h-[2.5rem] line-clamp-2">
            {product.title}
          </Title>

          <div className="flex gap-3 text-white/60 text-sm pt-2 ">
            <p>{Prevodovka || "N/A"}</p>
            <p>{Palivo || "N/A"}</p>
            <p>{Výkon ? `${Výkon} kW` : "N/A"}</p>
          </div>

          <div className="flex justify-between items-end mt-auto">
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
    </Bg>
  );
}
