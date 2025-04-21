import {
  ArrowRight,
  CheckCircle,
  Info,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Header from "@/components/Header";

export default function SignUpPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAgreed: false,
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return setError("Heslá sa nezhodujú");
    }

    setLoading(true);
    setError("");
    const { confirmPassword, termsAgreed, ...cleanedForm } = form;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedForm),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Chyba pri registrácii");

      await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <Image
          src="/cars/noir-mKOimPTdMyw-unsplash.jpg"
          alt="Športové auto"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70"></div>
      </div>

      <div className="container mx-auto max-w-6xl z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-2 text-white">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
              Vytvorte si <span className="text-corklasYellow">účet</span> a
              získajte výhody
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Registrovaní používatelia majú prístup k exkluzívnym ponukám a
              zjednodušenému procesu rezervácie.
            </p>
            <div className="hidden lg:block space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-corklasYellow/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-corklasYellow" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg text-white">
                    Rýchlejšie rezervácie
                  </h3>
                  <p className="text-zinc-400">
                    Bez opakovaného vypĺňania údajov
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-corklasYellow/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-corklasYellow" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg text-white">
                    História prenájmov
                  </h3>
                  <p className="text-zinc-400">
                    Prehľad o vašich prenájmoch a faktúrach
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-corklasYellow/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-corklasYellow" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg text-white">
                    Exkluzívne ponuky
                  </h3>
                  <p className="text-zinc-400">
                    Zľavy a akcie pre registrovaných používateľov
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="backdrop-blur-md bg-zinc-900/70 rounded-3xl p-8 md:p-10 border border-zinc-700/50 shadow-xl">
              <div className="text-center mb-8">
                <Link href="/" className="inline-block mb-6">
                  <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
                    COR KLAS
                  </h1>
                </Link>
                <h2 className="text-3xl font-display font-bold text-white mb-3">
                  Registrácia
                </h2>
                <p className="text-zinc-400">Vytvorte si nový účet</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium text-zinc-300 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-corklasYellow" />
                      Meno
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-yellow-300 transition-all text-white"
                      placeholder="Ján"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-zinc-300 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-corklasYellow" />
                      Priezvisko
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-corklasYellow/50 focus:border-corklasYellow transition-all text-white"
                      placeholder="Novák"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-zinc-300 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-corklasYellow" />
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-corklasYellow/50 focus:border-corklasYellow transition-all text-white"
                    placeholder="vas@email.sk"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-zinc-300 flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-corklasYellow" />
                    Telefón
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-corklasYellow/50 focus:border-corklasYellow transition-all text-white"
                    placeholder="+421 9XX XXX XXX"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-zinc-300 flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-corklasYellow" />
                    Heslo
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-corklasYellow/50 focus:border-corklasYellow transition-all text-white"
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-zinc-500 flex items-start gap-1 mt-1">
                    <Info className="w-3 h-3 text-zinc-500 mt-0.5 flex-shrink-0" />
                    Heslo musí obsahovať minimálne 8 znakov, vrátane čísla a
                    špeciálneho znaku
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-zinc-300 flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-corklasYellow" />
                    Potvrďte heslo
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-corklasYellow/50 focus:border-corklasYellow transition-all text-white"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    value={form.termsAgreed}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-zinc-600 text-yellow-400 focus:ring-corklasYellow/50 bg-zinc-800 mt-1"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-zinc-300">
                    Súhlasím s{" "}
                    <Link
                      href="/podmienky"
                      className="text-corklasYellow hover:text-yellow-400 transition-colors"
                    >
                      podmienkami používania
                    </Link>{" "}
                    a{" "}
                    <Link
                      href="/ochrana-osobnych-udajov"
                      className="text-corklasYellow hover:text-yellow-400 transition-colors"
                    >
                      zásadami ochrany osobných údajov
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 group"
                >
                  Vytvoriť účet
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="relative flex items-center justify-center my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-700/50"></div>
                  </div>
                  <div className="relative px-4 bg-zinc-900/70 text-sm text-zinc-400">
                    alebo pokračujte s
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      signIn("google", { callbackUrl: "/dashboard" })
                    }
                    className="flex items-center justify-center gap-2 bg-zinc-800/80 hover:bg-zinc-700/80 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      signIn("facebook", { callbackUrl: "/dashboard" })
                    }
                    className="flex items-center justify-center gap-2 bg-zinc-800/80 hover:bg-zinc-700/80 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    Facebook
                  </button>
                </div>

                <p className="text-center text-zinc-400 text-sm mt-6">
                  Už máte účet?{" "}
                  <Link
                    href="/prihlasit-sa"
                    className="text-corklasYellow hover:text-yellow-400 transition-colors font-medium"
                  >
                    Prihláste sa
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-0"></div>
      <div className="absolute top-20 right-20 w-80 h-80 bg-corklasYellow/10 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-corklasYellow/5 rounded-full filter blur-3xl z-0"></div>
    </div>
  );
}
