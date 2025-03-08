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
    rentalPrice,
    depositFee,
    allowedKm,
    paymentMethod,
    vehicle,
  } = req.body;

  console.log("Received reservation request:", req.body);

  // Debug: Check if required fields are missing
  if (
    !firstName ||
    !lastName ||
    !email ||
    !rentalPrice ||
    !depositFee ||
    !allowedKm ||
    !paymentMethod ||
    !vehicle
  ) {
    console.log("Missing required fields:", req.body);
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Debug: Log transporter configuration
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: "acido256@gmail.com", pass: "ucge erey xkdb kuiq" },
  });

  console.log("Nodemailer transporter created");

  const mailOptions = {
    from: "acido256@gmail.com",
    to: [email, "jakubmarcinat@gmail.com"],
    subject: "Vehicle Reservation Confirmation",
    text: `Reservation for ${vehicle}
      Name: ${firstName} ${lastName}
      Rental Price: ${rentalPrice}€
      Deposit: ${depositFee}€
      Allowed KM: ${allowedKm} km
      Payment: ${paymentMethod}`,
  };

  console.log("Mail options created:", mailOptions);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    res.status(200).json({ message: "Reservation email sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email", error });
  }
}
