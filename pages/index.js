import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import NewProducts from "@/components/Newproducts";

export default function HomePage({ featuredProducts, newProducts }) {
  return (
    <div>
      {/* <Header /> */}
      <Hero />
      <div className="flex w-full justify-center gap-8 bg-corklasBackground px-20 pt-20">
        {featuredProducts.map((product) => (
          <Featured key={product._id} product={product} />
        ))}
      </div>

      {/* <NewProducts products={newProducts} /> */}
      <section className="relative bg-corklasBackground h-screen flex flex-col items-center justify-center px-4">
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-corklasRed opacity-10 rounded-full blur-3xl"></div>

        <div className="text-center relative z-10">
          <h1 className="text-white text-5xl font-semibold mb-6 font-aeonik max-w-[800px]">
            Objavte naše výnimočné služby prenájmu áut
          </h1>
          <p className="text-white lg:max-w-[600px] mx-auto">
            Zažite slobodu cestovania s našou širokou ponukou vozidiel. Či už
            hľadáte kompaktné auto alebo priestranné SUV, máme pre vás to pravé.
          </p>
        </div>

        <div className="relative z-10 mt-20  flex justify-center px-20 gap-8">
          <div className="bg-[#151515] w-full rounded-2xl shadow-lg flex flex-col items-center text-center lg: max-w-[350px]">
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
          </div>

          <div className="bg-[#151515] rounded-2xl  shadow-lg flex flex-col items-center text-center max-w-[350px]">
            <img
              src="/Shaking_hands.jpeg"
              alt="24/7 Support"
              className="w-full max-h-[160px] object-cover rounded-lg mb-6"
            />
            <h3 className="text-white text-lg mt-2 font-bold">
              Sme tu pre vás: 24/7 podpora
            </h3>
            <p className="text-gray-300 mt-2  pb-8 px-4">
              Náš tím vám vždy ochotne pomôže – kedykoľvek to budete potrebovať.
            </p>
          </div>

          <div className="bg-[#151515] rounded-2xl shadow-lg flex flex-col items-center text-center max-w-[350px]">
            <img
              src="/Parking_lot.jpg"
              alt="Quality Fleet"
              className="w-full max-h-[160px] object-cover rounded-lg mb-6"
            />
            <h3 className="text-white text-lg mt-2 font-bold">
              Preskúmajte našu flotilu vozidiel
            </h3>
            <p className="text-gray-300 mt-2 pb-8 px-4">
              Prezrite si našu pestrú ponuku a nájdite si ideálne auto pre seba.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-corklasBackground h-screen flex flex-col items-end text-white pt-20">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="absolute lg:-top-6 lg:-left-0 lg:w-[500px] lg:h-[700px] bg-corklasYellow rounded-lg hidden lg:block"></div>

          <div className="relative flex-1 flex-col z-10">
            <div className=" w-full flex flex-col items-end mb-20">
              <div>
                <h2 className="text-4xl  font-semibold mb-4">
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
            <div className="relative flex justify-end">
              <div className="mt-12 z-10 lg:max-w-[800px] bg-white text-black rounded-lg shadow-lg p-6 flex flex-col lg:flex-row  justify-between gap-6">
                <div>
                  <h3 className="text-xl z-10 font-semibold">
                    Zažite jazdu bez kompromisov
                  </h3>
                  <p className="text-gray-600">
                    Objavte špičkové vozidlá a užívajte si bezproblémový
                    prenájom.
                  </p>
                </div>
                <button className="bg-corklasYellow text-black px-6 py-3 rounded-full font-semibold hover:opacity-80 transition">
                  Rezervovať teraz
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-corklasBackground py-40 px-4 lg:px-12">
        <div className="flex flex-col items-center mb-10  ">
          <h1 className="text-white text-4xl font-bold">Kontakt</h1>
          <div className="bg-corklasYellow w-20 h-3 mt-4 rounded-xl"></div>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2617.698155413103!2d18.185934376348914!3d48.9973013713513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47149b48c332819d%3A0x4795fcbe8420562a!2sCorKlas!5e0!3m2!1sen!2ssk!4v1742419423679!5m2!1sen!2ssk"
              loading="lazy"
            ></iframe>
          </div>

          <div className="w-full lg:w-1/2 h-96 bg-[#151515] text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Nájdete nás tu</h2>

            <div className="flex items-center gap-4 mb-4">
              <svg
                className="w-6 h-6 text-corklasYellow"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
              </svg>
              <p>Slavnica 8, 018 54 Slavnica</p>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <svg
                className="w-6 h-6 text-corklasYellow"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.22 11.72 11.72 0 003.78.6 1 1 0 011 1v3.77a1 1 0 01-1 1A19.92 19.92 0 012 4.92a1 1 0 011-1h3.77a1 1 0 011 1 11.72 11.72 0 00.6 3.78 1 1 0 01-.22 1.11z" />
              </svg>
              <p>+421 940 884 615</p>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <svg
                className="w-6 h-6 text-corklasYellow"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16v16H4V4zm16-2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6.5 11.5l5.5 3.5 5.5-3.5V7l-5.5 3.5L6.5 7v4.5z" />
              </svg>
              <p>corklassro@gmail.com</p>
            </div>

            <h3 className="text-xl font-semibold mb-2">Otváracie hodiny</h3>

            <p>
              Pondelok - Piatok:{" "}
              <span className="text-gray-300">08:00 - 18:00</span>
            </p>
            <p>
              Sobota: <span className="text-gray-300">09:00 - 14:00</span>
            </p>
            <p>
              Nedeľa: <span className="text-gray-300">Zatvorené</span>
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-corklasCard flex flex-col px-16">
        <div className="grid grid-cols-4 pt-20 pb-12 gap-6">
          <div>
            <img src="/CorklasLogo.png"></img>
          </div>
          <p className="text-white font-medium">
            V CORKLAS ponúkame široký výber kvalitných vozidiel, ktoré vyhovujú
            vašim potrebám a rozpočtu. S rokmi skúseností v automobilovom
            priemysle.
          </p>
          <div>
            <h3 className="text-white text-xl font-bold mb-2">
              Kontaktujte Nás
            </h3>
            <div className="flex items-center gap-4 mb-2">
              <svg
                className="w-6 h-6 text-corklasYellow"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
              </svg>
              <p className="text-white text-md">Slávnica 8, 01854 Slávnica</p>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <svg
                className="w-6 h-6 text-corklasYellow"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.22 11.72 11.72 0 003.78.6 1 1 0 011 1v3.77a1 1 0 01-1 1A19.92 19.92 0 012 4.92a1 1 0 011-1h3.77a1 1 0 011 1 11.72 11.72 0 00.6 3.78 1 1 0 01-.22 1.11z" />
              </svg>
              <p className="text-white text-md">(+421) 940 884 615s</p>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <svg
                className="w-6 h-6 text-corklasYellow"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16v16H4V4zm16-2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6.5 11.5l5.5 3.5 5.5-3.5V7l-5.5 3.5L6.5 7v4.5z" />
              </svg>
              <p className="text-white text-md">corklassro@gmail.com</p>
            </div>
          </div>
          <div>
            <h3 className="text-white text-xl font-bold mb-2">
              Prihlásiť sa na odber
            </h3>
            <p className="text-white mb-4">
              Zostaňte v kontakte s nami a získajte ponuky!
            </p>
            <div className="">
              <input
                class="pl-4 py-3 lg:max-w-44 rounded-tl-md rounded-bl-md "
                placeholder="Zadajte email"
                type="text"
                name="email_id"
                required=""
                autocomplete="off"
              />
              <button
                class="py-3 px-6 bg-corklasYellow rounded-tr-lg rounded-br-lg"
                type="submit"
              >
                Prihlásiť sa
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-white py-6">
          <p>Copyright ©2024. Všetky práva vyhradené.</p>
        </div>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductsIds = [
    "67a3dc3f82c364b5dd39017d",
    "67a3dc7f82c364b5dd390197",
    "67a3dc3f82c364b5dd39017d",
    "672b2608187ad6200a382cdb",
    "672b2608187ad6200a382cdb",
    "672b2608187ad6200a382cdb",
  ];
  await mongooseConnect();
  const featuredProducts = await Product.find({
    _id: { $in: featuredProductsIds },
  });
  const newProducts = await Product.find({}, null, { limit: 3 });

  return {
    props: {
      featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
