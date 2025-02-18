import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  padding: 20px;
  width: 100%;
`;

export default function VozidlaPage({ products }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center ">
        <Title>Products</Title>
        <ProductsGrid products={products} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
