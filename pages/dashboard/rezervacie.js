import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

export default function Reservations() {
  return (
    <DashboardLayout title="Moje rezervácie">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-white mb-2">
            Moje rezervácie
          </h2>
          <p className="text-zinc-400">
            Prehľad vašich predchádzajúcich, aktuálnych a nadchádzajúcich
            rezervácií
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800 mb-8">
          <button className="px-6 py-3 text-white font-medium border-b-2 border-yellow-400">
            Všetky rezervácie (5)
          </button>
          <button className="px-6 py-3 text-zinc-400 hover:text-white transition-colors">
            Nadchádzajúce (2)
          </button>
          <button className="px-6 py-3 text-zinc-400 hover:text-white transition-colors">
            Aktívne (0)
          </button>
          <button className="px-6 py-3 text-zinc-400 hover:text-white transition-colors">
            Ukončené (3)
          </button>
        </div>

        {/* Reservations List */}
        <div className="space-y-6">
          {/* Upcoming Reservation 1 */}
          <div className="bg-zinc-900/70 backdrop-blur-md rounded-3xl border border-zinc-800/50 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-zinc-800/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    Audi A6 Quattro
                  </h3>
                  <p className="text-zinc-400 text-sm">Rezervácia #A12345</p>
                </div>
              </div>
              <span className="text-xs bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full font-medium">
                Nadchádzajúca
              </span>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">
                        Dátum vyzdvihnutia
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-yellow-300" />
                        <p className="text-white">20.04.2023, 10:00</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500 mb-1">
                        Dátum vrátenia
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-yellow-300" />
                        <p className="text-white">25.04.2023, 18:00</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500 mb-1">
                        Miesto vyzdvihnutia
                      </p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-yellow-300" />
                        <p className="text-white">Bratislava, Hlavná 123</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500 mb-1">
                        Miesto vrátenia
                      </p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-yellow-300" />
                        <p className="text-white">Bratislava, Hlavná 123</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-xs text-zinc-500 mb-1">Stav platby</p>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <p className="text-white text-sm">Zaplatené</p>
                      </div>
                    </div>

                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-xs text-zinc-500 mb-1">Celková cena</p>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-yellow-300" />
                        <p className="text-white text-sm">450 €</p>
                      </div>
                    </div>

                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-xs text-zinc-500 mb-1">
                        Stav rezervácie
                      </p>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <p className="text-white text-sm">Potvrdená</p>
                      </div>
                    </div>

                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-xs text-zinc-500 mb-1">Začína o</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-300" />
                        <p className="text-white text-sm">3 dni</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl mb-4">
                    <Image
                      src="/cars/victor-furtuna-0mchrVHAYzg-unsplash.jpg"
                      alt="Audi A6 Quattro"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <Link
                      href="/dashboard/rezervacie/123"
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      Zobraziť detail
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-4 rounded-xl transition-colors">
                      Upraviť rezerváciu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Reservation 2 */}
          <div className="bg-zinc-900/70 backdrop-blur-md rounded-3xl border border-zinc-800/50 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-zinc-800/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    BMW X5
                  </h3>
                  <p className="text-zinc-400 text-sm">Rezervácia #B67890</p>
                </div>
              </div>
              <span className="text-xs bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full font-medium">
                Nadchádzajúca
              </span>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">
                        Dátum vyzdvihnutia
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-yellow-300" />
                        <p className="text-white">15.05.2023, 09:00</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500 mb-1">
                        Dátum vrátenia
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-yellow-300" />
                        <p className="text-white">20.05.2023, 17:00</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500 mb-1">
                        Miesto vyzdvihnutia
                      </p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-yellow-300" />
                        <p className="text-white">Bratislava, Hlavná 123</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500 mb-1">
                        Miesto vrátenia
                      </p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-yellow-300" />
                        <p className="text-white">Bratislava, Hlavná 123</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-xs text-zinc-500 mb-1">Stav platby</p>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                        <p className="text-white text-sm">Záloha</p>
                      </div>
                    </div>

                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-xs text-zinc-500 mb-1">Celková cena</p>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-yellow-300" />
                        <p className="text-white text-sm">680 €</p>
                      </div>
                    </div>

                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-xs text-zinc-500 mb-1">
                        Stav rezervácie
                      </p>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <p className="text-white text-sm">Potvrdená</p>
                      </div>
                    </div>

                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-xs text-zinc-500 mb-1">Začína o</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-300" />
                        <p className="text-white text-sm">28 dní</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl mb-4">
                    <Image
                      src="/cars/victor-furtuna-0mchrVHAYzg-unsplash.jpg"
                      alt="BMW X5"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <Link
                      href="/dashboard/rezervacie/124"
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      Zobraziť detail
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-4 rounded-xl transition-colors">
                      Upraviť rezerváciu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Past Reservation */}
          <div className="bg-zinc-900/70 backdrop-blur-md rounded-3xl border border-zinc-800/50 overflow-hidden opacity-80">
            <div className="p-6 md:p-8 border-b border-zinc-800/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800/80 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    Mercedes-Benz E-Class
                  </h3>
                  <p className="text-zinc-400 text-sm">Rezervácia #C54321</p>
                </div>
              </div>
              <span className="text-xs bg-zinc-700 text-zinc-300 px-3 py-1 rounded-full font-medium">
                Ukončená
              </span>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">
                        Dátum vyzdvihnutia
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-zinc-400" />
                        <p className="text-zinc-300">10.02.2023, 14:00</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500 mb-1">
                        Dátum vrátenia
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-zinc-400" />
                        <p className="text-zinc-300">15.02.2023, 12:00</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-zinc-800/30 rounded-lg p-3">
                      <p className="text-xs text-zinc-500 mb-1">Stav platby</p>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <p className="text-zinc-300 text-sm">Zaplatené</p>
                      </div>
                    </div>

                    <div className="bg-zinc-800/30 rounded-lg p-3">
                      <p className="text-xs text-zinc-500 mb-1">Celková cena</p>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-zinc-400" />
                        <p className="text-zinc-300 text-sm">520 €</p>
                      </div>
                    </div>

                    <div className="bg-zinc-800/30 rounded-lg p-3">
                      <p className="text-xs text-zinc-500 mb-1">
                        Stav rezervácie
                      </p>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <p className="text-zinc-300 text-sm">Ukončená</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl mb-4 opacity-80">
                    <Image
                      src="/cars/noir-mKOimPTdMyw-unsplash.jpg"
                      alt="Mercedes-Benz E-Class"
                      fill
                      className="object-cover grayscale"
                    />
                  </div>

                  <div className="mt-auto">
                    <Link
                      href="/dashboard/rezervacie/125"
                      className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 w-full"
                    >
                      Zobraziť detail
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
