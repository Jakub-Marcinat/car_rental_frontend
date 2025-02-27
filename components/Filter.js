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

export default function Filter({ setFilters }) {
  const [make, setMake] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const router = useRouter();

  const applyFilters = () => {
    const query = {};
    if (make) query.make = make;
    if (transmission) query.transmission = transmission;
    if (fuel) query.fuel = fuel;
    if (category) query.category = category;
    if (order) query.order = order;
    if (pickupDate) query.pickupDate = pickupDate;
    if (dropoffDate) query.dropoffDate = dropoffDate;

    router.push({ pathname: "/vozidla", query });
  };

  return (
    <Sidebar>
      <h3>Filters</h3>
      <label>Make:</label>
      <input
        type="text"
        value={make}
        onChange={(e) => setMake(e.target.value)}
      />

      <label>Transmission:</label>
      <select
        value={transmission}
        onChange={(e) => setTransmission(e.target.value)}
      >
        <option value="">Any</option>
        <option value="manual">Manual</option>
        <option value="automatic">Automatic</option>
      </select>

      <label>Fuel:</label>
      <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
        <option value="">Any</option>
        <option value="petrol">Petrol</option>
        <option value="diesel">Diesel</option>
        <option value="electric">Electric</option>
      </select>

      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Any</option>
        <option value="lower">Lower Class</option>
        <option value="middle">Middle Class</option>
        <option value="luxury">Luxury</option>
        <option value="sport">Sport Vehicles</option>
        <option value="sport">Vans</option>
      </select>

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
