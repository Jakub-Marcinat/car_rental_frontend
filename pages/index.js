import Hero from "@/components/asd";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

import Featured from "@/components/Featured";
import Header from "@/components/Header";

export default function HomePage({ product }) {
  console.log("asdsa", product.title);
  return (
    <div>
      <Header />
      <Hero />
      <Featured product={product} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductsIds = "672b2608187ad6200a382cdb";
  await mongooseConnect();
  const product = await Product.findById(featuredProductsIds);

  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}
