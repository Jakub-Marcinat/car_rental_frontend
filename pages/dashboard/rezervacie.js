import Image from "next/image";
import { Calendar, Clock, MapPin, CreditCard, CheckCircle } from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";

const getReservationPhase = (pickupDate, dropoffDate) => {
  const today = new Date();
  const pickup = new Date(pickupDate);
  const dropoff = new Date(dropoffDate);

  today.setHours(0, 0, 0, 0);
  pickup.setHours(0, 0, 0, 0);

  if (pickup > today) return "nadchadzajuca";
  if (pickup < today) {
    if (dropoff < today) {
      return "ukoncena";
    }
  }
  return "prebieha";
};

const phaseStyles = {
  nadchadzajuca: "bg-yellow-400/20 text-yellow-400",
  ukoncena: "bg-zinc-500/20 text-zinc-400",
  prebieha: "bg-blue-400/20 text-blue-400",
};

const phaseText = {
  nadchadzajuca: "Nadchádzajúca",
  ukoncena: "Ukončená",
  prebieha: "Prebieha",
};

const getDaysUntilPickup = (pickupDate) => {
  const today = new Date();
  const pickup = new Date(pickupDate);

  // Normalize both dates to ignore time
  today.setHours(0, 0, 0, 0);
  pickup.setHours(0, 0, 0, 0);

  const diffTime = pickup - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0)
    return `Začína o ${diffDays} ${diffDays === 1 ? "deň" : "dni"}`;
  if (diffDays === 0) return "Začína dnes";
  return "Rezervácia už prebehla";
};

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (!userId) return;

        const res = await fetch(`/api/reservation?userId=${userId}`);
        const data = await res.json();
        setReservations(data);
      } catch (error) {
        console.error("Failed to fetch reservations", error);
      }
    };

    fetchReservations();
  }, [userId]);
  return (
    <div>
      <Header />
      <DashboardLayout title="Moje rezervácie">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-white mb-2">
              Moje rezervácie
            </h2>
            <p className="text-zinc-400">
              Prehľad vašich predchádzajúcich, aktuálnych a nadchádzajúcich
              rezervácií
            </p>
          </div>

          <div className="flex border-b border-zinc-800 mb-8">
            <button className="px-6 py-3 text-white font-medium border-b-2 border-yellow-400">
              Všetky rezervácie ({reservations.length})
            </button>
          </div>

          <div className="space-y-6">
            {reservations.length === 0 && (
              <p className="text-zinc-400 text-center">
                Nemáte žiadne rezervácie.
              </p>
            )}

            {reservations.map((reservation) => (
              <div
                key={reservation._id}
                className={`bg-zinc-900/70 backdrop-blur-md rounded-3xl border border-zinc-800/50 overflow-hidden transition-opacity ${
                  ["completed", "canceled"].includes(reservation.status)
                    ? "opacity-80"
                    : ""
                }`}
              >
                <div className="p-6 md:p-8 border-b border-zinc-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-white">
                        {reservation.vehicle?.title}
                      </h3>
                      <p className="text-zinc-400 text-sm">
                        Rezervácia #{reservation.reservationNumber}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      phaseStyles[
                        getReservationPhase(
                          reservation.pickupDate,
                          reservation.dropoffDate
                        )
                      ]
                    }`}
                  >
                    {
                      phaseText[
                        getReservationPhase(
                          reservation.pickupDate,
                          reservation.dropoffDate
                        )
                      ]
                    }
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
                            <Calendar className="w-4 h-4 text-corklasYellow" />
                            <p className="text-white">
                              {reservation.pickupDate}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-zinc-500 mb-1">
                            Dátum vrátenia
                          </p>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-corklasYellow" />
                            <p className="text-white">
                              {reservation.dropoffDate}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-500 mb-1">
                            Miesto vyzdvihnutia
                          </p>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-corklasYellow" />
                            <p className="text-white">Slavnica 8, 018 54</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-zinc-500 mb-1">
                            Miesto vrátenia
                          </p>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-corklasYellow" />
                            <p className="text-white">Slavnica 8, 018 54</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-zinc-800/50 rounded-lg p-3">
                          <p className="text-xs text-zinc-500 mb-1">
                            Celková cena
                          </p>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-corklasYellow" />
                            <p className="text-white text-sm">
                              {reservation.rentalPrice} €
                            </p>
                          </div>
                        </div>

                        <div className="bg-zinc-800/50 rounded-lg p-3">
                          <p className="text-xs text-zinc-500 mb-1">
                            Stav rezervácie
                          </p>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <p className="text-white text-sm">
                              {{
                                pending: "Čaká na potvrdenie",
                                confirmed: "Potvrdená",
                                completed: "Ukončená",
                                canceled: "Zrušená",
                              }[reservation.status] || "Neznámy"}
                            </p>
                          </div>
                        </div>

                        <div className="bg-zinc-800/50 rounded-lg p-3">
                          <p className="text-xs text-zinc-500 mb-1">Začína o</p>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-corklasYellow" />
                            <p className="text-white text-sm">
                              {getDaysUntilPickup(reservation.pickupDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl mb-4">
                        <Image
                          src={
                            reservation.vehicle?.images[0] || "/cars/asd.jpg"
                          }
                          alt={reservation.carModel}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
