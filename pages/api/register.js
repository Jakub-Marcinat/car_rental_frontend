import { hash } from "bcryptjs";
import { User } from "@/models/User";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { firstName, lastName, email, phone, password } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: "Vyplňte všetky polia" });
  }

  await mongooseConnect();

  const existing = await User.findOne({ email });
  if (existing) {
    return res
      .status(400)
      .json({ error: "Užívateľ s týmto emailom už existuje." });
  }

  const hashedPassword = await hash(password, 10);

  try {
    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      phone,
      password: hashedPassword,
      provider: "credentials",
    });

    return res.status(201).json({ success: true, user });
  } catch (err) {
    console.error("Chyba pri vytváraní užívateľa:", err);
    return res
      .status(500)
      .json({ error: err.message || "Nepodarilo sa vytvoriť užívateľa" });
  }
}
