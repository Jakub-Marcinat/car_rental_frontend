import { CartContextProvider } from "@/components/CartContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

import { createGlobalStyle } from "styled-components";

// const GlobalStyles = createGlobalStyle`
// body {
//   padding: 0;
//   margin: 0;
//   font-family: 'Roboto', sans-serif;
// }`;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      {/* <GlobalStyles /> */}
      <CartContextProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </CartContextProvider>
    </>
  );
}
