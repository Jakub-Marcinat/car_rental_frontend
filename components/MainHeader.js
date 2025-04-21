import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function mainHeader({ cartProducts }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <header className="flex justify-between items-center px-10 py-5 w-full z-10">
        <h1 className="text-3xl font-bold tracking-widest whitespace-nowrap">
          COR KLAS
        </h1>

        <div
          className="custom-hidden cursor-pointer text-2xl"
          onClick={() => setIsOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </div>

        <div
          className={`fixed inset-0 bg-black text-white flex flex-col items-center justify-center space-y-8 transform ${
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          } transition-transform duration-500 ease-in-out custom-hidden`}
        >
          <button
            className="absolute top-5 right-5 text-3xl"
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>

          <nav className="flex flex-col space-y-6 text-xl">
            <a
              href="/home"
              className="hover:text-corklasYellow"
              onClick={() => setIsOpen(false)}
            >
              Domov
            </a>
            <a
              href="/ponuka-vozidiel"
              className="hover:text-corklasYellow"
              onClick={() => setIsOpen(false)}
            >
              Ponuka vozidiel
            </a>
            <a
              href="/registracia"
              className="hover:text-corklasYellow"
              onClick={() => setIsOpen(false)}
            >
              Prihlásiť sa
            </a>
            <a
              href="/FAQ"
              className="hover:text-corklasYellow"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </a>
            <a
              href="#kontakt"
              className="hover:text-corklasYellow"
              onClick={() => setIsOpen(false)}
            >
              Kontakt
            </a>
            <a
              href="/o-nas"
              className="hover:text-corklasYellow"
              onClick={() => setIsOpen(false)}
            >
              O nás
            </a>
          </nav>

          <button className="flex gap-4 mt-6 px-6 py-3 border-none rounded-full bg-corklasYellow text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Prihlásiť sa
          </button>
        </div>

        <nav className="flex justify-center w-full custom-visible space-x-6 ">
          <a href="/home" className="hover:text-corklasYellow">
            Domov
          </a>
          <a href="/ponuka-vozidiel" className="hover:text-corklasYellow">
            Ponuka vozidiel
          </a>
          {session?.user ? (
            <>
              <a href="/dashboard" className="hover:text-corklasYellow">
                Môj účet
              </a>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hover:text-corklasYellow"
              >
                Odhlásiť sa
              </button>
            </>
          ) : (
            <a href="/prihlasenie" className="hover:text-corklasYellow">
              Prihlásiť sa
            </a>
          )}
          <a href="/FAQ" className="hover:text-corklasYellow">
            FAQ
          </a>
          <a href="#kontakt" className="hover:text-corklasYellow">
            Kontakt
          </a>
          <a href="/o-nas" className="hover:text-corklasYellow">
            O nás
          </a>
        </nav>
      </header>

      <style jsx>{`
        @media (max-width: 885px) {
          .custom-hidden {
            display: flex;
          }
          .custom-visible {
            display: none;
          }
        }

        @media (min-width: 885px) {
          .custom-hidden {
            display: none;
          }
          .custom-visible {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
