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

      // Filter by Make and Model
      if (make) filter.category = make;
      if (model) filter.category = model;

      // Filter by Vehicle Category
      if (category) filter.vehicleCategory = category;

      // Filter by Properties (Transmission, Fuel, Drive)
      if (transmission) filter["properties.Prevodovka"] = transmission;
      if (fuel) filter["properties.Palivo"] = fuel;
      if (drive) filter["properties.Náhon"] = drive;

      // Filter by Availability
      if (pickupDate || dropoffDate) {
        filter.$or = [];

        if (pickupDate) {
          filter.$or.push({ reservationUntil: { $lt: new Date(pickupDate) } }); // Vehicle must be free before pickup
        }
        if (dropoffDate) {
          filter.$or.push({ reservationSince: { $gt: new Date(dropoffDate) } }); // Vehicle must be free after dropoff
        }
      }

      // Sorting by Price
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
