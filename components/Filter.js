import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import CustomSelect from "./CustomSelect";
import CustomDateInput from "./CustomDateInput";
import CustomMakeSelect from "./CustomMakeSelect";

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

    router.push({ pathname: "/vozidla", query });
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

    router.push({ pathname: "/vozidla" });
  };

  return (
    <Sidebar className="lg:w-[350px]">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold mb-4">Filter</h3>
        <button onClick={resetFilters} className="flex gap-2">
          Zmazať filtre{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

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

      <CustomDateInput
        value={pickupDate}
        onChange={handlePickupDateChange}
        placeholder="Dostupné od"
      />

      <CustomDateInput
        value={dropoffDate}
        onChange={handleDropoffDateChange}
        placeholder="Dostupné do"
      />

      <CustomSelect
        label="Zoradiť podľa ceny:"
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
        className="w-fit px-4 py-2 mt-4 bg-corklasYellow text-black rounded-xl"
      >
        Apply Filters
      </button>
    </Sidebar>
  );
}
