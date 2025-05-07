import Filter from "@/components/Filter";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import mongoose from "mongoose";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function VozidlaPage({ products, makes, models }) {
  const [showFilterMobile, setShowFilterMobile] = useState(false);
  const toggleFilterMobile = () => {
    setShowFilterMobile(!showFilterMobile);
  };
  return (
    <div className="w-screen bg-background-image">
      <Header />
      <div className="py-28 text-white text-center">
        <div className="absolute flex left-0 -top-[200px] w-[80%] h-[80%] bg-[#141419] blur-[250px] opacity-50 z-0"></div>
        <h1 className="text-3xl lg:text-5xl font-medium mb-4 text-yellowText z-10 relative">
          Požičovňa aút SK
        </h1>
        <p className="text-sm lg:text-lg mb-2 opacity-70 z-10 relative ">
          Autá na prenájom
        </p>
        <div className="flex justify-center items-center mb-4 z-10 relative">
          <span className="text-yellowText  text-xl mr-1">★★★★☆</span>
          <span className="text-sm">4.0 hodnotení na Google</span>
        </div>
        <div className="flex max-md:hidden md:flex-row justify-around max-w-4xl mx-auto mt-6 px-4 opacity-70">
          <div className="mb-4 md:mb-0">
            <p className="font-semibold text-lg">Bezplatné zrušenie</p>
            <p className="text-sm">rezervácie do 24h</p>
          </div>
          <div className="mb-4 md:mb-0">
            <p className="font-semibold text-lg">Prenájom vozidla na svadbu </p>
            <p className="text-sm">s osobným šoférom </p>
          </div>
          <div className="mb-4 md:mb-0">
            <p className="font-semibold text-lg">Transfer na letisko</p>
            <p className="text-sm">s osobným šoférom</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Dlhodobý/krátkodobý</p>
            <p className="text-sm">prenájom</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center px-20 max-xl:px-8">
        <button
          onClick={toggleFilterMobile}
          className="w-full text-left bg-corklasCard text-white p-3 rounded-2xl shadow-sm mb-4 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>

            <span>Filter vozidiel</span>
            {showFilterMobile ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            )}
          </div>
        </button>

        <div className="w-full flex flex-col lg:max-w-[1600px] max-lg:gap-12 lg:flex-row lg:justify-between">
          <div
            className={`w-full lg:w-1/4 mb-8 lg:mb-0 lg:mr-8 ${
              showFilterMobile ? "block" : "hidden lg:block"
            }`}
          >
            <Filter makes={makes} models={models} />
          </div>
          <div className="w-full lg:w-3/4">
            <ProductsGrid products={products} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { query } = context;

  let filter = {};
  let makeId = null;

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

  if (query.make) {
    makeId = Object.keys(makesMap).find((id) => makesMap[id] === query.make);
  }

  if (query.make) {
    // Find all models belonging to this make
    const modelIds = Object.keys(modelsMap).filter(
      (model) => modelsMap[model] === makeId
    );
    console.log("Model IDs before filtering:", modelIds);

    const modelObjectIds = Object.keys(modelsMap)
      .filter((modelName) => modelsMap[modelName] === makeId)
      .map((modelName) =>
        categories.find((c) => c.name === modelName)?._id?.toString()
      );

    filter.category = {
      $in: modelObjectIds.filter((id) => mongoose.Types.ObjectId.isValid(id)),
    };
  }

  if (query.transmission) filter["properties.Prevodovka"] = query.transmission;
  if (query.fuel) filter["properties.Palivo"] = query.fuel;
  if (query.drive) filter["properties.Náhon"] = query.drive;
  if (query.category) filter.vehicleCategory = query.category;

  if (query.accessories) {
    const selectedAccessories = query.accessories.split(",");
    filter.features = { $all: selectedAccessories };
  }

  if (query.pickupDate && query.dropoffDate) {
    filter.reservations = {
      $not: {
        $elemMatch: {
          reservationSince: { $lt: new Date(query.dropoffDate) },
          reservationUntil: { $gt: new Date(query.pickupDate) },
        },
      },
    };
  }

  let sortOptions = {};
  if (query.order === "asc") sortOptions.price = 1;
  if (query.order === "desc") sortOptions.price = -1;

  const products = await Product.find(filter).sort(sortOptions);

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      makes: Object.values(makesMap),
      models: Object.entries(modelsMap).reduce((acc, [model, makeId]) => {
        const makeName = makesMap[makeId];
        if (!acc[makeName]) acc[makeName] = [];
        acc[makeName].push(model);
        return acc;
      }, {}),
    },
  };
}
