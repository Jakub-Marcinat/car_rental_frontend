import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 40px;
  margin-top: 40px;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 20px;
`;

const Price = styled.span`
  font-size: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f4f4f4;
  }
`;

const FeatureTile = styled.div`
  display: inline-block;
  background-color: #f4f4f4;
  padding: 8px 12px;
  margin: 5px;
  border-radius: 5px;
  font-size: 14px;
`;

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

  return (
    <>
      <Header />
      <Center>
        <ColumnWrapper>
          {/* Left Side - Image & Details */}
          <WhiteBox>
            <ProductImages images={product.images} />

            {/* Pricing Table */}
            <h3>Cenník</h3>
            <Table>
              <thead>
                <tr>
                  <th>Interval</th>
                  <th>Povolené km/deň</th>
                  <th>Cena/deň</th>
                </tr>
              </thead>
              <tbody>
                {product.priceListing.map(
                  ({ DaysOfRental, dailyKM, dailyRentalPrice }, index) => (
                    <tr key={index}>
                      <td>{DaysOfRental} dní</td>
                      <td>{dailyKM} km</td>
                      <td>€{dailyRentalPrice}</td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>

            {/* Features */}
            <h3>Vlastnosti</h3>
            {product.features.map((feature, index) => (
              <FeatureTile key={index}>{feature}</FeatureTile>
            ))}

            {/* Technical Parameters */}
            <h3>Technické parametre</h3>
            <ul>
              {Object.entries(product.properties).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </WhiteBox>

          {/* Right Side - Reservation Form */}
          <div className="px-20px">
            <Title>{product.title}</Title>
            <p>{product.description}</p>

            {/* Reservation Form */}
            <h3>Rezervácia vozidla</h3>
            <label>Dátum vyzdvihnutia:</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => {
                setPickupDate(e.target.value);
                handleDateChange();
              }}
            />

            <label>Čas vyzdvihnutia:</label>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            />

            <label>Dátum odovzdania:</label>
            <input
              type="date"
              value={dropoffDate}
              onChange={(e) => {
                setDropoffDate(e.target.value);
                handleDateChange();
              }}
            />

            <label>Čas odovzdania:</label>
            <input
              type="time"
              value={dropoffTime}
              onChange={(e) => setDropoffTime(e.target.value)}
            />

            {/* Mode Selection */}
            <label>Režim:</label>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
            >
              <option value="SR">Režim SR</option>
              <option value="Susedné krajiny">
                Režim Susedné krajiny (+30% záloha)
              </option>
              <option value="EU">Režim EU (+60% záloha)</option>
            </select>

            {/* Pricing Summary */}
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

            <Button onClick={handleReservation} primary={1}>
              Rezervovať
            </Button>
          </div>
        </ColumnWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}
