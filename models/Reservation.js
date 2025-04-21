const mongoose = require("mongoose");
const { Schema, models, model } = mongoose;

const ReservationSchema = new Schema(
  {
    reservationNumber: { type: String, unique: true, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    pickupDate: { type: Date, required: true },
    dropoffDate: { type: Date, required: true },
    pickupTime: { type: String, required: true },
    dropoffTime: { type: String, required: true },
    allowedKm: { type: Number, required: true },
    rentalPrice: { type: Number, required: true },
    depositFee: { type: Number, required: true },
    overLimitFee: { type: Number, default: 0 },

    paymentMethod: { type: String, required: true },

    isCompany: { type: Boolean, default: false },
    companyName: { type: String, default: null },
    ico: { type: String, default: null },
    dic: { type: String, default: null },
    icDph: { type: String, default: null },

    billingStreet: { type: String, default: null },
    billingCity: { type: String, default: null },
    billingPsc: { type: String, default: null },
    billingCountry: { type: String, default: null },
    contactStreet: { type: String, default: null },
    contactCity: { type: String, default: null },
    contactPsc: { type: String, default: null },
    contactCountry: { type: String, default: null },

    selectedMode: { type: String, required: true },
    promoCode: { type: String, default: null },
    discountAmount: { type: Number, default: 0 },

    termsAccepted: { type: Boolean, required: true },
    dataProcessingAccepted: { type: Boolean, required: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Reservation =
  models?.Reservation || model("Reservation", ReservationSchema);
