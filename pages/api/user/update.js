import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  await mongooseConnect();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const {
    firstName,
    lastName,
    name,
    email,
    phone,
    image,
    address,
    dateOfBirth,
    gender,
    drivingExperience,
    preferredCarType,
    rentalPurpose,
    howDidYouHear,
    additionalNotes,

    contactStreet,
    contactCity,
    contactPsc,
    contactCountry,

    companyName,
    ico,
    dic,
    icDph,

    billingStreet,
    billingCity,
    billingPsc,
    billingCountry,
  } = req.body;

  const updatedUser = await User.findOneAndUpdate(
    { email: session.user.email },
    {
      firstName,
      lastName,
      name,
      email,
      phone,
      image,
      address,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      gender,
      drivingExperience,
      preferredCarType,
      rentalPurpose,
      howDidYouHear,
      additionalNotes,

      contactStreet,
      contactCity,
      contactPsc,
      contactCountry,

      companyName,
      ico,
      dic,
      icDph,

      billingStreet,
      billingCity,
      billingPsc,
      billingCountry,
    },
    { new: true }
  );

  res.json(updatedUser);
}
