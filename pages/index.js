import Hero from "@/components/asd";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="text-red-300">asdasd</div>
    </div>
  );
}

export async function getServerSideProps() {
  const productsIds = "672b2608187ad6200a382cdb";
  await mongooseConnect();
  const product = await Product.findById(productsIds);

  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}

import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({ product }) {
  console.log("asdsa", product.title);
  return (
    <div>
      <Header />
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
