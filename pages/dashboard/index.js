import Image from "next/image";
import Link from "next/link";
import { User } from "@/models/User";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Edit,
  Save,
  ArrowRight,
  CheckCircle,
  UserCheck,
} from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { mongooseConnect } from "@/lib/mongoose";
import { useState } from "react";
import Header from "@/components/Header";
import { Switch } from "@/components/CustomSwitch";

export default function Dashboard({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    image: user?.image || "",
    contactStreet: user?.contactStreet || "",
    contactCity: user?.contactCity || "",
    contactPsc: user?.contactPsc || "",
    contactCountry: user?.contactCountry || "",
    companyName: user?.companyName || "",
    ico: user?.ico || "",
    dic: user?.dic || "",
    icDph: user?.icDph || "",
    billingStreet: user?.billingStreet || "",
    billingCity: user?.billingCity || "",
    billingPsc: user?.billingPsc || "",
    billingCountry: user?.billingCountry || "",
    dateOfBirth: user?.dateOfBirth
      ? new Date(user.dateOfBirth).toISOString().split("T")[0]
      : "",
    gender: user?.gender || "",
    drivingExperience: user?.drivingExperience || "",
    preferredCarType: user?.preferredCarType || "",
    rentalPurpose: user?.rentalPurpose || "",
    howDidYouHear: user?.howDidYouHear || "",
    additionalNotes: user?.additionalNotes || "",
  });
  const [isCompany, setIsCompany] = useState(false);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("category", "avatars");

    const res = await fetch("/api/user/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    if (result.links?.[0]) {
      setFormData((prev) => ({ ...prev, image: result.links[0] }));
    }
  };

  const saveChanges = async () => {
    const res = await fetch("/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const updatedUser = await res.json();
      setFormData(updatedUser);
      setIsEditing(false);
    } else {
      console.error("Dáta sa nepodarilo uložit");
    }
  };

  const getStatusBadge = (status1, status2) => {
    if (status1 === "Overené" && status2 === "Overené") {
      return (
        <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
          Overené
        </span>
      );
    }

    if (status1?.includes("zamietnuté") || status2?.includes("zamietnuté")) {
      return (
        <span className="text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded-full">
          Zamietnuté
        </span>
      );
    }

    return (
      <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">
        Čaká na overenie
      </span>
    );
  };

  return (
    <div>
      <div className="max-lg:hidden">
        <Header />
      </div>

      <DashboardLayout title={`Vitajte, ${user.name}`} user={user}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-white mb-2">
              Vitajte, {user.name.split(" ", 1)}
            </h2>
            <p className="text-zinc-400">
              Spravujte svoj profil a sledujte svoje rezervácie
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-zinc-900/70 backdrop-blur-md rounded-3xl border border-zinc-800/50 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-zinc-800/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-bold text-white">
                      Osobné údaje
                    </h3>
                    <button
                      className="flex items-center gap-2 text-sm text-corklasYellow hover:text-yellow-400 transition-colors"
                      onClick={() => setIsEditing((prev) => !prev)}
                    >
                      {isEditing ? (
                        <Save className="w-4 h-4" />
                      ) : (
                        <Edit className="w-4 h-4" />
                      )}
                      <span>{isEditing ? "Uložiť" : "Upraviť"}</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-zinc-800 mb-4">
                        <Image
                          src={formData.image || "/placeholder.png"}
                          alt="User avatar"
                          width={96}
                          height={96}
                          className="object-cover rounded-full h-full"
                        />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        hidden
                        id="avatar-upload"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="text-sm text-corklasYellow cursor-pointer hover:text-yellow-400"
                      >
                        Zmeniť fotku
                      </label>
                    </div>

                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1 min-w-[221px]">
                          <p className="text-sm text-zinc-500 flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-corklasYellow" />
                            Krstné meno
                          </p>
                          {isEditing ? (
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  firstName: e.target.value,
                                }))
                              }
                              className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                            />
                          ) : (
                            <p className="text-white">{formData.firstName}</p>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-zinc-500 flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-corklasYellow" />
                            Priezvisko
                          </p>
                          {isEditing ? (
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  lastName: e.target.value,
                                }))
                              }
                              className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                            />
                          ) : (
                            <p className="text-white">{formData.lastName}</p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm text-zinc-500 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-corklasYellow" />
                            E-mail
                          </p>
                          {isEditing ? (
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                              className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                            />
                          ) : (
                            <p className="text-white">{formData.email}</p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm text-zinc-500 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-corklasYellow" />
                            Telefón
                          </p>
                          {isEditing ? (
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                }))
                              }
                              className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                            />
                          ) : (
                            <p className="text-white">{formData.phone}</p>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-zinc-500 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-corklasYellow" />
                            Kontaktná Adresa - Ulica
                          </p>
                          {isEditing ? (
                            <input
                              type="text"
                              name="contactStreet"
                              value={formData.contactStreet}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  contactStreet: e.target.value,
                                }))
                              }
                              className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                            />
                          ) : (
                            <p className="text-white">
                              {formData.contactStreet}
                            </p>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-zinc-500 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-corklasYellow" />
                            Kontaktná Adresa - Mesto
                          </p>
                          {isEditing ? (
                            <input
                              type="text"
                              name="contactCity"
                              value={formData.contactCity}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  contactCity: e.target.value,
                                }))
                              }
                              className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                            />
                          ) : (
                            <p className="text-white">{formData.contactCity}</p>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-zinc-500 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-corklasYellow" />
                            Kontaktná Adresa - PSČ
                          </p>
                          {isEditing ? (
                            <input
                              type="text"
                              name="contactPsc"
                              value={formData.contactPsc}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  contactPsc: e.target.value,
                                }))
                              }
                              className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                            />
                          ) : (
                            <p className="text-white">{formData.contactPsc}</p>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-zinc-500 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-corklasYellow" />
                            Kontaktná Adresa - Krajina
                          </p>
                          {isEditing ? (
                            <input
                              type="text"
                              name="contactCountry"
                              value={formData.contactCountry}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  contactCountry: e.target.value,
                                }))
                              }
                              className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                            />
                          ) : (
                            <p className="text-white">
                              {formData.contactCountry}
                            </p>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-zinc-500 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-corklasYellow" />
                            Dátum narodenia
                          </p>
                          {isEditing ? (
                            <input
                              type="date"
                              value={formData.dateOfBirth}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  dateOfBirth: e.target.value,
                                })
                              }
                              className="bg-zinc-800 text-white px-2 py-1 rounded"
                            />
                          ) : (
                            <p className="text-white">
                              {formData.dateOfBirth
                                ? new Date(
                                    formData.dateOfBirth
                                  ).toLocaleDateString("sk-SK")
                                : ""}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="pt-6 border-t border-zinc-700">
                        <div className="flex items-center space-x-2 mb-4">
                          <Switch
                            id="isCompany"
                            checked={isCompany}
                            onCheckedChange={() =>
                              setIsCompany((prev) => !prev)
                            }
                          />
                          <h2 className="text-white font-semibold text-lg">
                            Som firma
                          </h2>
                        </div>

                        {isCompany && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                              <p className="text-sm text-zinc-500 flex items-center gap-2">
                                <UserIcon className="w-4 h-4 text-corklasYellow" />
                                Názov spoločnosti
                              </p>
                              {isEditing ? (
                                <input
                                  type="text"
                                  name="companyName"
                                  value={formData.companyName || ""}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      companyName: e.target.value,
                                    }))
                                  }
                                  className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                                />
                              ) : (
                                <p className="text-white">
                                  {formData.companyName}
                                </p>
                              )}
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-zinc-500 flex items-center gap-2">
                                <UserIcon className="w-4 h-4 text-corklasYellow" />
                                IČO
                              </p>
                              {isEditing ? (
                                <input
                                  type="text"
                                  name="ico"
                                  value={formData.ico || ""}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      ico: e.target.value,
                                    }))
                                  }
                                  className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                                />
                              ) : (
                                <p className="text-white">{formData.ico}</p>
                              )}
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-zinc-500 flex items-center gap-2">
                                <UserIcon className="w-4 h-4 text-corklasYellow" />
                                DIČ
                              </p>
                              {isEditing ? (
                                <input
                                  type="text"
                                  name="dic"
                                  value={formData.dic || ""}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      dic: e.target.value,
                                    }))
                                  }
                                  className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                                />
                              ) : (
                                <p className="text-white">{formData.dic}</p>
                              )}
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-zinc-500 flex items-center gap-2">
                                <UserIcon className="w-4 h-4 text-corklasYellow" />
                                IČ DPH
                              </p>
                              {isEditing ? (
                                <input
                                  type="text"
                                  name="icDph"
                                  value={formData.icDph || ""}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      icDph: e.target.value,
                                    }))
                                  }
                                  className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                                />
                              ) : (
                                <p className="text-white">{formData.icDph}</p>
                              )}
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-zinc-500 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-corklasYellow" />
                                Fakturačná adresa - Ulica
                              </p>
                              {isEditing ? (
                                <input
                                  type="text"
                                  name="billingStreet"
                                  value={formData.billingStreet || ""}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      billingStreet: e.target.value,
                                    }))
                                  }
                                  className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                                />
                              ) : (
                                <p className="text-white">
                                  {formData.billingStreet}
                                </p>
                              )}
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-zinc-500 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-corklasYellow" />
                                Fakturačná adresa - Mesto
                              </p>
                              {isEditing ? (
                                <input
                                  type="text"
                                  name="billingCity"
                                  value={formData.billingCity || ""}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      billingCity: e.target.value,
                                    }))
                                  }
                                  className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                                />
                              ) : (
                                <p className="text-white">
                                  {formData.billingCity}
                                </p>
                              )}
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-zinc-500 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-corklasYellow" />
                                Fakturačná adresa - PSČ
                              </p>
                              {isEditing ? (
                                <input
                                  type="text"
                                  name="billingPsc"
                                  value={formData.billingPsc || ""}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      billingPsc: e.target.value,
                                    }))
                                  }
                                  className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                                />
                              ) : (
                                <p className="text-white">
                                  {formData.billingPsc}
                                </p>
                              )}
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-zinc-500 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-corklasYellow" />
                                Fakturačná adresa - Krajina
                              </p>
                              {isEditing ? (
                                <input
                                  type="text"
                                  name="billingCountry "
                                  value={formData.billingCountry || ""}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      billingCountry: e.target.value,
                                    }))
                                  }
                                  className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                                />
                              ) : (
                                <p className="text-white">
                                  {formData.billingCountry}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* <div className="space-y-1">
                        <p className="text-sm text-zinc-500 flex items-center gap-2">
                          <UserIcon className="w-4 h-4 text-corklasYellow" />
                          Pohlavie
                        </p>
                        {isEditing ? (
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                gender: e.target.value,
                              }))
                            }
                            className="bg-zinc-800 text-white px-2 py-1 rounded w-full"
                          >
                            <option value="">Vyber pohlavie</option>
                            <option value="Muž">Muž</option>
                            <option value="Žena">Žena</option>
                            <option value="Iné">Iné</option>
                          </select>
                        ) : (
                          <p className="text-white capitalize">
                            {formData.gender}
                          </p>
                        )}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-900/70 backdrop-blur-md rounded-3xl border border-zinc-800/50 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-zinc-800/50">
                  <h3 className="text-xl font-display font-bold text-white">
                    Doplňujúce informácie
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Tieto informácie nám pomôžu lepšie prispôsobiť naše služby
                  </p>
                </div>

                <div className="p-6 md:p-8">
                  <form
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveChanges();
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="drivingExperience"
                          className="text-sm font-medium text-zinc-300"
                        >
                          Požadované prvky výbavy
                        </label>
                        <select
                          id="drivingExperience"
                          value={formData.drivingExperience}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              drivingExperience: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700/80 rounded-xl text-white"
                        >
                          <option value="">Vyberte možnosť</option>
                          <option value="1-3">1-3 roky</option>
                          <option value="4-10">4-10 rokov</option>
                          <option value="10+">Viac ako 10 rokov</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="preferredCarType"
                          className="text-sm font-medium text-zinc-300"
                        >
                          Preferovaný typ vozidla
                        </label>
                        <select
                          id="preferredCarType"
                          value={formData.preferredCarType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              preferredCarType: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700/80 rounded-xl text-white"
                        >
                          <option value="">Vyberte možnosť</option>
                          <option value="economy">Ekonomické</option>
                          <option value="family">Rodinné</option>
                          <option value="luxury">Luxusné</option>
                          <option value="sport">Športové</option>
                          <option value="suv">SUV</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="rentalPurpose"
                          className="text-sm font-medium text-zinc-300"
                        >
                          Účel prenájmu
                        </label>
                        <select
                          id="rentalPurpose"
                          value={formData.rentalPurpose}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              rentalPurpose: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700/80 rounded-xl text-white"
                        >
                          <option value="">Vyberte možnosť</option>
                          <option value="business">Pracovné cesty</option>
                          <option value="vacation">Dovolenka</option>
                          <option value="weekend">Víkendové výlety</option>
                          <option value="special">
                            Špeciálne príležitosti
                          </option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="howDidYouHear"
                          className="text-sm font-medium text-zinc-300"
                        >
                          Ako ste sa o nás dozvedeli?
                        </label>
                        <select
                          id="howDidYouHear"
                          value={formData.howDidYouHear}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              howDidYouHear: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700/80 rounded-xl text-white"
                        >
                          <option value="">Vyberte možnosť</option>
                          <option value="search">
                            Internetové vyhľadávanie
                          </option>
                          <option value="social">Sociálne siete</option>
                          <option value="friend">Odporúčanie od známeho</option>
                          <option value="ad">Reklama</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="additionalNotes"
                        className="text-sm font-medium text-zinc-300"
                      >
                        Ďalšie poznámky alebo požiadavky
                      </label>
                      <textarea
                        id="additionalNotes"
                        rows={4}
                        value={formData.additionalNotes}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            additionalNotes: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700/80 rounded-xl text-white"
                        placeholder="Napíšte akékoľvek ďalšie informácie, ktoré by sme mali vedieť..."
                      ></textarea>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Uložiť zmeny
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-zinc-900/70 backdrop-blur-md rounded-3xl border border-zinc-800/50 overflow-hidden">
                <div className="p-6 border-b border-zinc-800/50">
                  <h3 className="text-xl font-display font-bold text-white">
                    Stav dokumentov
                  </h3>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {user?.documents?.idFront && user?.documents?.idBack && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              Občiansky preukaz
                            </p>
                            <p className="text-xs text-zinc-500">
                              Nahraté{" "}
                              {new Date(user.updatedAt).toLocaleDateString(
                                "sk-SK"
                              )}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                          Overené
                        </span>
                      </div>
                    )}
                    {user?.documents?.licenseFront &&
                      user?.documents?.licenseBack && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            </div>
                            <div>
                              <p className="text-white font-medium">
                                Vodičský preukaz
                              </p>
                              <p className="text-xs text-zinc-500">
                                Nahraté{" "}
                                {new Date(user.updatedAt).toLocaleDateString(
                                  "sk-SK"
                                )}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                            Overené
                          </span>
                        </div>
                      )}

                    <Link
                      href="/dashboard/dokumenty"
                      className="flex items-center justify-center gap-2 text-corklasYellow hover:text-yellow-400 transition-colors text-sm mt-4"
                    >
                      <span>Spravovať dokumenty</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* <div className="bg-zinc-900/70 backdrop-blur-md rounded-3xl border border-zinc-800/50 overflow-hidden">
                <div className="p-6 border-b border-zinc-800/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-bold text-white">
                      Nadchádzajúce rezervácie
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    {upcomingReservations.map((res) => {
                      const pickupDate = new Date(res.pickupDate);
                      const dropoffDate = new Date(res.dropoffDate);
                      const today = new Date();
                      console.log("asd", res);
                      const startsInDays = Math.ceil(
                        (pickupDate - today) / (1000 * 60 * 60 * 24)
                      );
                      const vehicle = products.find(
                        (p) => p._id === res.vehicle
                      );

                      return (
                        <div
                          key={res._id}
                          className="bg-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800 transition-colors"
                        >
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 rounded-lg bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                              <Calendar className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">
                                {vehicle?.title || "Neznáme vozidlo"}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-zinc-400">
                                <Calendar className="w-3 h-3" />
                                <span>
                                  {pickupDate.toLocaleDateString("sk-SK")} -{" "}
                                  {dropoffDate.toLocaleDateString("sk-SK")}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1 text-zinc-400">
                              <Clock className="w-4 h-4" />
                              <span>
                                {startsInDays > 0
                                  ? `Začína o ${startsInDays} dni`
                                  : startsInDays === 0
                                  ? "Začína dnes"
                                  : "Ukončená"}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <Link
                      href="/dashboard/rezervacie"
                      className="flex items-center justify-center gap-2 text-corklasYellow hover:text-yellow-400 transition-colors text-sm"
                    >
                      <span>
                        Zobraziť všetky rezervácie ({user.reservations.length})
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/prihlasenie",
        permanent: false,
      },
    };
  }
  await mongooseConnect();

  const user = await User.findOne({ email: session.user.email }).lean();

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
