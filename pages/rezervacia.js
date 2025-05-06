import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import emailjs from "@emailjs/browser";
import BlackBox from "@/components/BlackBox";
import CustomDateInput from "@/components/CustomDateInput";
import CustomTimeInput from "@/components/CustomTimeInput";
import CustomSelect from "@/components/CustomSelect";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/Button";
import { Price, PriceRow } from "./product/[id]";
import Input from "@/components/Input";
import {
  FaBolt,
  FaGasPump,
  FaRoad,
  FaCar,
  FaCogs,
  FaDoorOpen,
  FaTachometerAlt,
  FaTrailer,
} from "react-icons/fa";
import { MdSpeed, MdCalendarToday } from "react-icons/md";
import { Switch } from "@/components/CustomSwitch";
import CustomCheckbox from "@/components/CustomCheckbox";
import { useSession } from "next-auth/react";

import axios from "axios";
import { SquarePen } from "lucide-react";

const parameterIcons = {
  Výkon: <FaBolt className="text-yellowText text-lg" />,
  Palivo: <FaGasPump className="text-yellowText text-lg" />,
  "Objem valcov": <FaCar className="text-yellowText text-lg" />,
  Spotreba: <MdSpeed className="text-yellowText text-lg" />,
  "Typ prevodovky": <FaCogs className="text-yellowText text-lg" />,
  "Počet prevodových stupňov": <MdSpeed className="text-yellowText text-lg" />,
  "Počet dverí": <FaDoorOpen className="text-yellowText text-lg" />,
  "Rok výroby": <MdCalendarToday className="text-yellowText text-lg" />,
  "Nájazd kilometrov": <FaTachometerAlt className="text-yellowText text-lg" />,
  "Typ pohonu": <FaRoad className="text-yellowText text-lg" />,
  "Ťažné zariadenie": <FaTrailer className="text-yellowText text-lg" />,
};

export default function ReservationPage({ product }) {
  const router = useRouter();
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [allowedKm, setAllowedKm] = useState(0);
  const [rentalPrice, setRentalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Bankový prevod");
  const [isCompany, setIsCompany] = useState(false);
  const [selectedMode, setSelectedMode] = useState("SR");
  const [depositFee, setDepositFee] = useState(product.deposit);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataProcessingAccepted, setDataProcessingAccepted] = useState(false);

  const { data: session } = useSession();

  const token = session?.accessToken;
  const userId = session?.user?.id;

  const {
    id,
    pickupDate: queryPickupDate,
    dropoffDate: queryDropoffDate,
    pickupTime: queryPickupTime,
    dropoffTime: queryDropoffTime,
    selectedMode: querySelectedMode,
  } = router.query;

  useEffect(() => {
    if (queryPickupDate) setPickupDate(queryPickupDate);
    if (queryDropoffDate) setDropoffDate(queryDropoffDate);
    if (queryPickupTime) setPickupTime(queryPickupTime);
    if (queryDropoffTime) setDropoffTime(queryDropoffTime);
    if (querySelectedMode) setSelectedMode(querySelectedMode);
  }, [
    queryPickupDate,
    queryDropoffDate,
    queryPickupTime,
    queryDropoffTime,
    querySelectedMode,
  ]);

  const [formData, setFormData] = useState({
    pickupDate: pickupDate || "",
    dropoffDate: dropoffDate || "",
    pickupTime: pickupTime || "08:00",
    dropoffTime: dropoffTime || "08:00",
    selectedMode: selectedMode || "SR",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idNumber: "",
    birthNumber: "",
    licenseNumber: "",
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

  const modeMultipliers = {
    SR: 1,
    "Susedné krajiny": 1.3,
    EU: 1.6,
  };

  const overLimitFee = 0.5;
  const finalDeposit = product.deposit * modeMultipliers[selectedMode];

  useEffect(() => {
    let newDeposit = product.deposit;
    if (selectedMode === "Susedné krajiny") newDeposit *= 1.3;
    if (selectedMode === "EU") newDeposit *= 1.6;
    setDepositFee(newDeposit);
  }, [selectedMode]);

  useEffect(() => {
    if (
      pickupDate &&
      dropoffDate &&
      pickupTime &&
      dropoffTime &&
      product?.priceListing?.length
    ) {
      const start = new Date(`${pickupDate} ${pickupTime}`);
      const end = new Date(`${dropoffDate} ${dropoffTime}`);

      const rentalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

      // Sort price tiers by range (ensures correct tier ordering)
      const sortedPriceTiers = product.priceListing.sort((a, b) => {
        const getMinDays = (range) => parseInt(range.split(" - ")[0], 10);
        return getMinDays(a.DaysOfRental) - getMinDays(b.DaysOfRental);
      });

      // Find the correct pricing tier
      let selectedTier = sortedPriceTiers.find((tier) => {
        const [min, max] = tier.DaysOfRental.match(/\d+/g).map(Number);
        return rentalDays >= min && (max ? rentalDays <= max : true);
      });

      if (selectedTier) {
        let totalPrice = rentalDays * parseFloat(selectedTier.dailyRentalPrice);
        let totalAllowedKm = rentalDays * parseFloat(selectedTier.dailyKM);

        console.log("promoDiscount", (100 - promoDiscount) / 100);
        console.log("discount", discount);
        console.log("price", rentalPrice * 0.9);

        totalPrice = totalPrice * discount;

        setRentalPrice(totalPrice);
        setAllowedKm(totalAllowedKm);

        console.log("Selected Tier:", selectedTier);
        console.log("Total Price:", totalPrice);
        console.log("Total Allowed KM:", totalAllowedKm);
      }
    }
  }, [
    pickupDate,
    dropoffDate,
    pickupTime,
    dropoffTime,
    promoDiscount,
    product,
  ]);

  const handleFillUserData = async () => {
    if (!session?.user?.id) return;

    try {
      const { data: userData } = await axios.get(
        `/api/user/${session.user.id}`
      );

      const fieldsToUpdate = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "contactStreet",
        "contactCity",
        "contactPsc",
        "contactCountry",
        "companyName",
        "ico",
        "dic",
        "icDph",
        "billingStreet",
        "billingCity",
        "billingPsc",
        "billingCountry",
      ];

      setFormData((prev) => ({
        ...prev,
        ...Object.fromEntries(
          fieldsToUpdate
            .filter((field) => userData[field]) // only defined values
            .map((field) => [field, userData[field]])
        ),
      }));

      if (userData.companyName) {
        setIsCompany(true);
      }
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      pickupDate: pickupDate || prev.pickupDate,
      dropoffDate: dropoffDate || prev.dropoffDate,
      pickupTime: pickupTime || prev.pickupTime,
      dropoffTime: dropoffTime || prev.dropoffTime,
      selectedMode: selectedMode || prev.selectedMode,
    }));
  }, [pickupDate, dropoffDate, pickupTime, dropoffTime, selectedMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted || !dataProcessingAccepted) {
      alert("Musíte súhlasiť s obchodnými podmienkami a spracovaním údajov.");
      return;
    }

    const updatedFormData = {
      ...formData,
      pickupDate: pickupDate || formData.pickupDate,
      dropoffDate: dropoffDate || formData.dropoffDate,
      pickupTime: pickupTime || formData.pickupTime,
      dropoffTime: dropoffTime || formData.dropoffTime,
      selectedMode: selectedMode || formData.selectedMode,
    };

    const reservationDetails = {
      ...updatedFormData,
      allowedKm,
      rentalPrice,
      depositFee,
      overLimitFee,
      paymentMethod,
      vehicleId: product._id,
      isCompany,
      companyName: updatedFormData.companyName || null,
      ico: updatedFormData.ico || null,
      dic: updatedFormData.dic || null,
      icDph: updatedFormData.icDph || null,
      billingStreet: updatedFormData.billingStreet || null,
      billingCity: updatedFormData.billingCity || null,
      billingPsc: updatedFormData.billingPsc || null,
      billingCountry: updatedFormData.billingCountry || null,
      contactStreet: updatedFormData.contactStreet || null,
      contactCity: updatedFormData.contactCity || null,
      contactPsc: updatedFormData.contactPsc || null,
      contactCountry: updatedFormData.contactCountry || null,
      promoCode: appliedPromoCode || null,
      discountAmount: promoDiscount || 0,
      birthNumber: updatedFormData.birthNumber || null,
      licenseNumber: updatedFormData.licenseNumber || null,
      termsAccepted,
      dataProcessingAccepted,
      status: "pending",
      userId: userId,
    };

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservationDetails),
      });
      console.log("reservationDetails", reservationDetails);
      const result = await response.json();
      console.log("Server response:", result);
      if (!response.ok) {
        console.error("Error response from server:", result);
        throw new Error(result.message || "Reservation failed.");
      }
      const reservationId = result.reservationNumber;

      const userEmailParams = {
        email: updatedFormData.email,
        to_name: `${updatedFormData.firstName} ${updatedFormData.lastName}`,

        productTitle: product.title,
        productFeatures: product.features?.join(", "),
        reservationId,

        pickupDate,
        pickupTime,
        dropoffDate,
        dropoffTime,

        rentalPrice,
        depositFee,
        allowedKm,
        overLimitFee,
        paymentMethod,
        selectedMode,
        promoCode,

        contactStreet: updatedFormData.contactStreet,
        contactCity: updatedFormData.contactCity,
        contactPsc: updatedFormData.contactPsc,
        contactCountry: updatedFormData.contactCountry,

        isCompanyInfo: isCompany
          ? `
        🏢 Firemné údaje:
        • Obchodný názov: ${updatedFormData.companyName}
        • IČO: ${updatedFormData.ico}
        • DIČ: ${updatedFormData.dic}
        • IČ DPH: ${updatedFormData.icDph}
        
        🧾 Fakturačná adresa:
        • Ulica: ${updatedFormData.billingStreet}
        • Mesto: ${updatedFormData.billingCity}
        • PSČ: ${updatedFormData.billingPsc}
        • Krajina: ${updatedFormData.billingCountry}
        `
          : "—",
      };

      const adminEmailParams = {
        email: updatedFormData.email,
        to_name: `${updatedFormData.firstName} ${updatedFormData.lastName}`,
        reservationId,
        customerName: `${updatedFormData.firstName} ${updatedFormData.lastName}`,
        productTitle: product.title,
        productCategory: product.category.name,
        productFeatures: product.features?.join(", "),
        pickupDate,
        pickupTime,
        dropoffDate,
        dropoffTime,
        rentalPrice,
        depositFee,
        allowedKm,
        overLimitFee,
        paymentMethod,
        selectedMode,
        promoInfo: promoCode
          ? `🎟️ Promo kód: ${promoCode} (-${reservationDetails.discountAmount}%)`
          : "Žiadny promo kód použitý",
        contactStreet: updatedFormData.contactStreet,
        contactCity: updatedFormData.contactCity,
        contactPsc: updatedFormData.contactPsc,
        contactCountry: updatedFormData.contactCountry,
        isCompanyInfo: isCompany
          ? `
          🏢 Firemné údaje:
          • Obchodný názov: ${updatedFormData.companyName}
          • IČO: ${updatedFormData.ico}
          • DIČ: ${updatedFormData.dic}
          • IČ DPH: ${updatedFormData.icDph}
      
          🧾 Fakturačná adresa:
          • Ulica: ${updatedFormData.billingStreet}
          • Mesto: ${updatedFormData.billingCity}
          • PSČ: ${updatedFormData.billingPsc}
          • Krajina: ${updatedFormData.billingCountry}
          `
          : "—",
        currentYear: new Date().getFullYear(),
      };

      // Sending Admin email
      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN,
          adminEmailParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        )
        .then(() => {
          console.log("Admin email sent successfully!");
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });

      // Sending User Email
      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_USER,
          userEmailParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        )
        .then(() => {
          console.log("User email sent successfully!");
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });

      router.push(`/thank-you?reservationId=${reservationId}`);
    } catch (error) {
      console.error("Error submitting reservation:", error);
      alert("Error sending reservation. Please try again.");
    }
  };

  const handleApplyPromoCode = () => {
    if (promoCode.match(/^\d{2}CORKLAS$/)) {
      const discount = parseInt(promoCode.substring(0, 2), 10);
      setAppliedPromoCode(promoCode);
      setPromoDiscount(discount);
    } else {
    }
  };
  const discount = (100 - promoDiscount) / 100;

  return (
    <main className="bg-corklasBackground text-white">
      <div className="p-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1 lg:w-[70%]">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-40 object-cover rounded"
          />

          <BlackBox>
            <h3 className="text-2xl font-bold mb-4 text-yellowText">
              Technické parametre
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-white">
              {Object.entries(product.properties).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  {parameterIcons[key] || (
                    <FaCogs className="text-yellowText text-lg" />
                  )}
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </div>
          </BlackBox>
        </div>

        <div className="flex-1 lg:w-[30%] p-6 lg:px-10 rounded-lg shadow-lg bg-[#151515] text-white">
          <h3 className="text-2xl font-semibold my-6 py-2 text-yellowText">
            Rezervácia vozidla
          </h3>
          {session?.user && (
            <button
              type="button"
              onClick={handleFillUserData}
              className="flex items-center mb-6 gap-3"
            >
              Vyplniť údaje
              <SquarePen className="w-5 h-5 text-corklasYellow" />
            </button>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <CustomDateInput
                value={pickupDate}
                onChange={setPickupDate}
                placeholder="Dátum odovzdania"
                bgColor="#1f1f1f"
                borderColor="#D70006"
                calendarBgColor="#121212"
                calendarTextColor="#f3f4f6"
                calendarBorderColor="#2b2b2b"
                calendarSelectedBgColor="#FFFA00"
                calendarSelectedTextColor="black"
                calendarDayHoverBgColor="#FFFA00"
                className="flex-1 min-w-0"
              />
              <CustomTimeInput
                value={pickupTime}
                onChange={setPickupTime}
                placeholder="Čas odovzdania"
                bgColor="#1F1F1F"
                borderColor="#D70006"
                timePickerBgColor="#121212"
                timePickerTextColor="white"
                timePickerBorderColor="#2b2b2b"
                hoverBgColorProp="#2a2a2a"
                className="flex-1 min-w-0"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomDateInput
                value={dropoffDate}
                onChange={setDropoffDate}
                placeholder="Dátum odovzdania"
                bgColor="#1f1f1f"
                borderColor="#D70006"
                calendarBgColor="#121212"
                calendarTextColor="#f3f4f6"
                calendarBorderColor="#2b2b2b"
                calendarSelectedBgColor="#FFFA00"
                calendarSelectedTextColor="black"
                calendarDayHoverBgColor="#FFFA00"
                className="flex-1 min-w-0"
              />

              <CustomTimeInput
                value={dropoffTime}
                onChange={setDropoffTime}
                placeholder="Čas odovzdania"
                bgColor="#1F1F1F"
                borderColor="#D70006"
                timePickerBgColor="#121212"
                timePickerTextColor="white"
                timePickerBorderColor="#2b2b2b"
                hoverBgColorProp="#2a2a2a"
                className="flex-1 min-w-0"
              />
            </div>
            <div>
              <CustomSelect
                options={[
                  { value: "SR", label: "Režim Slovensko" },
                  {
                    value: "Susedné krajiny",
                    label: "Režim Česká republika (+30% záloha)",
                  },
                  { value: "EU", label: "Režim EU (+60% záloha)" },
                ]}
                value={selectedMode}
                onChange={setSelectedMode}
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <AnimatePresence>
                  {showPromoInput && (
                    <motion.input
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      type="text"
                      placeholder=""
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      onBlur={handleApplyPromoCode}
                      className="flex-1 bg-corklasCard border-2 border-[#2b2b2b] rounded-lg py-2 pl-2"
                    />
                  )}
                </AnimatePresence>
                <button
                  type="button"
                  onClick={() => setShowPromoInput(!showPromoInput)}
                  variant="outline"
                  className="flex justify-between w-full"
                >
                  <div className="flex gap-2 items-center">
                    {showPromoInput ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6 ml-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14"
                          />
                        </svg>
                        Skryť kód
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6 ml-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                        Zadať promo kód
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>

            <div>
              <PriceRow>
                <div>
                  <Price>Celková cena: €{rentalPrice.toFixed(2)}</Price>
                </div>
                <div>
                  <Price>Povolené KM: {allowedKm} km</Price>
                </div>
                <div>
                  <Price>Záloha: €{finalDeposit.toFixed(2)}</Price>
                </div>
                <div>
                  <Price>Poplatok za prekročenie: €{overLimitFee}/km</Price>
                </div>
              </PriceRow>
            </div>

            <div>
              <CustomSelect
                options={[
                  { value: "Bankový prevod", label: "Bankovým prevodom" },
                  { value: "Hotovosť", label: "Hotovosť" },
                ]}
                value={paymentMethod}
                onChange={(value) => setPaymentMethod(value)}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold my-2">Osobné údaje</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName || ""}
                    placeholder="Krstné meno*"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Priezvisko*"
                    value={formData.lastName || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email*"
                    value={formData.email || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Telefón*"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* <div>
                  <Input
                    type="text"
                    id="birthNumber"
                    name="birthNumber"
                    placeholder="Rodné číslo za lomítkom"
                    onChange={handleChange}
                    required
                  />
                </div> */}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold my-2">Kontaktné údaje</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    id="contactStreet"
                    name="contactStreet"
                    placeholder="Ulica"
                    value={formData.contactStreet || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    id="contactCity"
                    name="contactCity"
                    placeholder="Mesto"
                    value={formData.contactCity || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    id="contactPsc"
                    name="contactPsc"
                    placeholder="PSC"
                    value={formData.contactPsc || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    id="contactCountry"
                    name="contactCountry"
                    placeholder="Krajina"
                    value={formData.contactCountry || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isCompany"
                checked={isCompany}
                onCheckedChange={setIsCompany}
              />
              <h2>Som firma</h2>
            </div>

            {/* Company Fields */}
            <AnimatePresence>
              {isCompany && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold my-2">
                    Fakturačné údaje
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="text"
                        id="companyName"
                        name="companyName"
                        placeholder="Company Name"
                        value={formData.companyName || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        id="ico"
                        name="ico"
                        placeholder="IČO"
                        value={formData.ico || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        id="dic"
                        name="dic"
                        placeholder="DIČ"
                        value={formData.dic || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        id="icDph"
                        name="icDph"
                        placeholder="IČ DPH"
                        value={formData.icDph || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        id="billingStreet"
                        name="billingStreet"
                        placeholder="Ulica"
                        value={formData.billingStreet || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        id="billingCity"
                        name="billingCity"
                        placeholder="Mesto"
                        value={formData.billingCity || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        id="billingPsc"
                        name="billingPsc"
                        placeholder="PSC"
                        value={formData.billingPsc || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        id="billingCountry"
                        name="billingCountry"
                        placeholder="Krajina"
                        value={formData.billingCountry || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Checkboxes */}
            <div>
              <div className="flex items-center gap-2">
                <CustomCheckbox
                  checked={termsAccepted}
                  onChange={setTermsAccepted}
                  className="mr-2"
                />
                <span>
                  Prečítal/a som si a súhlasím s{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    obchodnými podmienkami
                  </a>
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CustomCheckbox
                  checked={dataProcessingAccepted}
                  onChange={setDataProcessingAccepted}
                  className="mr-2"
                />
                <span>
                  Súhlasím so{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    spracovaním osobných údajov
                  </a>
                </span>
              </div>
            </div>
            {/* Submit Button */}

            <Button
              type="submit"
              disabled={!termsAccepted || !dataProcessingAccepted}
              primary={1}
            >
              Potvrdiť rezerváciu
            </Button>
          </form>
        </div>
      </div>
    </main>
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
