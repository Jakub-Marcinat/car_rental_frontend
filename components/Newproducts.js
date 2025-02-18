import styled from "styled-components";
import ProductsGrid from "./ProductsGrid";

const Bg = styled.div`
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  padding: 40px 0;
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 20px 0 20px;
  font-weight: normal;
`;

export default function NewProducts({ products }) {
  return (
    <Bg>
      <div className="flex flex-col justify-center">
        <Title>Novinky</Title>
        <ProductsGrid products={products} />
      </div>
    </Bg>
  );
}
