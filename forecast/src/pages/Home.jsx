import { useState } from "react";
import LocationModal from "../components/LocationModal";

const Home = () => {
  const [click, setClick] = useState(false);

  return (
    <>
      <div className="text-center">
        <h1 className="text-6xl text-blue-300">
          <strong>Fore</strong>
          <span className="text-blue-400">cast</span>
        </h1>
        <p className="max-w-md text-md text-gray-300 py-4">Check the today's forecast</p>

        <div>
          <button
            onClick={() => setClick(true)}
            type="button"
            className="text-lg font-medium bg-blue-500 px-5 py-1 hover:scale-105 transition delay-75 rounded text-amber-100"
          >
            Check Forecast
          </button>
        </div>
      </div>

      {click && <LocationModal onClose={() => setClick(false)} />}
    </>
  );
};

export default Home;
