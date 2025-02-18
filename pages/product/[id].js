import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import styled from "styled-components";

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 40px;
  margin-top: 40px;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 20px;
`;

const Price = styled.span`
  font-size: 1.5rem;
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);

  return (
    <>
      <Header />
      <Center>
        <ColumnWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div className="px-20px">
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>€{product.price}</Price>
              </div>
              <div>
                <Button onClick={() => addProduct(product._id)} primary={1}>
                  Rezervovať
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColumnWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();

  console.log({ query: context.query });
  const { id } = context.query;
  const product = await Product.findById(id);

  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}
