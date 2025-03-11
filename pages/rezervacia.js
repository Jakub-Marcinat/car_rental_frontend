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
  const [paymentMethod, setPaymentMethod] = useState("wire");
  const [isCompany, setIsCompany] = useState(false);
  const [selectedMode, setSelectedMode] = useState("SR");
  //const [depositFee, setDepositFee] = useState(500);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataProcessingAccepted, setDataProcessingAccepted] = useState(false);

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

  const depositFee = 500;
  const overLimitFee = 0.5;


  useEffect(() => {
    let newDeposit = 500; 
    if (selectedMode === "Susedné krajiny") newDeposit *= 1.3; 
    if (selectedMode === "EU") newDeposit *= 1.6; 
    //setDepositFee(newDeposit);
  }, [selectedMode]);


  useEffect(() => {
    if (pickupDate && dropoffDate) {
      const start = new Date(pickupDate);
      const end = new Date(dropoffDate);
      const rentalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

      const matchingPrice = product.numberOfRentalDays.find((p) =>
        p.DaysOfRental.includes(rentalDays >= 2 ? "2 - 3" : "0 - 1")
      );

      if (matchingPrice) {
        let calculatedPrice = matchingPrice.dailyRentalPrice * rentalDays;
        calculatedPrice -= calculatedPrice * promoDiscount;
        setRentalPrice(matchingPrice.dailyRentalPrice * rentalDays);
        setAllowedKm(matchingPrice.dailyKM * rentalDays);
      }
    }
  }, [pickupDate, dropoffDate, promoDiscount]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted || !dataProcessingAccepted) {
      alert("You must accept the Terms of Use and Data Processing.");
      return;
    }

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
      vehicleImage: product.image,
      vehicleCategory: product.category,
      vehicleFeatures: product.features,
      isCompany,
      companyName: formData.companyName || null,
      ico: formData.ico || null,
      dic: formData.dic || null,
      icDph: formData.icDph || null,
      billingStreet: formData.billingStreet || null,
      billingCity: formData.billingCity || null,
      billingPsc: formData.billingPsc || null,
      billingCountry: formData.billingCountry || null,
      contactStreet: formData.contactStreet || null,
      contactCity: formData.contactCity || null,
      contactPsc: formData.contactPsc || null,
      contactCountry: formData.contactCountry || null,
      selectedMode,
      promoCode: appliedPromoCode || null,
      discountAmount: promoDiscount || 0,
      termsAccepted,
      dataProcessingAccepted,
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

  const handleApplyPromoCode = () => {
    if (promoCode.match(/^\d{2}CORKLAS$/)) {
      const discount = parseInt(promoCode.substring(0, 2), 10);
      setAppliedPromoCode(promoCode);
      setPromoDiscount(discount);
    } else {
      alert("Invalid promo code format. Use XXCORKLAS (e.g., 10CORKLAS)");
    }
  };
  const discountedPrice = rentalPrice * (1 - promoDiscount / 100);

  return (
    <div className="p-6 max-w-3xl mx-auto flex">
      <div>
        <h2 className="text-2xl font-bold mb-4">Reserve {product.title}</h2>

        {/* Display Selected Vehicle Info */}
        <div className="mb-4">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
          <p>Category: {product.vehicleCategory.join(", ")}</p>
          <p>Features: {product.features.join(", ")}</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Reserve {product.title}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pickup & Drop-off Dates */}
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

          <label>Mode of Travel:</label>
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
          >
            <option value="SR">Režim SR</option>
            <option value="Susedné krajiny">
              Režim Susedné krajiny (+30% deposit)
            </option>
            <option value="EU">Režim EU (+60% deposit)</option>
          </select>

          {/* Promo Code Section */}
          <label>Zľavový kód:</label>
          {!showPromoInput ? (
            <button type="button" onClick={() => setShowPromoInput(true)}>
              Zadať promo kód
            </button>
          ) : (
            <input
              type="text"
              placeholder="10CORKLAS"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              onBlur={handleApplyPromoCode}
            />
          )}

          {/* Rental Info */}
          <p>Rental Price: {rentalPrice}€</p>
          {appliedPromoCode && (
            <>
              <p>
                Promo Code Applied: {appliedPromoCode} (-{promoDiscount}%)
              </p>
              <p>Discounted Price: {discountedPrice.toFixed(2)}€</p>
            </>
          )}
          <p>Allowed Distance: {allowedKm} km</p>
          <p>Over Limit Fee: {overLimitFee}€/km</p>
          <p>Deposit: {depositFee}€</p>
          {/* Payment Method */}
          <label>Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="wire">Wire Transfer</option>
            <option value="cash">Cash</option>
          </select>
          {/* Personal Information */}
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
          <input
            type="text"
            name="idNumber"
            placeholder="ID Number"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="birthNumber"
            placeholder="Birth Number"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="licenseNumber"
            placeholder="Driver’s License Number"
            onChange={handleChange}
            required
          />
          {/* "Som Firma" Toggle */}
          <label>
            <input
              type="checkbox"
              checked={isCompany}
              onChange={() => setIsCompany(!isCompany)}
            />
            Som Firma
          </label>
          {/* Address Fields */}
          <input
            type="text"
            name="street"
            placeholder="Street"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="psc"
            placeholder="PSC"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            required
          />
          {/* Company Fields */}
          {isCompany && (
            <>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="ico"
                placeholder="IČO"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="dic"
                placeholder="DIČ"
                onChange={handleChange}
              />
              <input
                type="text"
                name="icDph"
                placeholder="IČ DPH"
                onChange={handleChange}
              />
            </>
          )}

          <h3>Documents Upload</h3>
          <input
            type="file"
            name="idFront"
            onChange={handleFileChange}
            required
          />
          <input
            type="file"
            name="idBack"
            onChange={handleFileChange}
            required
          />
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

          {/* Checkboxes */}
          <label>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              required
            />
            I accept the Terms of Use
          </label>
          <label>
            <input
              type="checkbox"
              checked={dataProcessingAccepted}
              onChange={() =>
                setDataProcessingAccepted(!dataProcessingAccepted)
              }
              required
            />
            I accept the Processing of Personal Information
          </label>
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2"
            disabled={!termsAccepted || !dataProcessingAccepted}
          >
            Submit Reservation
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;

  const product = await Product.findById(id);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product: JSON.parse(JSON.stringify(product)) }, // Convert for Next.js
  };
}
