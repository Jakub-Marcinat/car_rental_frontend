import { useContext } from "react";
import { CartContext } from "./CartContext";
import MainHeader from "./MainHeader";

export default function Hero() {
  const { cartProducts } = useContext(CartContext);

  return (
    <main className="bg-hero-pattern bg-cover bg-center bg-no-repeat w-full h-screen text-white flex flex-col">
      <MainHeader />

      {/* Hero Content */}
      <div className="flex-grow flex flex-col justify-between items-center p-6">
        <div className="flex justify-between text-center w-full">
          <div className="max-w-xl"></div>
        </div>

        {/* Booking Section */}
        <div className="bg-gray-900 bg-opacity-80 px-12 py-8 mb-12 rounded-xl w-11/12 max-w-[1000px]">
          <div className="grid grid-cols-3 gap-4 max-md:flex max-md:flex-col *:">
            <div className="flex flex-col">
              <label className="max-xl:text-xl font-semibold mb-2 ml-1">
                Adresa vyzdvihnutia
              </label>
              <input
                type="text"
                placeholder="Trenčín"
                className="px-4 py-2 rounded-lg max-xl:text-xl bg-gray-800 border border-gray-700 focus:ring focus:ring-yellow-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="max-xl:text-xl font-semibold mb-2">
                Dátum vyzdvihnutia
              </label>
              <input
                type="date"
                className="px-4 py-2 rounded-lg max-xl:text-xl bg-gray-800 border border-gray-700 focus:ring focus:ring-yellow-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="max-xl:text-xl font-semibold mb-2">
                Dátum vrátenia
              </label>
              <input
                type="date"
                className="px-4 py-2 rounded-lg max-xl:text-xl bg-gray-800 border border-gray-700 focus:ring focus:ring-yellow-500"
              />
            </div>
            {/* <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2">Pick Up Time</label>
              <input
                type="time"
                className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring focus:ring-yellow-500"
              />
            </div> */}
          </div>
          <div className="flex justify-end mt-4">
            <button className="px-8 py-3 bg-corklasYellow rounded-lg text-black max-xl:text-xl font- hover:bg-yellow-600">
              Vyhľadať
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
