import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }],
    deposit: { type: Number, required: true },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: { type: Object },
    features: [{ type: String }],
    reservations: [
      {
        reservationSince: { type: Date },
        reservationUntil: { type: Date },
      },
    ],
    priceListing: {
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
            "Nižšia trieda",
            "Stredná trieda",
            "Vyššia trieda",
            "Luxusné autá",
            "Športové autá",
            "SUV",
            "Dodávky",
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
export default Product;
