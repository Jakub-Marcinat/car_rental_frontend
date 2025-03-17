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
    street,
    city,
    psc,
    country,
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
    vehicle,
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
  } = req.body;

  console.log("Received reservation request:", req.body);

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !street ||
    !city ||
    !psc ||
    !country ||
    !pickupDate ||
    !dropoffDate ||
    !pickupTime ||
    !dropoffTime ||
    !rentalPrice ||
    !depositFee ||
    !allowedKm ||
    !overLimitFee ||
    !paymentMethod ||
    !vehicle ||
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
    vehicle,
    pickupDate,
    dropoffDate,
    pickupTime,
    dropoffTime,
    allowedKm,
    rentalPrice,
    depositFee,
    overLimitFee,
    paymentMethod,
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
    selectedMode,
    promoCode,
    discountAmount,
    termsAccepted,
    dataProcessingAccepted,
    reserved: true,
    paid: false,
  });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: "acido256@gmail.com", pass: "ucge erey xkdb kuiq" },
  });

  console.log("Nodemailer transporter created");

  const userMailOptions = {
    from: "acido256@gmail.com",
    to: email,
    subject: "Vehicle Reservation Confirmation",
    text: `
      🚗 Vehicle Reservation Details:
      ----------------------------------
      Vehicle: ${vehicle}
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

      🏠 Address Details:
      ----------------------------------
      Street: ${street}, City: ${city}, PSC: ${psc}, Country: ${country}

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

      📞 Contact Address:
      ----------------------------------
      Street: ${contactStreet}, City: ${contactCity}, PSC: ${contactPsc}, Country: ${contactCountry}
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
      Vehicle: ${vehicle}
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
      Street: ${street}, City: ${city}, PSC: ${psc}, Country: ${country}

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

      📞 Contact Address:
      ----------------------------------
      Street: ${contactStreet}, City: ${contactCity}, PSC: ${contactPsc}, Country: ${contactCountry}
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
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    console.log("Emails sent successfully");
    res.status(200).json({ message: "Reservation emails sent" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "Error sending emails", error });
  }
}
