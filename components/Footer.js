export default function Footer() {
  return (
    <footer className="bg-corklasCard flex lg:flex-col px-6 sm:px-10 lg:px-16 py-12 lg:pb-0 sm:py-16 overflow-auto">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-20 max-sm:px-12">
          <div>
            <img
              src="/CorklasLogoWhiteTrans1.png"
              alt="Corklas Logo"
              className="max-w-full h-auto"
            />
          </div>
          <p className="text-white font-medium text-sm sm:text-md">
            V CORKLAS ponúkame široký výber kvalitných vozidiel, ktoré vyhovujú
            vašim potrebám a rozpočtu. S rokmi skúseností v automobilovom
            priemysle.
            <br />
            <br />
            <a
              href="/vop.pdf"
              className="cursor-pointer hover:text-corklasYellow underline"
              download="VseobecneObchodnePodmienky.pdf"
            >
              VOP
            </a>
            <br />
            <a
              href="/vop.pdf"
              className="cursor-pointer hover:text-corklasYellow underline"
              download="DokumentNaStiahnutie.pdf"
            >
              PDF na stiahnutie
            </a>
          </p>
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              Kontaktujte Nás
            </h3>
            <div className="flex items-center gap-4 mb-3">
              <svg
                className="w-6 h-6 text-corklasRed"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
              </svg>
              <p className="text-white text-sm sm:text-md">
                Slávnica 8, 01854 Slávnica
              </p>
            </div>
            <div className="flex flex-col mb-3 gap-4">
              <div className="flex gap-4 items-center">
                <svg
                  className="w-6 h-6 text-corklasRed"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.22 11.72 11.72 0 003.78.6 1 1 0 011 1v3.77a1 1 0 01-1 1A19.92 19.92 0 012 4.92a1 1 0 011-1h3.77a1 1 0 011 1 11.72 11.72 0 00.6 3.78 1 1 0 01-.22 1.11z" />
                </svg>
                <p className="text-white text-sm sm:text-md">
                  (+421) 940 884 615
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <svg
                  className="w-6 h-6 text-corklasRed"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.22 11.72 11.72 0 003.78.6 1 1 0 011 1v3.77a1 1 0 01-1 1A19.92 19.92 0 012 4.92a1 1 0 011-1h3.77a1 1 0 011 1 11.72 11.72 0 00.6 3.78 1 1 0 01-.22 1.11z" />
                </svg>
                <p className="text-white text-sm sm:text-md">
                  (+421) 910 333 400
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <svg
                className="w-12 h-6 text-corklasRed"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16v16H4V4zm16-2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6.5 11.5l5.5 3.5 5.5-3.5V7l-5.5 3.5L6.5 7v4.5z" />
              </svg>
              <p className="text-white text-sm sm:text-md">
                infopozicovnaaut@gmail.com
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              Prihlásiť sa na odber
            </h3>
            <p className="text-white mb-4 text-sm sm:text-md">
              Zostaňte v kontakte s nami a získajte ponuky!
            </p>
            <div className="flex flex-col sm:flex-row max-sm:gap-2 ">
              <input
                className="pl-4 py-3 md:rounded-tl-md md:rounded-bl-md max-sm:rounded flex flex-1"
                placeholder="Zadajte email"
                type="text"
                name="email_id"
                required=""
                autoComplete="off"
              />
              <button
                className="py-3 px-6 bg-corklasYellow sm:rounded-tr-lg sm:rounded-br-lg max-sm:rounded whitespace-nowrap"
                type="submit"
              >
                Prihlásiť sa
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-white py-8 mt-8 lg:mt-20 border-t border-corklasCardLight">
          <p className="text-sm sm:text-md">
            Copyright ©2024. Všetky práva vyhradené.
          </p>
        </div>
      </div>
    </footer>
  );
}
