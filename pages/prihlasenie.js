import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else if (result?.ok) {
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <Image
          src="/cars/noir-mKOimPTdMyw.jpg"
          alt="Luxusné auto"
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
              Prístup k vašim{" "}
              <span className="text-corklasYellow">rezerváciám</span> a
              obľúbeným vozidlám
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Prihláste sa do svojho účtu pre správu rezervácií, históriu
              prenájmov a ďalšie výhody.
            </p>
            <div className="hidden lg:block">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-corklasYellow/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-corklasYellow"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg text-white">
                    Rýchly prístup k rezerváciám
                  </h3>
                  <p className="text-zinc-400">
                    Všetky vaše rezervácie na jednom mieste
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-corklasYellow/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-corklasYellow"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg text-white">
                    Bezpečný prístup
                  </h3>
                  <p className="text-zinc-400">Vaše údaje sú u nás v bezpečí</p>
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
                  Prihlásenie
                </h2>
                <p className="text-zinc-400">
                  Zadajte svoje prihlasovacie údaje
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-zinc-300 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-corklasYellow" />
                    E-mail
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-corklasYellow/50 focus:border-corklasYellow transition-all text-white"
                      placeholder="vas@email.sk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-zinc-300 flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-corklasYellow" />
                      Heslo
                    </label>
                    <Link
                      href="/zabudnute-heslo"
                      className="text-sm text-corklasYellow hover:text-yellow-400 transition-colors"
                    >
                      Zabudnuté heslo?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-corklasYellow/50 focus:border-corklasYellow transition-all text-white"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded border-zinc-600 text-yellow-400 focus:ring-corklasYellow/50 bg-zinc-800"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-zinc-300"
                  >
                    Zapamätať prihlásenie
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 group"
                  disabled={loading}
                >
                  {loading ? "Prihlasovanie..." : "Prihlásiť sa"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {error && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong className="font-bold">Chyba!</strong>
                    <span className="block sm:inline"> {error}</span>
                  </div>
                )}

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
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
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
                  Nemáte účet?{" "}
                  <Link
                    href="/registracia"
                    className="text-corklasYellow hover:text-yellow-400 transition-colors font-medium"
                  >
                    Zaregistrujte sa
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-0"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-corklasYellow/10 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-20 left-20 w-56 h-56 bg-corklasYellow/5 rounded-full filter blur-3xl z-0"></div>
    </div>
  );
}
