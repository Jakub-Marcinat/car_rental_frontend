import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: { type: Object },
    features: [{ type: String }],
    reservationSince: { type: Date },
    reservationUntil: { type: Date },
    numberOfRentalDays: {
      type: [
        {
          DaysOfRental: { type: String, required: true },
          dailyKM: { type: String, required: true },
          dailyRentalPrice: { type: String, required: true },
        },
      ],
      default: [],
    },
    availability: { type: Boolean, default: true },
    vehicleCategory: {
      type: [
        {
          type: String,
          enum: [
            "Lower class",
            "Middle class",
            "Upper class",
            "Luxury",
            "Sport",
            "SUV",
            "Vans",
          ],
        },
      ],
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
