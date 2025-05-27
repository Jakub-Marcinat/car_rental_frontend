import { CartContextProvider } from "@/components/CartContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        />

        <title>Autopožičovňa COR KLAS</title>
        <meta
          name="description"
          content="Prenájom áut jednoducho, rýchlo a spoľahlivo."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="autopožičovňa, prenájom auta, Trenčín, požičanie auta"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Autopožičovňa COR KLAS" />
        <meta
          property="og:description"
          content="Prenájom áut jednoducho, rýchlo a spoľahlivo."
        />
        <meta property="og:image" content="/opengraph-image.png" />
        <meta property="og:url" content="https://pozicovnaaut.sk/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartContextProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </CartContextProvider>
    </>
  );
}
