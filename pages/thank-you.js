import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight, Mail, Phone, Home } from "lucide-react";
import { useRouter } from "next/router";

export default function ThankYouPage() {
  const router = useRouter();
  const { reservationId } = router.query;
  return (
    <div className="min-h-screen bg-corklasBackground">
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <Image
          src="/cars/noir-mKOimPTdMyw.jpg"
          alt="Úspešná rezervácia"
          fill
          className="object-cover brightness-[0.35] scale-105 transform transition-transform duration-10000 hover:scale-100"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div className="bg-corklasYellow/20 rounded-full p-4 mb-6 animate-fade-in">
            <CheckCircle className="w-12 h-12 text-corklasYellow" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 tracking-tightest text-center animate-fade-in animate-delay-100">
            Ďakujeme
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 text-center max-w-2xl animate-fade-in animate-delay-200">
            Vaša rezervácia bola úspešne odoslaná
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="bg-gradient-card rounded-2xl p-8 md:p-10 border border-zinc-800/50 mb-16 shadow-inner-lg">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Rezervácia č. {reservationId} <br />
              bola potvrdená
            </h2>
            <div className="w-16 h-1 bg-corklasYellow mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-zinc-200 leading-relaxed max-w-2xl mx-auto">
              Na vašu e-mailovú adresu sme odoslali potvrdzujúci e-mail s
              detailmi vašej rezervácie. Náš tím vás bude čoskoro kontaktovať s
              ďalšími informáciami.
            </p>
          </div>

          {/* Information Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-zinc-800/30 rounded-xl p-6 text-center hover:-translate-y-1 transition-all duration-300 group">
              <div className="bg-zinc-800/80 rounded-full p-3 inline-flex mb-4 group-hover:bg-corklasYellow/20 transition-colors">
                <Mail className="w-8 h-8 text-corklasYellow" />
              </div>
              <h3 className="text-xl font-display font-medium text-white mb-3">
                E-mailové potvrdenie
              </h3>
              <p className="text-zinc-300">
                Skontrolujte si svoju e-mailovú schránku pre detaily rezervácie
              </p>
            </div>

            <div className="bg-zinc-800/30 rounded-xl p-6 text-center hover:-translate-y-1 transition-all duration-300 group">
              <div className="bg-zinc-800/80 rounded-full p-3 inline-flex mb-4 group-hover:bg-corklasYellow/20 transition-colors">
                <Phone className="w-8 h-8 text-corklasYellow" />
              </div>
              <h3 className="text-xl font-display font-medium text-white mb-3">
                Telefonický kontakt
              </h3>
              <p className="text-zinc-300">
                Budeme vás kontaktovať v priebehu 24 hodín pre potvrdenie
                detailov
              </p>
            </div>

            <div className="bg-zinc-800/30 rounded-xl p-6 text-center hover:-translate-y-1 transition-all duration-300 group">
              <div className="bg-zinc-800/80 rounded-full p-3 inline-flex mb-4 group-hover:bg-corklasYellow/20 transition-colors">
                <Home className="w-8 h-8 text-corklasYellow" />
              </div>
              <h3 className="text-xl font-display font-medium text-white mb-3">
                Vyzdvihnutie vozidla
              </h3>
              <p className="text-zinc-300">
                Informácie o vyzdvihnutí vozidla nájdete v e-maile
              </p>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-zinc-800/30 rounded-xl p-6 md:p-8">
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              Čo ďalej?
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-zinc-800/80 rounded-full p-1 mt-1">
                  <CheckCircle className="w-4 h-4 text-corklasYellow" />
                </div>
                <span className="text-zinc-200">
                  Skontrolujte si e-mail s potvrdením rezervácie
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-zinc-800/80 rounded-full p-1 mt-1">
                  <CheckCircle className="w-4 h-4 text-corklasYellow" />
                </div>
                <span className="text-zinc-200">
                  Pripravte si potrebné doklady (vodičský preukaz, občiansky
                  preukaz)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-zinc-800/80 rounded-full p-1 mt-1">
                  <CheckCircle className="w-4 h-4 text-corklasYellow" />
                </div>
                <span className="text-zinc-200">
                  Očakávajte telefonát od nášho tímu pre potvrdenie detailov
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-zinc-800/80 rounded-full p-1 mt-1">
                  <CheckCircle className="w-4 h-4 text-corklasYellow" />
                </div>
                <span className="text-zinc-200">
                  Dostavte sa na dohodnuté miesto vyzdvihnutia vozidla v
                  stanovenom čase
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-xl md:text-2xl font-display font-medium mb-8 text-white">
            Máte ďalšie otázky? Neváhajte nás kontaktovať.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ponuka-vozidiel"
              className="inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Prehliadať ďalšie vozidlá
            </Link>
            <Link
              href="/#kontakt"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-xl transition-colors group"
            >
              Kontaktujte nás
              <ArrowRight className="w-5 h-5 group-hover:translate-x-[6px] transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
