import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  await mongooseConnect();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const {
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
  } = req.body;

  const updatedUser = await User.findOneAndUpdate(
    { email: session.user.email },
    {
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
    },
    { new: true }
  );

  res.json(updatedUser);
}
