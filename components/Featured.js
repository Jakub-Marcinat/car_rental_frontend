import styled from "styled-components";
import Center from "./Center";
import ButtonLink from "./ButtonLink";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  img {
    max-width: 50%;
  }
`;

export default function Featured({ product }) {
  return (
    <div>
      <Bg>
        <Center>
          <Wrapper>
            <div>
              <img src="/cars/Arteon 2.0.jpg" alt="Arteon" />
            </div>
            <Title>{product ? product.title : "Loading"}</Title>

            <Desc>Automat Benzín 235kW</Desc>
            <ButtonLink href={"/products/" + product._id}>
              Rezervovať
            </ButtonLink>
          </Wrapper>
        </Center>
      </Bg>
    </div>
  );
}
