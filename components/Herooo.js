export default function Hero() {
  return (
    <main className="bg-hero-pattern bg-cover bg-center bg-no-repeat w-full h-screen text-white flex flex-col">
      {/* Navigation Section */}
      <header className="flex justify-between items-center px-10 py-5">
        <div className="text-2xl font-bold tracking-widest">COR KLAS</div>
        <nav className="flex space-x-6">
          <a href="#home" className="hover:text-yellow-500">
            Home
          </a>
          <a href="#about" className="hover:text-yellow-500">
            About Us
          </a>
          <a href="#services" className="hover:text-yellow-500">
            Our Services
          </a>
          <a href="#fleets" className="hover:text-yellow-500">
            Our Fleets
          </a>
          <a href="#cooperation" className="hover:text-yellow-500">
            Cooperation
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 border rounded hover:bg-gray-800">
            ENG
          </button>
          <div className="cursor-pointer">☰</div>
        </div>
      </header>

      {/* Hero Content */}
      <div className="flex-grow flex flex-col justify-between items-center p-6">
        <div className="flex justify-between text-center w-full">
          <h1 className="text-6xl font-bold max-w-lg">
            Limousine <span className="text-corklasRed">VIP Transfers</span>
          </h1>
          <div className="max-w-xl">
            <p className="text-xl mt-4">
              Welcome to our limousine rental website! We offer luxury
              transportation services for any occasion, from weddings and proms
              to corporate events and airport transfers.
            </p>
            <button className="mt-6 px-6 py-3 bg-corklasRed rounded-lg text-black font-semibold hover:bg-yellow-600">
              Open Fleet
            </button>
          </div>
        </div>

        {/* Booking Section */}
        <div className="bg-gray-900 bg-opacity-80 p-6 mt-10 rounded-xl w-11/12 max-w-4xl">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2">
                Pick Up Address
              </label>
              <input
                type="text"
                placeholder="From: address, airport, hotel..."
                className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring focus:ring-yellow-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2">
                Drop Off Address
              </label>
              <input
                type="text"
                placeholder="Distance, Hourly, Flat Rate"
                className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring focus:ring-yellow-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2">Pick Up Date</label>
              <input
                type="date"
                className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring focus:ring-yellow-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2">Pick Up Time</label>
              <input
                type="time"
                className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring focus:ring-yellow-500"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="px-6 py-3 bg-corklasRed rounded-lg text-black font-semibold hover:bg-yellow-600">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
