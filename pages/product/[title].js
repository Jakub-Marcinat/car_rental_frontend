import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import CustomDateInput from "@/components/CustomDateInput";
import CustomSelect from "@/components/CustomSelect";
import CustomTable from "@/components/CustomTable";
import BlackBox from "@/components/BlackBox";
import CustomTimeInput from "@/components/CustomTimeInput";
import {
  FaBolt,
  FaGasPump,
  FaRoad,
  FaCar,
  FaCogs,
  FaDoorOpen,
  FaTachometerAlt,
  FaTrailer,
  FaChair,
} from "react-icons/fa";
import { MdSpeed, MdCalendarToday } from "react-icons/md";
import Footer from "@/components/Footer";
import Head from "next/head";

export const PriceRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 2px;
  margin: 20px 0 20px 0;
`;

export const Price = styled.span`
  font-size: 1.1rem;
`;

const FeatureTile = styled.div`
  display: inline-block;
  background-color: #28282d;
  padding: 8px 12px;
  margin: 5px;
  border-radius: 5px;
  font-size: 14px;
`;

const parameterIcons = {
  Výkon: <FaBolt className="text-corklasRed text-lg" />,
  Palivo: <FaGasPump className="text-corklasRed text-lg" />,
  "Objem valcov": <FaCar className="text-yellowText text-lg" />,
  Spotreba: <MdSpeed className="text-yellowText text-lg" />,
  Prevodovka: <FaCogs className="text-corklasRed text-lg" />,
  "Počet prevodových stupňov": <MdSpeed className="text-yellowText text-lg" />,
  "Počet miest": <FaChair className="text-corklasRed text-lg" />,
  "Rok výroby": <MdCalendarToday className="text-yellowText text-lg" />,
  "Nájazd kilometrov": <FaTachometerAlt className="text-yellowText text-lg" />,
  Náhon: <FaRoad className="text-corklasRed text-lg" />,
  "Ťažné zariadenie": <FaTrailer className="text-yellowText text-lg" />,
};

export default function ProductPage({ product }) {
  //const { addProduct } = useContext(CartContext);
  const router = useRouter();

  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupTime, setPickupTime] = useState("08:00");
  const [dropoffTime, setDropoffTime] = useState("08:00");
  const [rentalDays, setRentalDays] = useState(0);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [rentalPrice, setRentalPrice] = useState(0);
  const [allowedKm, setAllowedKm] = useState(0);
  const [selectedMode, setSelectedMode] = useState("SR");

  const overLimitFee = 0.5;

  const modeMultipliers = {
    SR: 1,
    "Susedné krajiny": 1.3,
    EU: 1.6,
  };

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

      if (rentalDays > 0) {
        // Sort price tiers to ensure correct ordering
        const sortedPriceTiers = product.priceListing.sort((a, b) => {
          const getMinDays = (range) => parseInt(range.split(" - ")[0], 10);
          return getMinDays(a.DaysOfRental) - getMinDays(b.DaysOfRental);
        });

        // Find the correct tier for the entire rental period
        const selectedTier = sortedPriceTiers.find((tier) => {
          const [min, max] = tier.DaysOfRental.match(/\d+/g).map(Number);
          return rentalDays >= min && (max ? rentalDays <= max : true);
        });

        if (selectedTier) {
          let totalPrice =
            rentalDays * parseFloat(selectedTier.dailyRentalPrice);
          let totalAllowedKm = rentalDays * parseFloat(selectedTier.dailyKM);

          totalPrice -= totalPrice * promoDiscount;

          setRentalPrice(totalPrice);
          setAllowedKm(totalAllowedKm);

          console.log("Selected Tier:", selectedTier);
          console.log("Total Price:", totalPrice);
          console.log("Total Allowed KM:", totalAllowedKm);
        }
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

  const finalDeposit = product.deposit * modeMultipliers[selectedMode];

  const handleDateChange = () => {
    if (pickupDate && dropoffDate) {
      const days = Math.ceil(
        (new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)
      );
      setRentalDays(days > 0 ? days : 0);
    }
  };

  const handlePickupDateChange = (date) => {
    setPickupDate(date);
    handleDateChange();
  };

  const handleDropoffDateChange = (date) => {
    setDropoffDate(date);
    handleDateChange();
  };

  const handleReservation = () => {
    const queryParams = new URLSearchParams({
      id: product._id,
      pickupDate,
      dropoffDate,
      pickupTime,
      dropoffTime,
      selectedMode,
    }).toString();

    router.push(`/rezervacia?${queryParams}`);
  };

  // Prepare the data for CustomTable
  const tableHeaders = ["Interval", "Povolené km/deň", "Cena/deň"];
  const tableData = product.priceListing.map(
    ({ DaysOfRental, dailyKM, dailyRentalPrice }) => [
      `${DaysOfRental} dní`,
      `${dailyKM} km`,
      `€${dailyRentalPrice}`,
    ]
  );

  return (
    <div className="bg-corklasBackground text-white min-h-screen">
      <Head>
        <title>{product.title} | Autopožičovňa COR KLAS</title>
        <meta
          name="description"
          content={`Prenajmite si ${product.title} už od ${product.price}€ na deň.`}
        />
        <meta property="og:image" content={product.images[0]} />
        <meta
          property="og:url"
          content={`https://pozicovnaaut.sk/product/${product.title}`}
        />
      </Head>
      <Header />
      <div className="mx-auto px-4 lg:px-12 lg:py-20 xl:px-20 max-w-[1410px]">
        <Title>{product.title}</Title>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-[0.6]">
            <ProductImages images={product.images} />

            <BlackBox>
              <h3 className="text-2xl font-bold text-yellowText">Cenník</h3>
              <CustomTable headers={tableHeaders} data={tableData} />
              <h3 className="text-2xl font-bold mt-12 mb-4 text-yellowText">
                Výbava
              </h3>
              {product.features.map((feature, index) => (
                <FeatureTile key={index}>{feature}</FeatureTile>
              ))}
              <h3 className="text-2xl font-bold mt-12 mb-4 text-yellowText">
                Technické parametre
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-white">
                {Object.entries(product.properties).map(([key, value]) => {
                  // Map specific values to localized names
                  const valueMap = {
                    FWD: "Predný",
                    RWD: "Zadný",
                    Diesel: "Nafta",
                  };

                  const displayValue = valueMap[value] || value;

                  return (
                    <div key={key} className="flex items-center gap-2">
                      {parameterIcons[key] || (
                        <FaCogs className="text-yellowText text-lg" />
                      )}
                      <strong>{key}:</strong> {displayValue}
                    </div>
                  );
                })}
              </div>
            </BlackBox>
          </div>

          <div className="flex-[0.4] p-6 lg:px-10 rounded-2xl shadow-lg lg:w-[30%] bg-[#151515] border border-[#2b2b2b] max-h-fit">
            <h3 className="text-2xl font-semibold mb-8 text-yellowText">
              Rezervácia vozidla
            </h3>
            <p className="mb-4">{product.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <CustomDateInput
                value={pickupDate}
                onChange={handlePickupDateChange}
                placeholder="Dátum vyzdvihnutia"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <CustomDateInput
                value={dropoffDate}
                onChange={handleDropoffDateChange}
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

            <CustomSelect
              options={[
                { value: "SR", label: "Režim SR" },
                {
                  value: "Susedné krajiny",
                  label: "Režim Susedné krajiny (+30% záloha)",
                },
                { value: "EU", label: "Režim EU (+60% záloha)" },
              ]}
              value={selectedMode}
              onChange={setSelectedMode}
            />

            <PriceRow>
              <div className="flex justify-between">
                <Price>Cena:</Price>
                <Price> €{rentalPrice.toFixed(2)}</Price>
              </div>
              <div className="flex justify-between">
                <Price>Povolené KM: </Price>
                <Price>{allowedKm} km</Price>
              </div>
              <div className="flex justify-between">
                <Price>Záloha: </Price>
                <Price>€{finalDeposit.toFixed(2)}</Price>
              </div>
              <div className="flex justify-between">
                <Price>Poplatok za prekročenie: </Price>
                <Price>€{overLimitFee}/km</Price>
              </div>
            </PriceRow>
            <div className="w-full border border-[#2b2b2b] mb-8"></div>
            <div className="text-3xl mt-2 mb-6 flex justify-between pr-3">
              <p>Suma</p>
              <p>€{rentalPrice.toFixed(2)}</p>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleReservation} primary={1}>
                Rezervovať
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { title } = context.query;

  const decodedTitle = decodeURIComponent(title);
  const product = await Product.findOne({ title: decodedTitle });

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}
