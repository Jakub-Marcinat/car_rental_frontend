import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import NewProducts from "@/components/Newproducts";
import Footer from "@/components/Footer";

export default function HomePage({ featuredProducts, newProducts }) {
  return (
    <div className="bg-background-image">
      <Hero />
      <div className="min-h-[800px] py-20 px-6 sm:px-10 lg:px-20">
        <div className="container justify-center gap-8 flex flex-wrap max-w-[1400px] mx-auto">
          {featuredProducts.map((product) => (
            <Featured key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* <NewProducts products={newProducts} /> */}

      <section className="relative flex flex-col items-center justify-center px-4 h-fit">
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 aspect-w-1 aspect-h-1 w-64 h-64 md:w-96 lg:w-[600px] bg-corklasRed opacity-20 rounded-full blur-[100px] overflow-hidden"></div>
        <div className="relative z-10 py-12 px-6 sm:px-10 lg:px-20">
          <div className="flex flex-col items-center mb-32 z-10">
            <h1 className="text-white text-center text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 font-aeonik max-w-[800px]">
              Objavte naše výnimočné služby prenájmu áut
            </h1>
            <p className="text-white lg:max-w-[600px] max-w-[500px] text-xs md:text-base mx-auto text-center">
              Zažite slobodu cestovania s našou širokou ponukou vozidiel. Či už
              hľadáte kompaktné auto alebo priestranné SUV, máme pre vás to
              pravé.
            </p>
          </div>
          <div className="container mx-auto flex justify-center gap-8 flex-wrap">
            <a
              href="/ponuka-vozidiel"
              className="bg-[#151515] rounded-2xl shadow-lg flex flex-col items-center text-center max-w-[350px] cursor-pointer hover:scale-[1.02] transition-all duration-200"
            >
              <img
                src="/Skoda_superb.avif"
                alt="Affordable Pricing"
                className="w-full max-h-[160px] object-cover rounded-lg mb-6"
              />
              <h3 className="text-white text-lg mt-2 font-bold">
                Dostupné ceny pre každý rozpočet
              </h3>
              <p className="text-gray-300 mt-2 pb-8 px-4">
                Naše konkurenčné ceny vám zaručia najvýhodnejšiu ponuku.
              </p>
            </a>

            <a
              href="#kontakt"
              className="bg-[#151515] rounded-2xl  shadow-lg flex flex-col items-center text-center max-w-[350px] cursor-pointer hover:scale-[1.02] transition-all duration-200"
            >
              <img
                src="/Shaking_hands.jpeg"
                alt="24/7 Support"
                className="w-full max-h-[160px] object-cover rounded-lg mb-6"
              />
              <h3 className="text-white text-lg mt-2 font-bold">
                Sme tu pre vás: 24/7 podpora
              </h3>
              <p className="text-gray-300 mt-2  pb-8 px-4">
                Náš tím vám vždy ochotne pomôže – kedykoľvek to budete
                potrebovať.
              </p>
            </a>

            <a
              href="/ponuka-vozidiel"
              className="bg-[#151515] rounded-2xl shadow-lg flex flex-col items-center text-center max-w-[350px] cursor-pointer hover:scale-[1.02] transition-all duration-200"
            >
              <img
                src="/Parking_lot.jpg"
                alt="Quality Fleet"
                className="w-full max-h-[160px] object-cover rounded-lg mb-6"
              />
              <h3 className="text-white text-lg mt-2 font-bold">
                Preskúmajte našu flotilu vozidiel
              </h3>
              <p className="text-gray-300 mt-2 pb-8 px-4">
                Prezrite si našu pestrú ponuku a nájdite si ideálne auto pre
                seba.
              </p>
            </a>
          </div>
        </div>
      </section>

      <section className="relative  flex flex-col items-end text-white pt-20">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="absolute lg:top-[100px] lg:-left-0 lg:w-[500px] lg:h-[700px] bg-corklasYellow rounded-lg hidden lg:block"></div>

          <div className="relative flex-1 flex-col z-10 mx-12">
            <div className="w-full flex flex-col md:items-end items-center mb-20">
              <div>
                <h2 className="text-4xl font-semibold mb-4 ">
                  Objavte radosť z jazdy
                </h2>
                <p className="text-gray-300 max-w-md leading-relaxed">
                  Vychutnajte si vzrušenie z otvorenej cesty s našou prémiovou
                  službou prenájmu áut. Od mestských jázd až po víkendové
                  dobrodružstvá.
                </p>
              </div>
            </div>
            <img
              src="/MercedesGTR.jpg"
              alt="Mercedes GTR"
              className="rounded-lg shadow-lg w-full"
            />
            <div className="relative flex justify-center md:justify-end ">
              <div className="mt-12 z-10 lg:max-w-[900px] bg-[#1a1a1a] text-black rounded-lg shadow-lg p-6 flex flex-col lg:flex-row justify-between md:items-center gap-6  md:px-20">
                <div>
                  <h3 className="text-md md:text-2xl z-10 font-bold mb-2 text-white">
                    Zažite jazdu bez kompromisov
                  </h3>
                  <p className="text-white text-sm md:text-lg">
                    Objavte špičkové vozidlá a užívajte si bezproblémový
                    prenájom.
                  </p>
                </div>
                <a
                  href="/ponuka-vozidiel"
                  className="bg-corklasYellow text-black px-4 py-4 rounded-full font-semibold hover:opacity-80 transition whitespace-nowrap h-fit"
                >
                  Rezervovať teraz
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="kontakt" className=" py-40 px-4 lg:px-12">
        <div className="flex flex-col items-center mb-10  ">
          <h1 className="text-white text-4xl font-bold">Kontakt</h1>
          <div className="bg-corklasRed w-20 h-3 mt-4 rounded-xl"></div>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2617.698155413103!2d18.185934376348914!3d48.9973013713513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47149b48c332819d%3A0x4795fcbe8420562a!2sCorKlas!5e0!3m2!1sen!2ssk!4v1742419423679!5m2!1sen!2ssk"
              loading="lazy"
            ></iframe>
          </div>

          <div className="w-full lg:w-1/2 h-[400px] bg-[#151515] text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Nájdete nás tu</h2>

            <div className="flex items-center gap-4 mb-3">
              <svg
                className="w-6 h-6 text-corklasRed"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
              </svg>
              <p>Slavnica 8, 018 54 Slavnica</p>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <svg
                className="w-6 h-6 text-corklasRed"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.22 11.72 11.72 0 003.78.6 1 1 0 011 1v3.77a1 1 0 01-1 1A19.92 19.92 0 012 4.92a1 1 0 011-1h3.77a1 1 0 011 1 11.72 11.72 0 00.6 3.78 1 1 0 01-.22 1.11z" />
              </svg>
              <p>+421 940 884 615</p>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <svg
                className="w-6 h-6 text-corklasRed"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16v16H4V4zm16-2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6.5 11.5l5.5 3.5 5.5-3.5V7l-5.5 3.5L6.5 7v4.5z" />
              </svg>
              <p>infopozicovnaaut@gmail.com</p>
            </div>

            <h3 className="text-xl font-semibold mb-6">Otváracie hodiny</h3>

            <p className="mb-2">
              Pondelok - Piatok:{" "}
              <span className="text-gray-300">08:00 - 18:00</span>
            </p>
            <p className="mb-2">
              Sobota: <span className="text-gray-300">09:00 - 14:00</span>
            </p>
            <p className="mb-2">
              Nedeľa: <span className="text-gray-300">Zatvorené</span>
            </p>
            <p className="my-4">
              <span className="text-gray-400">Možnosť dohody po telefóne</span>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductsIds = [
    "67f459d477783ee118204a5c",
    "6807a6901d1d14f5709af398",
    "680809decdcb266d2f90babf",
    "68081cf2ce29359b8dfec37c",
    "6808203bce29359b8dfec41e",
    "680aa2ee0a290c71a18f57e6",
  ];
  await mongooseConnect();
  const featuredProducts = await Product.find({
    _id: { $in: featuredProductsIds },
  });
  //const newProducts = await Product.find({}, null, { limit: 3 });

  return {
    props: {
      featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
      // newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
