import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  await mongooseConnect();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const updateData = req.body;

  const updatedUser = await User.findOneAndUpdate(
    { email: session.user.email },
    {
      $set: {
        [`documents.${Object.keys(updateData)[0]}`]:
          Object.values(updateData)[0],
        [`documents.${Object.keys(updateData)[1]}`]:
          Object.values(updateData)[1],
      },
    },
    { new: true }
  );

  res.json(updatedUser);
}
