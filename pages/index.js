import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

import Featured from "@/components/Featured";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewProducts from "@/components/Newproducts";

export default function HomePage({ featuredProduct, newProducts }) {
  console.log("asdsa", { newProducts });
  return (
    <div>
      {/* <Header /> */}
      <Hero />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductsIds = "67a3dc7f82c364b5dd390197";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductsIds);
  const newProducts = await Product.find({}, null, { limit: 3 });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
