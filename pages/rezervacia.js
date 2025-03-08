import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default function ReservationPage({ product }) {
  const router = useRouter();
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [allowedKm, setAllowedKm] = useState(0);
  const [rentalPrice, setRentalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("wire"); // Default to wire transfer
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idNumber: "",
    birthNumber: "",
    licenseNumber: "",
    street: "",
    city: "",
    psc: "",
    country: "",
    companyName: "",
    ico: "",
    dic: "",
    icDph: "",
    billingStreet: "",
    billingCity: "",
    billingPsc: "",
    billingCountry: "",
    contactStreet: "",
    contactCity: "",
    contactPsc: "",
    contactCountry: "",
  });

  const [files, setFiles] = useState({
    idFront: null,
    idBack: null,
    licenseFront: null,
    licenseBack: null,
  });

  const [isCompany, setIsCompany] = useState(false);
  const depositFee = 500; // Hardcoded deposit
  const overLimitFee = 0.5; // Over-limit fee per km

  // Calculate rental cost based on selected dates
  useEffect(() => {
    if (pickupDate && dropoffDate) {
      const start = new Date(pickupDate);
      const end = new Date(dropoffDate);
      const rentalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

      const matchingPrice = product.priceListing.find((p) =>
        p.DaysOfRental.includes(rentalDays >= 2 ? "2 - 3" : "0 - 1")
      );

      if (matchingPrice) {
        setRentalPrice(matchingPrice.dailyRentalPrice * rentalDays);
        setAllowedKm(matchingPrice.dailyKM * rentalDays);
      }
    }
  }, [pickupDate, dropoffDate]);

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reservationDetails = {
      ...formData,
      pickupDate,
      dropoffDate,
      pickupTime,
      dropoffTime,
      allowedKm,
      rentalPrice,
      depositFee,
      overLimitFee,
      paymentMethod,
      vehicle: product.title,
    };

    try {
      await axios.post("/api/reservation", reservationDetails);
      alert("Reservation sent! Check your email.");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Error sending reservation.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reserve {product.title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Pick-up Date:</label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
          />
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Drop-off Date:</label>
          <input
            type="date"
            value={dropoffDate}
            onChange={(e) => setDropoffDate(e.target.value)}
            required
          />
          <input
            type="time"
            value={dropoffTime}
            onChange={(e) => setDropoffTime(e.target.value)}
            required
          />
        </div>

        <p>Estimated Price: {rentalPrice}€</p>
        <p>Allowed Distance: {allowedKm} km</p>
        <p>Over Limit Fee: {overLimitFee}€/km</p>
        <p>Deposit: {depositFee}€</p>

        <label>Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="wire">Wire Transfer</option>
          <option value="cash">Cash</option>
        </select>

        <h3>User Information</h3>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />

        <h3>Documents Upload</h3>
        <input
          type="file"
          name="idFront"
          onChange={handleFileChange}
          required
        />
        <input type="file" name="idBack" onChange={handleFileChange} required />
        <input
          type="file"
          name="licenseFront"
          onChange={handleFileChange}
          required
        />
        <input
          type="file"
          name="licenseBack"
          onChange={handleFileChange}
          required
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Submit Reservation
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;

  // ✅ Fetch product details
  const product = await Product.findById(id);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product: JSON.parse(JSON.stringify(product)) }, // Convert for Next.js
  };
}
