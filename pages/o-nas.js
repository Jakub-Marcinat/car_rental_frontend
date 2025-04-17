import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { Clock, Car, Calendar, CheckCircle, ArrowRight } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-corklasBackground">
      <Header />
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <Image
          src="/cars/evgeny-tchebotarev-aiwuLjLPFnU-unsplash.jpg"
          alt="Autopožičovňa vozový park"
          fill
          className="object-cover brightness-[0.35] scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <span className="text-corklasYellow uppercase tracking-widest text-sm font-medium mb-4">
            Autopožičovňa áut SK
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 tracking-tightest">
            O nás
          </h1>
          <div className="w-24 h-1 bg-corklasYellow rounded-full"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="mb-24 max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl leading-relaxed text-zinc-200 font-light">
            Sme autopožičovňa s{" "}
            <span className="text-corklasYellow font-medium">
              dlhoročnou tradíciou
            </span>{" "}
            a silným dôrazom na spokojnosť našich zákazníkov. Už roky
            poskytujeme spoľahlivé a flexibilné služby v oblasti prenájmu
            vozidiel pre jednotlivcov aj firmy. Naším cieľom je ponúknuť vám
            pohodlný, bezpečný a bezstarostný spôsob dopravy – nech už sú vaše
            potreby akékoľvek.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-24">
          <div className="bg-gradient-card rounded-2xl p-8 md:p-10 border border-zinc-800/50 hover-lift group hover:-translate-y-1 transition-all duration-300">
            <Car className="w-14 h-14 text-corklasYellow mb-6 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-6 group-hover:text-corklasYellow transition-colors">
              Ponuka vozidiel na mieru
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed">
              V našej autopožičovni nájdete široký výber vozidiel všetkých
              kategórií – od kompaktných mestských áut ideálnych na každodenné
              jazdy, cez pohodlné rodinné vozidlá, až po reprezentatívne luxusné
              modely a úžitkové vozidlá či dodávky.
            </p>
          </div>

          <div className="bg-gradient-card rounded-2xl p-8 md:p-10 border border-zinc-800/50 hover-lift group hover:-translate-y-1 transition-all duration-300">
            <Calendar className="w-14 h-14 text-corklasYellow mb-6 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-6 group-hover:text-corklasYellow transition-colors">
              Prenájom na krátku aj dlhú dobu
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed">
              Potrebujete auto len na víkend, dovolenku, služobnú cestu alebo
              hľadáte dlhodobé riešenie mobility pre firmu? U nás si môžete
              prenajať vozidlo presne na tak dlho, ako potrebujete – bez
              zbytočných komplikácií.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-full min-h-[400px] hover-lift hover:-translate-y-1 transition-all duration-300">
            <Image
              src="/cars/victor-furtuna-0mchrVHAYzg-unsplash.jpg"
              alt="Prenájom áut"
              fill
              className="object-cover transition-transform duration-2000 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                Kvalitné vozidlá
              </h3>
              <p className="text-zinc-300">
                Pravidelne obnovujeme a servisujeme celý vozový park
              </p>
            </div>
          </div>

          <div className="bg-gradient-card rounded-2xl p-8 md:p-10 border border-zinc-800/50 hover-lift group hover:-translate-y-1 transition-all duration-300">
            <Clock className="w-14 h-14 text-corklasYellow mb-6 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-6 group-hover:text-corklasYellow transition-colors">
              Nonstop k dispozícii – 24/7
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed">
              Chápeme, že situácie, kedy potrebujete auto, neprichádzajú vždy
              počas bežných otváracích hodín. Práve preto sme pre vás k
              dispozícii 24 hodín denne, 7 dní v týždni. Či už ide o skoré ráno,
              neskorý večer, víkend alebo sviatok.
            </p>
          </div>
        </div>

        <div className="bg-gradient-dark rounded-2xl p-8 md:p-12 border border-zinc-800/50 mb-24 shadow-inner-lg">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 text-center">
              Prečo si vybrať práve nás?
            </h2>
            <div className="w-16 h-1 bg-corklasYellow mx-auto mb-12 rounded-full"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div className="flex items-start gap-4 group">
                <div className="bg-zinc-800/50 rounded-full p-2 mt-1 group-hover:bg-yellow-300/20 transition-colors">
                  <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-white mb-2">
                    Dlhoročné skúsenosti
                  </h3>
                  <p className="text-zinc-300">
                    Profesionálny prístup založený na rokoch v odbore
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-zinc-800/50 rounded-full p-2 mt-1 group-hover:bg-yellow-300/20 transition-colors">
                  <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-white mb-2">
                    Široký výber vozidiel
                  </h3>
                  <p className="text-zinc-300">
                    Kvalitné a pravidelne servisované automobily
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-zinc-800/50 rounded-full p-2 mt-1 group-hover:bg-yellow-300/20 transition-colors">
                  <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-white mb-2">
                    Flexibilný prenájom
                  </h3>
                  <p className="text-zinc-300">
                    Krátkodobé aj dlhodobé možnosti prenájmu
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-zinc-800/50 rounded-full p-2 mt-1 group-hover:bg-yellow-300/20 transition-colors">
                  <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-white mb-2">
                    Riešenia na mieru
                  </h3>
                  <p className="text-zinc-300">
                    Pre jednotlivcov aj firemných klientov
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-zinc-800/50 rounded-full p-2 mt-1 group-hover:bg-yellow-300/20 transition-colors">
                  <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-white mb-2">
                    Dostupnosť 24/7
                  </h3>
                  <p className="text-zinc-300">
                    Vždy pripravení pomôcť, keď to potrebujete
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-zinc-800/50 rounded-full p-2 mt-1 group-hover:bg-yellow-300/20 transition-colors">
                  <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-white mb-2">
                    Férové ceny
                  </h3>
                  <p className="text-zinc-300">
                    Žiadne skryté poplatky ani nepríjemné prekvapenia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl font-display font-medium mb-10 text-white leading-relaxed">
            Vaša spokojnosť je pre nás prioritou. Sme tu, aby sme vám pomohli
            dostať sa tam, kam potrebujete – pohodlne, rýchlo a bez starostí.
          </p>
          <Link
            href="/ponuka-vozidiel"
            className="inline-flex items-center gap-2 bg-corklasYellow hover:bg-corklasYellow text-black font-bold py-4 px-8 rounded-xl transition-colors text-lg group"
          >
            Prehliadať vozidlá
            <ArrowRight className="w-5 h-5 group-hover:translate-x-[6px] transition-transform" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
