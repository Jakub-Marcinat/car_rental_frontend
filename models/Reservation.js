const { Schema, model, models } = require("mongoose");

const ReservationSchema = new Schema({
  lineItem: Object,
  name: String,
  email: String,
  city: String,
  postalCode: String,
  streetAdress: String,
  country: String,
  reserved: Boolean,
  paid: Boolean,
});

export const Reservation =
  models?.Reservation || model("Reservation", ReservationSchema);
