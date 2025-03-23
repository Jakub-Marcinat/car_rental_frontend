import { Product } from "@/models/Product";
import { Reservation } from "@/models/Reservation";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    console.log("Invalid request method:", req.method);
    return res.status(405).send("Method Not Allowed");
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    idNumber,
    birthNumber,
    licenseNumber,
    companyName,
    ico,
    dic,
    icDph,
    billingStreet,
    billingCity,
    billingPsc,
    billingCountry,
    contactStreet,
    contactCity,
    contactPsc,
    contactCountry,
    pickupDate,
    dropoffDate,
    pickupTime,
    dropoffTime,
    rentalPrice,
    depositFee,
    allowedKm,
    overLimitFee,
    paymentMethod,
    vehicle: vehicleTitle,
    vehicleId,
    selectedMode,
    promoCode,
    discountAmount,
    vehicleImage,
    vehicleCategory,
    vehicleFeatures,
    isCompany,
    termsAccepted,
    dataProcessingAccepted,
    files,
    status,
  } = req.body;

  console.log("Received reservation request:", req.body);

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !contactStreet ||
    !contactCity ||
    !contactPsc ||
    !contactCountry ||
    !pickupDate ||
    !dropoffDate ||
    !pickupTime ||
    !dropoffTime ||
    !rentalPrice ||
    !depositFee ||
    !allowedKm ||
    !overLimitFee ||
    !paymentMethod ||
    !vehicleTitle ||
    !selectedMode
  ) {
    console.log("Missing required fields:", req.body);
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newReservation = await Reservation.create({
    firstName,
    lastName,
    email,
    phone,
    idNumber,
    birthNumber,
    licenseNumber,
    pickupDate,
    dropoffDate,
    pickupTime,
    dropoffTime,
    rentalPrice,
    depositFee,
    allowedKm,
    overLimitFee,
    paymentMethod,
    vehicle: vehicleTitle,
    vehicleId,
    selectedMode,
    promoCode,
    discountAmount,
    isCompany,
    companyName,
    ico,
    dic,
    icDph,
    billingStreet,
    billingCity,
    billingPsc,
    billingCountry,
    contactStreet,
    contactCity,
    contactPsc,
    contactCountry,
    termsAccepted,
    dataProcessingAccepted,
    dataProcessingAccepted,
    status,
    files,
  });

  console.log("new reservaiton", newReservation);
  const vehicleDoc = await Product.findById(vehicleId);

  if (vehicleDoc) {
    vehicleDoc.reservations.push({
      reservationSince: new Date(pickupDate),
      reservationUntil: new Date(dropoffDate),
    });

    await vehicleDoc.save();
    console.log("Vehicle reservation updated:", vehicleDoc);
  } else {
    console.warn("Vehicle not found with ID:", vehicleId);
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465, // or 587
    secure: true, // true for 465, false for 587
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  console.log("Nodemailer transporter created");

  const userMailOptions = {
    from: "acido256@gmail.com",
    to: email,
    subject: "Vehicle Reservation Confirmation",
    text: `
      🚗 Vehicle Reservation Details:
      ----------------------------------
      Vehicle Title: ${vehicleTitle}
      Category: ${vehicleCategory}
      Features: ${vehicleFeatures?.join(", ")}

      📅 Reservation Period:
      ----------------------------------
      Pickup: ${pickupDate} at ${pickupTime}
      Drop-off: ${dropoffDate} at ${dropoffTime}

      💰 Payment Details:
      ----------------------------------
      Rental Price: ${rentalPrice}€
      Deposit: ${depositFee}€
      Allowed KM: ${allowedKm} km
      Over-limit Fee: ${overLimitFee}€/km
      Payment Method: ${paymentMethod}

      📍 Pickup Mode: ${selectedMode}

      ${
        promoCode
          ? `🎟️ Promo Code Applied: ${promoCode} (-${discountAmount}%)`
          : ""
      }

      📞 Contact Address:
      ----------------------------------
      Street: ${contactStreet}, City: ${contactCity}, PSC: ${contactPsc}, Country: ${contactCountry}

      ${
        isCompany
          ? `
      🏢 Company Information:
      ----------------------------------
      Company Name: ${companyName}
      IČO: ${ico}
      DIČ: ${dic}
      IČ DPH: ${icDph}

      🧾 Billing Address:
      ----------------------------------
      Street: ${billingStreet}, City: ${billingCity}, PSC: ${billingPsc}, Country: ${billingCountry}

      
      `
          : ""
      }

      📩 Thank you for your reservation!
    `,
  };

  const adminMailOptions = {
    from: "acido256@gmail.com",
    to: "acido256@gmail.com",
    subject: "New Vehicle Reservation",
    text: `
      🚗 New Reservation Received:
      ----------------------------------
      Vehicle: ${vehicleTitle}
      Image: ${vehicleImage}
      Category: ${vehicleCategory}
      Features: ${vehicleFeatures?.join(", ")}

      📅 Reservation Period:
      ----------------------------------
      Pickup: ${pickupDate} at ${pickupTime}
      Drop-off: ${dropoffDate} at ${dropoffTime}

      💰 Payment Details:
      ----------------------------------
      Rental Price: ${rentalPrice}€
      Deposit: ${depositFee}€
      Allowed KM: ${allowedKm} km
      Over-limit Fee: ${overLimitFee}€/km
      Payment Method: ${paymentMethod}

      📍 Pickup Mode: ${selectedMode}

      🎟️ Promo Code: ${promoCode ? `${promoCode} (-${discountAmount}%)` : "N/A"}

      🏠 Address Details:
      ----------------------------------
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}
      ID Number: ${idNumber}
      Birth Number: ${birthNumber}
      Driver’s License: ${licenseNumber}
      📞 Contact Address:
      ----------------------------------
      Street: ${contactStreet}, City: ${contactCity}, PSC: ${contactPsc}, Country: ${contactCountry}

      ${
        isCompany
          ? `
      🏢 Company Information:
      ----------------------------------
      Company Name: ${companyName}
      IČO: ${ico}
      DIČ: ${dic}
      IČ DPH: ${icDph}

      🧾 Billing Address:
      ----------------------------------
      Street: ${billingStreet}, City: ${billingCity}, PSC: ${billingPsc}, Country: ${billingCountry}

     
      `
          : ""
      }

      ✅ Agreements:
      ----------------------------------
      Terms of Use Accepted: ${termsAccepted ? "Yes" : "No"}
      Data Processing Accepted: ${dataProcessingAccepted ? "Yes" : "No"}

      📂 Attached Files: ${files ? files.length : "None"}
    `,
  };

  try {
    transporter
      .sendMail(userMailOptions)
      .then(() => console.log("User email sent successfully"))
      .catch((err) => console.error("Error sending user email:", err));

    transporter
      .sendMail(adminMailOptions)
      .then(() => console.log("Admin email sent successfully"))
      .catch((err) => console.error("Error sending admin email:", err));

    res
      .status(200)
      .json({
        message: "Reservation created, emails are being sent in the background",
      });

    console.log("Emails sent successfully");
    res.status(200).json({ message: "Reservation emails sent" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "Error sending emails", error });
  }
}
