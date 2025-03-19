import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

import Featured from "@/components/Featured";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewProducts from "@/components/Newproducts";

export default function HomePage({ featuredProducts, newProducts }) {
  return (
    <div>
      {/* <Header /> */}
      <Hero />
      <div className="flex w-full justify-between bg-corklasBackground p-20">
        {featuredProducts.map((product) => (
          <Featured key={product._id} product={product} />
        ))}
      </div>

      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductsIds = [
    "67a3dc3f82c364b5dd39017d",
    "67a3dc7f82c364b5dd390197",
    "67a3dc3f82c364b5dd39017d",
    "672b2608187ad6200a382cdb",
    "672b2608187ad6200a382cdb",
    "672b2608187ad6200a382cdb",
  ];
  await mongooseConnect();
  const featuredProducts = await Product.find({
    _id: { $in: featuredProductsIds },
  });
  const newProducts = await Product.find({}, null, { limit: 3 });

  return {
    props: {
      featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
