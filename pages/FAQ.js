"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Info, AlertTriangle, HelpCircle } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// FAQ Accordion Item Component
function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-800/50 rounded-xl overflow-hidden mb-4">
      <button
        className="w-full flex items-center justify-between p-5 text-left bg-zinc-900/70 hover:bg-zinc-800/70 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white font-medium">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-yellow-300 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-5 bg-zinc-800/30 border-t border-zinc-800/50">
          <p className="text-zinc-300">{answer}</p>
        </div>
      )}
    </div>
  );
}

// Fee Item Component
function FeeItem({ title, description, amount }) {
  return (
    <div className="border border-zinc-800/50 rounded-xl overflow-hidden mb-4 bg-zinc-900/70">
      <div className="p-5 flex justify-between items-start">
        <div>
          <h3 className="text-white font-medium mb-1 ">{title}</h3>
          {description && (
            <p className="text-zinc-400 text-sm max-w-[800px]">{description}</p>
          )}
        </div>
        <div className="text-right w-fit">
          {typeof amount === "number" ? (
            <span className="text-yellow-300 font-bold ">
              {amount.toFixed(2)} €
            </span>
          ) : (
            <span className="text-yellow-300/70 text-sm px-2 py-1  bg-yellow-300/10 rounded-full">
              {amount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function InformationPage() {
  // FAQ Data
  const faqItems = [
    {
      question: "Čo je zahrnuté v cene prenájmu?",
      answer:
        "V cene prenájmu je povinné zmluvné poistenie, havarijné poistenie vozidla, povinná výbava a diaľničná známka platná na území Slovenskej republiky.",
    },
    {
      question: "V akom stave je vozidlo pri odovzdaní nájomcovi?",
      answer:
        "Pri odovzdaní nájomcovi je vozidlo technicky nezávadné, má vyčistený interiér a exteriér.",
    },
    {
      question: "Do ktorých krajín môžem s vozidlom vycestovať?",
      answer:
        "Vycestovať môžte do krajín v rámci EÚ. Pri vytváraní objednávky si zvoľte 'režim' a vyberiete si krajinu do ktorej plánujete vycestovať.",
    },
    {
      question: "Môžem cestovať aj do krajín mimo Európskej Únie?",
      answer:
        "Vstup nie je povolený do krajín Albánska, Andora, Bieloruska, Čierna Hora, Bosna a Hercegovina, Cyprus, Irán, Izrael, Maroko, Rumunsko, Rusko, Slovinsko, Srbsko, Tunisko, Turecko, Ukrajina. Ostatné krajiny mimo EÚ sú na individuálnom posúdení - 'režim 4'.",
    },
    {
      question: "Môžem vozidlo prevziať / odovzdať aj mimo otváracích hodín?",
      answer:
        "Áno, poplatok za prevzatie alebo odovzdanie vozidla mimo otváracích hodín je 30€.",
    },
    {
      question: "Ako môžem platiť za prenájom vozidla?",
      answer: "Akceptujeme platbu v hotovosti a platbu prevodom.",
    },
    {
      question: "Majú vozidlá diaľničnú známku?",
      answer:
        "Všetky vozidlá majú platnú diaľničnú známku v rámci Slovenskej republiky. Pri vycestovaní mimo hraníc SR je nájomca povinný hradiť si poplatky za spoplatnené cesty sám.",
    },
    {
      question: "Je možná preprava zvierat?",
      answer:
        "Preprava zvierat je možná iba v prepravnom boxe určenom pre zvieratá.",
    },
    {
      question: "Ako mám postupovať keď viem, že budem meškať?",
      answer:
        "Meškanie je potrebné čím skôr nahlásiť na telefónnom čísle +421 910 333 400 alebo vo svojom zákazníckom konte. V prípade neohláseného meškania viac ako 30 minút, vás budeme pokutovať vo výške 20€ až po preplatenie celého dňa nájmu vozidla.",
    },
    {
      question: "Čo znamená jeden deň prenájmu?",
      answer:
        "Jeden deň prenájmu znamená 24 hodín. Po 24 hodinách je nájomcovi účtovaná cena nájmu za ďalší deň.",
    },
    {
      question: "Čo ak dostanem pokutu?",
      answer:
        "V prípade, že sa rozhodnete neuhratiť pokutu za priestupok okamžite a prenajímateľ dostane výzvu na jej zaplatenie, budeme požadovať úplnú sumu kompenzácie od nájomcu, ktorý bol v čase porušenia zmluvy uvedený ako nájomník. Taktiež vám budeme účtovať administratívny poplatok za spracovanie pokuty vo výške 30€.",
    },
    {
      question: "Aký je minimálny vek vodiča?",
      answer:
        "Minimálny vek vodiča ktorý si chce vozidlo prenajať je 18 rokov. Podmienkou je vodičský preukaz.",
    },
  ];

  const feeItems = [
    {
      title: "Administratívny poplatok za spracovanie pokuty",
      description: "",
      amount: 50.0,
    },
    {
      title: "Nedotankovanie vozidla",
      description:
        "Môže byť udelená pokuta vo výške až 150€, ktorá bude automaticky odrátaná z depozitu.",
      amount: "individuálne posúdenie",
    },

    {
      title: "Nesprávne použitie paliva",
      description: "",
      amount: "individuálne posúdenie",
    },
    {
      title: "Nevrátenie / strata dokladov, kľúčov",
      description:
        "Nevrátenie dokladov alebo kľúčov do 24 hodín, resp. ich strata, sa môže pokutovať od 200€ - 500€.",
      amount: 200.0,
    },
    {
      title: "Nevrátenie / strata kompletnej povinnej výbavy",
      description: "",
      amount: 40.0,
    },
    {
      title: "Nezakúpenie diaľničnej známky v zahraničí",
      description:
        "K našim vozidlám je platná diaľničná známka v rámci Slovenskej republiky, avšak ak sa nájomca rozhodne využiť spoplatnené cesty mimo Slovenska, je nevyhnutné, aby si nájomca poplatky za využite ciest mimo SR hradil sám.",
      amount: "individuálne posúdenie",
    },
    {
      title: "Pokuta za fajčenie vo vozidle, stopy po fajčení",
      description: "Vo vozidlách je prísny zákaz fajčenia.",
      amount: 250.0,
    },
    {
      title: "Poplatok za odovzdanie a prevzatie vozidla mimo otváracích hodín",
      description: "Otváracie hodiny PO - PIA: 08:00 - 18:00",
      amount: 20.0,
    },
    {
      title: "Poplatok za režim",
      description: "",
      amount: "individuálne posúdenie",
    },
    {
      title: "Poškodenie interiéru",
      description: "",
      amount: "individuálne posúdenie",
    },
    {
      title:
        "Preplatenie prenájmu vozidla aj v čase servisu vozidla z dôvodu poškodenie vinou zákazníka",
      description: "",
      amount: "individuálne posúdenie",
    },
    {
      title: "Spoluúčasť pri poistnej udalosti",
      description: "10 %, minimálne však 400,- €",
      amount: 400.0,
    },
    {
      title: "Viditeľne znečistený interiér – nepovysávanie vozidla",
      description: "",
      amount: 20.0,
    },
    {
      title: "Viditeľne znečistený exteriér – neumytie vozidla",
      description: "",
      amount: 20.0,
    },
    {
      title: "Vycestovanie do zakázanej krajiny",
      description:
        "Vstup s vozidlom je zakázaný do krajín: Albánsko, Andora, Bielorusko, Čierna Hora, Bosna a Hercegovina, Cyprus, Irán, Izrael, Maroko, Rumunsko, Rusko, Slovinsko, Srbsko, Tunisko, Turecko, Ukrajina.",
      amount: 2000.0,
    },
    {
      title: "Znečistenie interiéru – nutnosť tepovania",
      description:
        "od 70€, závisí od počtu znečistených miest na sedenie/ interiéru",
      amount: 70.0,
    },
  ];

  return (
    <div className="min-h-screen bg-corklasBackground">
      <Header />
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <Image
          src="/cars/marc-kleen-h8UQV31X5AI.jpg"
          alt="Informácie o prenájme vozidiel"
          fill
          className="object-cover brightness-[0.35] scale-105 transform transition-transform duration-10000 hover:scale-100"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <span className="text-yellow-300 uppercase tracking-widest text-sm font-medium mb-4 animate-fade-in">
            Všetko čo potrebujete vedieť
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-white mb-6 tracking-tightest animate-fade-in animate-delay-100 text-center">
            Informácie
          </h1>
          <div className="w-24 h-1 bg-yellow-300 rounded-full animate-fade-in animate-delay-200"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* Introduction */}
        <div className="mb-16 max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl leading-relaxed text-zinc-200 font-light">
            Na tejto stránke nájdete odpovede na{" "}
            <span className="text-yellow-300 font-medium">
              najčastejšie otázky
            </span>{" "}
            a informácie o{" "}
            <span className="text-yellow-300 font-medium">
              poplatkoch a pokutách
            </span>
            , ktoré sa môžu vyskytnúť počas prenájmu vozidla.
          </p>
        </div>

        {/* FAQ Section */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-8 h-8 text-yellow-300" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              Časté otázky
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {faqItems.map((item, index) => (
              <FaqItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </section>

        {/* Fees Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="w-8 h-8 text-yellow-300" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              Poplatky a pokuty
            </h2>
          </div>

          <div className="bg-zinc-900/30 rounded-2xl p-6 md:p-8 border border-zinc-800/50 mb-8">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-yellow-300" />
              <h3 className="text-lg font-medium text-white">
                Dôležité informácie o poplatkoch
              </h3>
            </div>
            <p className="text-zinc-400 mt-2">
              Nižšie uvedené poplatky a pokuty môžu byť uplatnené v prípade
              porušenia zmluvných podmienok alebo nedodržania pravidiel
              prenájmu. Všetky poplatky sú uvedené vrátane DPH. V prípade
              individuálneho posúdenia sa výška poplatku stanovuje na základe
              rozsahu škody alebo porušenia.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {feeItems.map((item, index) => (
              <FeeItem
                key={index}
                title={item.title}
                description={item.description}
                amount={item.amount}
              />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-24 text-center max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl font-display font-medium mb-10 text-white leading-relaxed">
            Máte ďalšie otázky? Neváhajte nás kontaktovať.
          </p>
          <Link
            href="/#kontakt"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-xl transition-colors text-lg"
          >
            Kontaktujte nás
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
