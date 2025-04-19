import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String },
    phone: { type: String, trim: true },
    image: { type: String },
    emailVerified: { type: Date, default: null },
    role: {
      type: String,
      enum: ["user", "admin", "premium"],
      default: "user",
    },
    provider: { type: String, default: "credentials" },
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
    documents: {
      idFront: String,
      idBack: String,
      licenseFront: String,
      licenseBack: String,
    },
    invitedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Use the same collection as NextAuth: "users"
export const User = models.User || mongoose.model("User", UserSchema);
