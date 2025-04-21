import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Reservation } from "@/models/Reservation";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("Should be POST request");
    return;
  }

  const { name, email, city, postalCode, streetAdress, country, products } =
    req.body;

  await mongooseConnect();
  const productIds = products.split(",");
  const uniqueIds = [...new Set(productIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let lineItems = [];

  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    if (productInfo) {
      lineItems.push({
        price_data: {
          currency: "EUR",
          productData: { name: productInfo.title },
          amount: productInfo.price,
        },
      });
    }
  }
}
