import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import CustomSelect from "./CustomSelect";
import CustomDateInput from "./CustomDateInput";
import CustomMakeSelect from "./CustomMakeSelect";
import CustomMultiSelectDropdown from "./CustomMultiSelectDropdown";

const Sidebar = styled.div`
  padding: 28px;
  margin-top: 40px;
  background: #151515;
  display: flex;
  height: fit-content;
  flex-direction: column;
  border-radius: 24px;
  gap: 15px;
  color: white;
  min-width: 280px;
`;

const VEHICLE_CATEGORIES = [
  "Nižšia trieda",
  "Stredná trieda",
  "Vyššia trieda",
  "Luxusné autá",
  "Športové autá",
  "SUV",
  "Dodávky",
];

const ACCESSORIES_OPTIONS = ["Ťažné zariadenie", "Strešný nosič"];

export default function Filter({ makes, models }) {
  const router = useRouter();
  const { query } = router;

  const [make, setMake] = useState(query.make || "");
  const [model, setModel] = useState(query.model || "");
  const [transmission, setTransmission] = useState(query.transmission || "");
  const [drive, setDrive] = useState(query.drive || "");
  const [fuel, setFuel] = useState(query.fuel || "");
  const [category, setCategory] = useState(query.category || "");
  const [order, setOrder] = useState(query.order || "");
  const [pickupDate, setPickupDate] = useState(query.pickupDate || "");
  const [dropoffDate, setDropoffDate] = useState(query.dropoffDate || "");
  const [accessories, setAccessories] = useState(
    query.accessories ? query.accessories.split(",") : []
  );

  const handleMakeChange = (e) => {
    const selectedMake = e.target.value;
    setMake(selectedMake);
    setModel("");
  };

  const handlePickupDateChange = (date) => {
    setPickupDate(date);
  };

  const handleDropoffDateChange = (date) => {
    setDropoffDate(date);
  };

  const handleAccessoriesChange = (e) => {
    const selectedValue = e.target.value;
    setAccessories((prev) =>
      prev.includes(selectedValue)
        ? prev.filter((item) => item !== selectedValue)
        : [...prev, selectedValue]
    );
  };

  const applyFilters = () => {
    const query = {};
    if (make) query.make = make;
    if (model) query.model = model;
    if (transmission) query.transmission = transmission;
    if (drive) query.drive = drive;
    if (fuel) query.fuel = fuel;
    if (category) query.category = category;
    if (order) query.order = order;
    if (pickupDate) query.pickupDate = pickupDate;
    if (dropoffDate) query.dropoffDate = dropoffDate;
    if (accessories.length > 0) query.accessories = accessories.join(",");

    router.push({ pathname: "/ponuka-vozidiel", query });
  };

  const resetFilters = () => {
    setMake("");
    setModel("");
    setTransmission("");
    setDrive("");
    setFuel("");
    setCategory("");
    setOrder("");
    setPickupDate("");
    setDropoffDate("");
    setAccessories([]);

    router.push({ pathname: "/ponuka-vozidiel" });
  };

  return (
    <Sidebar className="max-lg:w-[300px] mb-20">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold mb-4">Filter</h3>
        <button onClick={resetFilters} className="flex gap-2">
          Zmazať filtre{" "}
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <CustomDateInput
        value={pickupDate}
        onChange={handlePickupDateChange}
        placeholder="Dostupné od"
        bgColor="#1f1f1f"
        borderColor="#1f1f1f"
        calendarBgColor="#121212"
        calendarTextColor="#f3f4f6"
        calendarBorderColor="#2b2b2b"
        calendarSelectedBgColor="#FFFA00"
        calendarSelectedTextColor="black"
        calendarDayHoverBgColor="#FFFA00"
      />
      <CustomDateInput
        value={dropoffDate}
        onChange={handleDropoffDateChange}
        placeholder="Dostupné do"
        bgColor="#1f1f1f"
        borderColor="#1f1f1f"
        calendarBgColor="#121212"
        calendarTextColor="#f3f4f6"
        calendarBorderColor="#2b2b2b"
        calendarSelectedBgColor="#FFFA00"
        calendarSelectedTextColor="black"
        calendarDayHoverBgColor="#FFFA00"
      />
      <div className="w-full border border-[#2b2b2b] mb-4 mt-2"></div>
      <p className="text-xl">Vozidlo</p>
      <CustomMakeSelect
        options={[
          { value: "", label: "Značka vozidla" },
          ...makes.map((m) => ({ value: m, label: m })),
        ]}
        value={make}
        onChange={handleMakeChange}
      />
      <CustomSelect
        options={[
          { value: "", label: "Model" },
          ...(make && models[make]
            ? [...models[make]].map((m) => ({ value: m, label: m }))
            : []),
        ]}
        value={model}
        onChange={setModel}
        disabled={!make}
      />
      <CustomSelect
        options={[
          { value: "", label: "Kategória vozidla" },
          ...VEHICLE_CATEGORIES.map((cat) => ({ value: cat, label: cat })),
        ]}
        value={category}
        onChange={setCategory}
      />
      <div className="w-full border border-[#2b2b2b] mb-4 mt-2"></div>
      <p className="text-xl">Parametre vozidla</p>
      <CustomSelect
        options={[
          { value: "", label: "Typ prevodovky" },
          { value: "manual", label: "Manuál" },
          { value: "automat", label: "Automat" },
        ]}
        value={transmission}
        onChange={setTransmission}
      />
      <CustomSelect
        options={[
          { value: "", label: "Palivo" },
          { value: "benzin", label: "Benzin" },
          { value: "nafta", label: "Nafta" },
          { value: "elektricke", label: "Elektricke" },
        ]}
        value={fuel}
        onChange={setFuel}
      />
      <CustomSelect
        options={[
          { value: "", label: "Náhon" },
          { value: "FWD", label: "Predný náhon" },
          { value: "RWD", label: "Zadný náhon" },
          { value: "4x4", label: "4x4" },
        ]}
        value={drive}
        onChange={setDrive}
      />
      <CustomMultiSelectDropdown
        options={ACCESSORIES_OPTIONS}
        selectedOptions={accessories}
        onChange={setAccessories}
      />
      <div className="w-full border border-[#2b2b2b] mb-4 mt-2"></div>
      <p className="text-xl">Zoradiť</p>
      <CustomSelect
        options={[
          { value: "", label: "Odporúčané" },
          { value: "desc", label: "Od najdrahšieho" },
          { value: "asc", label: "Od najlacnejšieho" },
        ]}
        value={order}
        onChange={setOrder}
      />
      <button
        onClick={applyFilters}
        className="w-fit px-8 py-3 mt-4 bg-corklasYellow text-black rounded-full"
      >
        Vyhladať
      </button>
    </Sidebar>
  );
}
