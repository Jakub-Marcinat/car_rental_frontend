import styled from "styled-components";

const Bg = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 60px 0;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 400px;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

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
  font-size: 1.8rem;
  margin: 20px 0 10px;
  font-weight: 600;
`;

const Desc = styled.p`
  color: #ddd;
  font-size: 1rem;
`;

export default function Featured({ product }) {
  return (
    <Bg className="flex gap-8">
      <Card>
        <ImageWrapper>
          <img src="/cars/Arteon 2.0.jpg" alt="Arteon" />
        </ImageWrapper>

        <Title>{product.title}</Title>
        <div className="flex gap-3 text-white/60">
          <p>Automat</p>
          <p>Benzín</p>
          <p>235kW</p>
        </div>
        <a
          className="text-black bg-yellow-500 px-12 py-3 rounded-lg mt-2"
          href={"/products/" + product._id}
        >
          Rezervovať
        </a>
      </Card>

      <Card>
        <ImageWrapper>
          <img src="/cars/Arteon 2.0.jpg" alt="Arteon" />
        </ImageWrapper>
        <Title>{product.title}</Title>
        <div className="flex gap-3 text-white/60">
          <p>Automat</p>
          <p>Benzín</p>
          <p>235kW</p>
        </div>
        <a
          className="text-black bg-yellow-500 px-12 py-3 rounded-lg mt-2"
          href={"/products/" + product._id}
        >
          Rezervovať
        </a>
      </Card>

      <Card>
        <ImageWrapper>
          <img src="/cars/Arteon 2.0.jpg" alt="Arteon" />
        </ImageWrapper>
        <Title>{product.title}</Title>
        <div className="flex gap-3 text-white/60">
          <p>Automat</p>
          <p>Benzín</p>
          <p>235kW</p>
        </div>
        <a
          className="text-black bg-yellow-500 px-12 py-3 rounded-lg mt-2"
          href={"/products/" + product._id}
        >
          Rezervovať
        </a>
      </Card>
    </Bg>
  );
}
