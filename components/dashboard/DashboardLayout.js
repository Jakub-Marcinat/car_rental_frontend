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
  Bell,
} from "lucide-react";

export default function DashboardLayout({
  children,
  title = "Používateľský profil",
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <div className="lg:hidden bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/50 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <Link
            href="/"
            className="text-2xl font-display font-bold text-white tracking-tighter"
          >
            COR KLAS
          </Link>
          <div className="flex items-center gap-3">
            <button className="relative">
              <Bell className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full text-xs text-black flex items-center justify-center font-bold">
                2
              </span>
            </button>
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
          } lg:flex flex-col w-72 h-screen sticky top-0 bg-zinc-900/80 backdrop-blur-md border-r border-zinc-800/50`}
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
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="User avatar"
                width={48}
                height={48}
                className="object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
            </div>
            <div>
              <h3 className="font-medium text-white">Ján Novák</h3>
              <p className="text-sm text-zinc-400">jan.novak@email.sk</p>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <div className="space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 text-white bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors"
              >
                <User className="w-5 h-5 text-yellow-300" />
                <span>Profil</span>
              </Link>
              <Link
                href="/dashboard/dokumenty"
                className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-colors"
              >
                <FileText className="w-5 h-5 text-yellow-300" />
                <span>Dokumenty</span>
              </Link>
              <Link
                href="/dashboard/rezervacie"
                className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-colors"
              >
                <Calendar className="w-5 h-5 text-yellow-300" />
                <span>Rezervácie</span>
                <span className="ml-auto bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                  2
                </span>
              </Link>
              <Link
                href="/dashboard/vozidla"
                className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-colors"
              >
                <Car className="w-5 h-5 text-yellow-300" />
                <span>Obľúbené vozidlá</span>
              </Link>
              <Link
                href="/dashboard/nastavenia"
                className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-colors"
              >
                <Settings className="w-5 h-5 text-yellow-300" />
                <span>Nastavenia</span>
              </Link>
            </div>
          </nav>

          <div className="p-4 mt-auto">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5 text-zinc-400" />
              <span>Odhlásiť sa</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 min-h-screen">
          <header className="hidden lg:flex items-center justify-between p-6 border-b border-zinc-800/50 bg-zinc-900/80 backdrop-blur-md sticky top-0 z-10">
            <h1 className="text-2xl font-display font-bold text-white">
              {title}
            </h1>
            <div className="flex items-center gap-4">
              <button className="relative">
                <Bell className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full text-xs text-black flex items-center justify-center font-bold">
                  2
                </span>
              </button>
            </div>
          </header>

          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800/50 z-50">
        <div className="flex items-center justify-around p-3">
          <Link href="/dashboard" className="flex flex-col items-center p-2">
            <User className="w-5 h-5 text-yellow-300" />
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
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full text-xs text-black flex items-center justify-center font-bold">
              2
            </span>
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
