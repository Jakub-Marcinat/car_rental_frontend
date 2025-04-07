import { useState } from "react";
import MainHeader from "./MainHeader";
import { useRouter } from "next/router";

export default function Hero() {
  const router = useRouter();

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("08:00");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("08:00");

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const handleSubmit = () => {
    const query = {
      pickupDate: formatDate(pickupDate),
      dropoffDate: formatDate(dropoffDate),
      pickupTime,
      dropoffTime,
    };

    router.push({
      pathname: "/vozidla",
      query,
    });
  };

  return (
    <section className="relative bg-hero-pattern bg-cover bg-center bg-no-repeat flex flex-col md:gap-[364px] items- w-full text-white">
      <div className="absolute inset-0 bg-black/20 z-0" />
      <MainHeader />
      <div className="flex-grow flex flex-col justify-between items-center p-6 ">
        <div className="bg-gray-900 bg-opacity-90 px-12 py-8 mb-12 rounded-xl max-w-[1000px]">
          <div className="grid grid-cols-4 gap-4 max-md:flex max-md:flex-col">
            <div className="flex flex-col">
              <label className="max-xl:text-xl font-semibold mb-2 ml-1 whitespace-nowrap">
                Dátum vyzdvihnutia
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="px-4 py-2 rounded-lg max-xl:text-xl bg-gray-800 border border-gray-700 focus:ring focus:ring-yellow-500 text-white cursor-pointer"
              />
            </div>

            <div className="flex flex-col">
              <label className="max-xl:text-xl font-semibold mb-2 ml-1 whitespace-nowrap">
                Čas vyzdvihnutia
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="px-4 py-2 rounded-lg max-xl:text-xl bg-gray-800 border border-gray-700 focus:ring focus:ring-yellow-500 text-white"
              />
            </div>

            <div className="flex flex-col">
              <label className="max-xl:text-xl font-semibold mb-2 ml-1 whitespace-nowrap">
                Dátum odovzdania
              </label>
              <input
                type="date"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                className="px-4 py-2 rounded-lg max-xl:text-xl bg-gray-800 border border-gray-700 focus:ring focus:ring-yellow-500 text-white"
              />
            </div>

            <div className="flex flex-col">
              <label className="max-xl:text-xl font-semibold mb-2 ml-1 whitespace-nowrap">
                Čas odovzdania
              </label>
              <input
                type="time"
                value={dropoffTime}
                onChange={(e) => setDropoffTime(e.target.value)}
                className="px-4 py-2 rounded-lg max-xl:text-xl bg-gray-800 border border-gray-700 focus:ring focus:ring-yellow-500 text-white"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-corklasYellow rounded-lg text-black max-xl:text-xl font-semibold hover:bg-yellow-600 transition cursor-pointer"
            >
              Vyhľadať
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
