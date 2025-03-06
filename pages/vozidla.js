import Filter from "@/components/Filter";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import mongoose from "mongoose";

export default function VozidlaPage({ products, makes, models }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center ">
        <Title>Vozidla</Title>
        <div className="flex justify-between w-full px-24">
          <Filter makes={makes} models={models} />
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
  let makeId = null;

  // ✅ Get All Categories (Makes & Models)
  const categories = await Category.find();
  const makesMap = {};
  const modelsMap = {};

  categories.forEach((category) => {
    if (category.type === "make") {
      makesMap[category._id.toString()] = category.name;
    } else if (category.type === "model" && category.parent) {
      modelsMap[category.name] = category.parent.toString();
    }
  });

  // ✅ Convert Make Name to Make ID for Filtering
  if (query.make) {
    makeId = Object.keys(makesMap).find((id) => makesMap[id] === query.make);
  }

  // ✅ Apply Filtering Based on Query Params
  if (query.make) {
    // Find all models belonging to this make
    const modelIds = Object.keys(modelsMap).filter(
      (model) => modelsMap[model] === makeId
    );
    console.log("Model IDs before filtering:", modelIds);

    const modelObjectIds = Object.keys(modelsMap)
      .filter((modelName) => modelsMap[modelName] === makeId) // ✅ Get models belonging to make
      .map((modelName) =>
        categories.find((c) => c.name === modelName)?._id?.toString()
      ); // ✅ Get ObjectId

    filter.category = {
      $in: modelObjectIds.filter((id) => mongoose.Types.ObjectId.isValid(id)),
    };
  }

  if (query.transmission) filter["properties.Prevodovka"] = query.transmission;
  if (query.fuel) filter["properties.Palivo"] = query.fuel;
  if (query.drive) filter["properties.Náhon"] = query.drive;
  if (query.category) filter.vehicleCategory = query.category;

  // ✅ Handle Reservation Dates Properly
  if (query.pickupDate && query.dropoffDate) {
    filter.$or = [
      { reservationSince: { $gt: query.dropoffDate } }, // Available after dropoff date
      { reservationUntil: { $lt: query.pickupDate } }, // Available before pickup date
    ];
  }

  // ✅ Sorting by Price
  let sortOptions = {};
  if (query.order === "asc") sortOptions.price = 1;
  if (query.order === "desc") sortOptions.price = -1;

  // ✅ Fetch Products with Filters
  const products = await Product.find(filter).sort(sortOptions);

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      makes: Object.values(makesMap), // Pass makes to frontend
      models: Object.entries(modelsMap).reduce((acc, [model, makeId]) => {
        const makeName = makesMap[makeId]; // Get make name
        if (!acc[makeName]) acc[makeName] = [];
        acc[makeName].push(model);
        return acc;
      }, {}),
    },
  };
}
