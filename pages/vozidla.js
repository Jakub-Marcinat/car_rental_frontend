import Filter from "@/components/Filter";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function VozidlaPage({ products }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center ">
        <Title>Vozidla</Title>
        <div className="flex justify-between w-full px-24">
          <Filter />
          <ProductsGrid products={products} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { query } = context;
  
  let filter = {};
  
  // Apply filters based on query parameters
  if (query.make) filter.make = query.make;
  if (query.transmission) filter.transmission = query.transmission;
  if (query.fuel) filter.fuel = query.fuel;
  if (query.category) filter.category = query.category;

  // Filtering by reservation dates
  if (query.pickupDate && query.dropoffDate) {
    filter.$or = [
      { reservationSince: { $gt: query.dropoffDate } },
      { reservationUntil: { $lt: query.pickupDate } }
    ];
  }

  // Sorting by price
  let sortOptions = {};
  if (query.order === "asc") sortOptions.price = 1;
  if (query.order === "desc") sortOptions.price = -1;

  // Fetch products with filtering
  const products = await Product.find(filter, null, { sort: sortOptions });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

