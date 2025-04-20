import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  await mongooseConnect();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { type, url } = req.body;

  const fieldMap = {
    idFront: ["documents.idFront", "documents.idFrontStatus"],
    idBack: ["documents.idBack", "documents.idBackStatus"],
    licenseFront: ["documents.licenseFront", "documents.licenseFrontStatus"],
    licenseBack: ["documents.licenseBack", "documents.licenseBackStatus"],
  };

  const [urlField, statusField] = fieldMap[type] || [];

  if (!urlField || !statusField) {
    return res.status(400).json({ error: "Invalid document type" });
  }

  const update = {
    [urlField]: url,
    [statusField]: "Čaká na overenie",
  };

  const updatedUser = await User.findOneAndUpdate(
    { email: session.user.email },
    { $set: update },
    { new: true }
  );

  res.status(200).json({ success: true, documents: updatedUser.documents });
}
