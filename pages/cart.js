import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background: #fff;
  border-radius: 10px;
  color: #000;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 150px;
  max-height: 150px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border-radius: 10px;
  img {
    max-width: 130px;
    max-height: 130px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setcity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAdress, setStreetAdress] = useState("");
  const [country, setCountry] = useState("");
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            {!cartProducts?.length && <div>Žiadna objednávka</div>}
            <h2>Objednávka</h2>
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Vozidlo</th>
                    <th>Počet dní</th>
                    <th>Cena</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]}></img>
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>13 dní</td>
                      <td>20€/deň</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Informácie o objednávke</h2>
              <form method="POST" action="/api/checkout">
                <Input
                  type="text"
                  placeholder="Meno"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Ulica"
                  value={streetAdress}
                  name="streetAdress"
                  onChange={(ev) => setStreetAdress(ev.target.value)}
                />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="Mesto"
                    value={city}
                    name="city"
                    onChange={(ev) => setcity(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="PSČ"
                    value={postalCode}
                    name="postalCode"
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  />
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Krajina"
                  value={country}
                  name="country"
                  onChange={(ev) => setCountry(ev.target.value)}
                />
                <input
                  type="hidden"
                  name="products"
                  value={cartProducts.join(",")}
                />
                <Button black block onClick={clearCart}>
                  Pokračovať
                </Button>
              </form>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
