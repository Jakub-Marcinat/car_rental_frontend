import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Not authenticated" });

  const {
    query: { id },
  } = req;

  await mongooseConnect();
  const user = await User.findById(id).lean();

  if (!user) return res.status(404).json({ error: "User not found" });

  const {
    name, email, phone,
    contactStreet, contactCity, contactPsc, contactCountry,
    companyName, ico, dic, icDph,
    billingStreet, billingCity, billingPsc, billingCountry,
  } = user;

  const [firstName, ...lastNameParts] = name?.split(" ") || [];
  const lastName = lastNameParts.join(" ");

  return res.status(200).json({
    firstName,
    lastName,
    email,
    phone,
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
  });
}
