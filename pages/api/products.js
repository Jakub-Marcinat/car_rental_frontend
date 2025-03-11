import Product from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "GET") {
    try {
      const {
        make,
        model,
        category,
        transmission,
        fuel,
        drive,
        pickupDate,
        dropoffDate,
        order,
      } = req.query;
      const filter = {};

      if (make) filter.category = make;
      if (model) filter.category = model;

      if (category) filter.vehicleCategory = category;

      if (transmission) filter["properties.Prevodovka"] = transmission;
      if (fuel) filter["properties.Palivo"] = fuel;
      if (drive) filter["properties.Náhon"] = drive;

      if (pickupDate && dropoffDate) {
        filter.reservations = {
          $not: {
            $elemMatch: {
              reservationSince: { $lt: new Date(dropoffDate) },
              reservationUntil: { $gt: new Date(pickupDate) },
            },
          },
        };
      }

      let sort = {};
      if (order === "asc") sort.price = 1;
      if (order === "desc") sort.price = -1;

      const products = await Product.find(filter).sort(sort);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
