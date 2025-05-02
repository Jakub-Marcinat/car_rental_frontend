import mongoose, { Schema, models } from "mongoose";

const DocumentSchema = new mongoose.Schema({
  idFront: { type: String },
  idFrontStatus: {
    type: String,
    enum: ["Čaká na overenie", "Overené", "Zamietnuté"],
    default: "Čaká na overenie",
  },
  idBack: { type: String },
  idBackStatus: {
    type: String,
    enum: ["Čaká na overenie", "Overené", "Zamietnuté"],
    default: "Čaká na overenie",
  },
  licenseFront: { type: String },
  licenseFrontStatus: {
    type: String,
    enum: ["Čaká na overenie", "Overené", "Zamietnuté"],
    default: "Čaká na overenie",
  },
  licenseBack: { type: String },
  licenseBackStatus: {
    type: String,
    enum: ["Čaká na overenie", "Overené", "Zamietnuté"],
    default: "Čaká na overenie",
  },
});

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
    reservations: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Reservation" },
    ],
    documents: { type: DocumentSchema, default: {} },
    invitedBy: { type: Schema.Types.ObjectId, ref: "User" },

    address: { type: String, trim: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["Muž", "Žena", "Iné"], trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    contactStreet: { type: String, trim: true },
    contactCity: { type: String, trim: true },
    contactPsc: { type: String, trim: true },
    contactCountry: { type: String, trim: true },

    companyName: { type: String, trim: true },
    ico: { type: String, trim: true },
    dic: { type: String, trim: true },
    icDph: { type: String, trim: true },

    billingStreet: { type: String, trim: true },
    billingCity: { type: String, trim: true },
    billingPsc: { type: String, trim: true },
    billingCountry: { type: String, trim: true },
    drivingExperience: { type: String },
    preferredCarType: { type: String },
    rentalPurpose: { type: String },
    howDidYouHear: { type: String },
    additionalNotes: { type: String },
  },
  { timestamps: true }
);

// Use the same collection as NextAuth: "users"
export const User = models.User || mongoose.model("User", UserSchema);
