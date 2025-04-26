"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  FileText,
  Calendar,
  Settings,
  LogOut,
  Menu,
  Car,
  Phone,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
  title = "Používateľský profil",
  user,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <div className="min-h-screen bg-black ">
      <div className="lg:hidden bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/50 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <Link
            href="/"
            className="text-2xl font-display font-bold text-white tracking-tighter"
          >
            COR KLAS
          </Link>
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-zinc-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <aside
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } lg:flex flex-col w-72 h-screen sticky top-0 bg-zinc-900/80 backdrop-blur-md border-r border-zinc-800/50 z-[60]`}
        >
          <div className="p-6 border-b border-zinc-800/50">
            <Link
              href="/"
              className="text-2xl font-display font-bold text-white tracking-tighter"
            >
              COR KLAS
            </Link>
          </div>

          <div className="p-6 border-b border-zinc-800/50 flex items-center gap-4">
            <div className="relative rounded-full overflow-hidden bg-zinc-800">
              <Image
                src={user?.image || "/placeholder.png?height=100&width=100"}
                alt="User avatar"
                width={48}
                height={48}
                className="object-"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
            </div>
            <div>
              <h3 className="font-medium text-white">
                {console.log(user)}
                {user?.name || "Neznámy používateľ"}
              </h3>
              <p className="text-sm text-zinc-400">
                {user?.email || "Bez emailu"}
              </p>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <div className="space-y-1">
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive("/dashboard")
                    ? "text-white bg-zinc-800/50"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                <User className="w-5 h-5 text-corklasYellow" />
                <span>Profil</span>
              </Link>
              <Link
                href="/dashboard/dokumenty"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive("/dashboard/dokumenty")
                    ? "text-white bg-zinc-800/50"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                <FileText className="w-5 h-5 text-corklasYellow" />
                <span>Dokumenty</span>
              </Link>
              <Link
                href="/dashboard/rezervacie"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive("/dashboard/rezervacie")
                    ? "text-white bg-zinc-800/50"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                <Calendar className="w-5 h-5 text-corklasYellow" />
                <span>Rezervácie</span>
                {user?.reservations?.length > 0 && (
                  <span className="ml-auto bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                    {user.reservations.length}
                  </span>
                )}
              </Link>

              <Link
                href="/ponuka-vozidiel"
                className={`${
                  mobileMenuOpen ? "flex" : "hidden"
                }  items-center gap-3 px-4 py-3 rounded-xl transition-colors text-zinc-400`}
              >
                <Car className="w-5 h-5 text-corklasYellow" />
                <span>Ponuka vozidiel</span>
              </Link>
              {/* <Link
                href="/ponuka-vozidiel"
                className={`${
                  mobileMenuOpen ? "flex" : "hidden"
                }  items-center gap-3 px-4 py-3 rounded-xl transition-colors text-zinc-400`}
              >
                <Car className="w-5 h-5 text-corklasYellow" />
                <span>FAQ</span>
              </Link> */}
              <Link
                href="/#kontakt"
                className={`${
                  mobileMenuOpen ? "flex" : "hidden"
                }  items-center gap-3 px-4 py-3 rounded-xl transition-colors text-zinc-400`}
              >
                <Phone className="w-5 h-5 text-corklasYellow" />
                <span>Kontakt</span>
              </Link>
              <Link
                href="/o-nas"
                className={`${
                  mobileMenuOpen ? "flex" : "hidden"
                }  items-center gap-3 px-4 py-3 rounded-xl transition-colors text-zinc-400`}
              >
                <User className="w-5 h-5 text-corklasYellow" />
                <span>O nás</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5 text-zinc-400" />
                <span>Odhlásiť sa</span>
              </button>
            </div>
          </nav>

          {/* <div className="p-4 mt-auto">
          </div> */}
        </aside>

        <main className="flex-1 min-h-screen">
          <header className="hidden lg:flex items-center justify-between p-6 border-b border-zinc-800/50 bg-zinc-900/80 backdrop-blur-md sticky top-0 z-10">
            <h1 className="text-2xl font-display font-bold text-white">
              {title}
            </h1>
          </header>

          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800/50 z-50">
        <div className="flex items-center justify-around p-3">
          <Link href="/dashboard" className="flex flex-col items-center p-2">
            <User className="w-5 h-5 text-corklasYellow" />
            <span className="text-xs text-zinc-400 mt-1">Profil</span>
          </Link>
          <Link
            href="/dashboard/dokumenty"
            className="flex flex-col items-center p-2"
          >
            <FileText className="w-5 h-5 text-zinc-400" />
            <span className="text-xs text-zinc-400 mt-1">Dokumenty</span>
          </Link>
          <Link
            href="/dashboard/rezervacie"
            className="flex flex-col items-center p-2 relative"
          >
            <Calendar className="w-5 h-5 text-zinc-400" />
            <span className="text-xs text-zinc-400 mt-1">Rezervácie</span>
            {user?.reservations?.length > 0 && (
              <span className="ml-auto bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                {user.reservations.length}
              </span>
            )}
          </Link>
          <Link
            href="/dashboard/nastavenia"
            className="flex flex-col items-center p-2"
          >
            <Settings className="w-5 h-5 text-zinc-400" />
            <span className="text-xs text-zinc-400 mt-1">Nastavenia</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
