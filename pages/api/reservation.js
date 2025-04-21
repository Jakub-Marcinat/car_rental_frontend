import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Reservation } from "@/models/Reservation";
import { User } from "@/models/User";

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
  await mongooseConnect();

  if (req.method === "GET") {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    try {
      const user = await User.findById(userId).select("reservations");

      if (!user) {
        return res.status(404).json({ message: "Užívateľ neexistuje" });
      }

      const reservations = await Reservation.find({
        _id: { $in: user.reservations },
      })
        .populate("vehicle")
        .populate("user");

      return res.status(200).json(reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      return res
        .status(500)
        .json({ message: "Nepodarilo sa nájsť rezerváciu", error });
    }
  }

  if (req.method === "POST") {
    try {
      const validationResult = validateReservationRequest(req.body);
      if (!validationResult.valid) {
        console.log("Validation Error:", validationResult.message);
        return res.status(400).json({ message: validationResult.message });
      }

      const today = new Date();
      const yy = today.getFullYear().toString().slice(-2);
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");

      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));
      const existingReservations = await Reservation.countDocuments({
        createdAt: { $gte: startOfDay, $lt: endOfDay },
      });

      const reservationNumber = `TN-${yy}${mm}${dd}-${String(
        existingReservations + 1
      ).padStart(3, "0")}`;

      const reservationData = {
        ...req.body,
        reservationNumber,
        user: req.body.userId,
        vehicle: req.body.vehicleId,
      };
      console.log("request", reservationData);

      console.log("request if logged in", reservationData);

      const newReservation = await Reservation.create(reservationData);

      if (req.body.userId) {
        await User.findByIdAndUpdate(
          req.body.userId,
          {
            $addToSet: { reservations: newReservation._id },
          },
          { new: true, upsert: false }
        );
      }

      // Update the product’s reserved date ranges
      const vehicleDoc = await Product.findById(req.body.vehicleId);
      if (vehicleDoc) {
        vehicleDoc.reservations.push({
          reservationSince: new Date(req.body.pickupDate),
          reservationUntil: new Date(req.body.dropoffDate),
        });
        await vehicleDoc.save();
      }

      return res.status(201).json({
        message: "Reservation created successfully!",
        reservationNumber,
        reservation: newReservation,
      });
    } catch (error) {
      console.error("Error processing reservation:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
