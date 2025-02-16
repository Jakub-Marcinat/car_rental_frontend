const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("objednavka", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  function clearCart() {
    setCartProducts([]);
  }

  useEffect(() => {
    if (ls && ls.getItem("objednavka")) {
      setCartProducts(JSON.parse(ls.getItem("objednavka")));
    }
  }, []);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
