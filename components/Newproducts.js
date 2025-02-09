import styled from "styled-components";
import Center from "./Center";
import ProductContainer from "./ProductContainer";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three items per row */
  gap: 30px;
  padding-top: 40px;
  align-items: center;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* Two per row on tablets */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr); /* One per row on mobile */
  }
`;

const Bg = styled.div`
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  padding: 60px 0;
  display: flex;
  justify-content: center;
`;

export default function NewProducts({ products }) {
  return (
    <Bg>
      <ProductsGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductContainer key={product._id} {...product} />
          ))}
      </ProductsGrid>
    </Bg>
  );
}
