import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Reservation } from "@/models/Reservation";

function validateReservationRequest(body) {
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "contactStreet",
    "contactCity",
    "contactPsc",
    "contactCountry",
    "pickupDate",
    "dropoffDate",
    "pickupTime",
    "dropoffTime",
    "rentalPrice",
    "depositFee",
    "allowedKm",
    "overLimitFee",
    "paymentMethod",
    "vehicle",
    "vehicleId",
    "selectedMode",
  ];

  for (const field of requiredFields) {
    if (!body[field]) {
      return { valid: false, message: `Missing required field: ${field}` };
    }
  }
  return { valid: true, message: "All required fields are present" };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    console.log("Invalid request method:", req.method);
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await mongooseConnect();

    const validationResult = validateReservationRequest(req.body);
    if (!validationResult.valid) {
      console.log("Validation Error:", validationResult.message);
      return res.status(400).json({ message: validationResult.message });
    }

    const newReservation = await Reservation.create(req.body);
    console.log("New reservation created:", newReservation);

    const vehicleDoc = await Product.findById(req.body.vehicleId);
    if (vehicleDoc) {
      vehicleDoc.reservations.push({
        reservationSince: new Date(req.body.pickupDate),
        reservationUntil: new Date(req.body.dropoffDate),
      });
      await vehicleDoc.save();
      console.log("Vehicle reservation updated:", vehicleDoc);
    } else {
      console.warn("Vehicle not found with ID:", req.body.vehicleId);
    }

    res.status(201).json({
      message: "Reservation created successfully!",
      reservation: newReservation,
    });
  } catch (error) {
    console.error("Error processing reservation:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}
