const { Schema, model, models } = require("mongoose");

const ReservationSchema = new Schema(
  {
    lineItems: { type: Schema.Types.Mixed },
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAdress: String,
    country: String,
    reserved: Boolean,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Reservation =
  models?.Reservation || model("Reservation", ReservationSchema);
