import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const Sidebar = styled.div`
  width: 250px;
  padding: 20px;
  background: #ccc;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const VEHICLE_CATEGORIES = [
  "Lower class",
  "Middle class",
  "Upper class",
  "Luxury",
  "Sport",
  "SUV",
  "Vans",
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
    setModel(""); // Reset model when make changes
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
    <Sidebar>
      <h3>Filters</h3>
      <button onClick={resetFilters}>Reset Filters</button>

      {/* Make */}
      <label>Make:</label>
      <select value={make} onChange={handleMakeChange}>
        <option value="">Any</option>
        {makes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      {/* Model (dependent on Make) */}
      <label>Model:</label>
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        disabled={!make}
      >
        <option value="">Any</option>
        {make &&
          models[make] &&
          [...models[make]].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
      </select>

      {/* Vehicle Category */}
      <label>Vehicle Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Any</option>
        {VEHICLE_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Transmission */}
      <label>Transmission:</label>
      <select
        value={transmission}
        onChange={(e) => setTransmission(e.target.value)}
      >
        <option value="">Any</option>
        <option value="manual">Manual</option>
        <option value="automat">Automatic</option>
      </select>

      {/* Fuel Type */}
      <label>Fuel:</label>
      <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
        <option value="">Any</option>
        <option value="benzin">Benzin</option>
        <option value="nafta">Nafta</option>
        <option value="elektricke">Elektricke</option>
      </select>

      {/* Drive Type */}
      <label>Drive:</label>
      <select value={drive} onChange={(e) => setDrive(e.target.value)}>
        <option value="">Any</option>
        <option value="FWD">Front-Wheel Drive</option>
        <option value="RWD">Rear-Wheel Drive</option>
        <option value="4x4">All-Wheel Drive (4x4)</option>
      </select>

      {/* Availability (Pick-up & Drop-off Date) */}
      <label>Pick-up Date:</label>
      <input
        type="date"
        value={pickupDate}
        onChange={(e) => setPickupDate(e.target.value)}
      />

      <label>Drop-off Date:</label>
      <input
        type="date"
        value={dropoffDate}
        onChange={(e) => setDropoffDate(e.target.value)}
      />

      {/* Sort by Price */}
      <label>Sort by Price:</label>
      <select value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="">Default</option>
        <option value="asc">Lowest Price</option>
        <option value="desc">Highest Price</option>
      </select>

      <button onClick={applyFilters}>Apply Filters</button>
    </Sidebar>
  );
}
