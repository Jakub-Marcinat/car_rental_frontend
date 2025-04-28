import { useEffect, useState } from "react";
import MainHeader from "./MainHeader";
import { useRouter } from "next/router";
import CustomDateInput from "./CustomDateInput";
import CustomTimeInput from "./CustomTimeInput";

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

  const today = formatDate(new Date());

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
      <div className="absolute inset-0 bg-black -z-[5000]" />
      <div className="absolute inset-0 bg-black/20" />
      <MainHeader />
      <div className="flex-grow flex flex-col justify-between items-center p-6 z-50">
        <div className="bg-gray-900 bg-opacity-90 px-12 py-8 mb-12 rounded-xl max-w-[1000px]">
          <div className="grid grid-cols-4 gap-4 max-md:flex max-md:flex-col ">
            <div className="flex flex-col">
              <CustomDateInput
                label="Dátum vyzdvihnutia"
                value={pickupDate}
                onChange={setPickupDate}
                placeholder="Vyberte dátum"
                bgColor="#1f2937"
                borderColor="#1f2937"
                calendarBgColor="#1f2937"
                calendarTextColor="#f3f4f6"
                calendarBorderColor="#4b5563"
                calendarSelectedBgColor="#FFFA00"
                calendarSelectedTextColor="black"
                calendarDayHoverBgColor="#FFFA00"
              />
            </div>

            <div className="flex flex-col">
              <CustomTimeInput
                label="Čas vyzdvihnutia"
                value={pickupTime}
                onChange={setPickupTime}
                placeholder="8:00"
                bgColor="#1f2937"
                borderColor="#1f2937"
                timePickerBgColor="#1f2937"
                timePickerTextColor="f3f4f6"
                timePickerBorderColor="#4b5563"
                hoverBgColorProp="#FFFA00"
              />
            </div>

            <div className="flex flex-col">
              <CustomDateInput
                label="Dátum odovzdania"
                value={dropoffDate}
                onChange={setDropoffDate}
                placeholder="Vyberte dátum"
                minDate={new Date()}
                bgColor="#1f2937"
                borderColor="#1f2937"
                calendarBgColor="#1f2937"
                calendarTextColor="#f3f4f6"
                calendarBorderColor="#4b5563"
                calendarSelectedBgColor="#FFFA00"
                calendarSelectedTextColor="black"
                calendarDayHoverBgColor="#FFFA00"
              />
            </div>

            <div className="flex flex-col">
              <CustomTimeInput
                label="Čas odovzdania"
                value={dropoffTime}
                onChange={setDropoffTime}
                placeholder="08:00"
                bgColor="#1f2937"
                borderColor="#1f2937"
                timePickerBgColor="#1f2937"
                timePickerTextColor="f3f4f6"
                timePickerBorderColor="#4b5563"
                hoverBgColorProp="#FFFA00"
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
