import { MapPinned, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getGeoLocation } from "../services/get-geolocation";

const LocationModal = ({ onClose }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const goToPage = (location) => {
    navigate("/forecast", { state: { location } });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const city = e.target.cityName.value.trim();

    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      const location = await getGeoLocation(city);

      goToPage(location);
    } catch (error) {
      setError(error.message);
    }

    e.target.cityName.value = "";
  };

  const handleGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (positions) => {
        const { latitude, longitude } = positions.coords;
        goToPage({ name: "Your Location", latitude: latitude, longitude: longitude });
      },
      (error) => {
        setError(error.message);
      },
      {
        timeout: 60000,
      },
    );
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-950/60">
      <div className="h-75 w-100 bg-gray-100 shadow-2xl rounded-2xl p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Where are you today?</h2>
          <button
            className="w-10 h-10 rounded p-2 bg-gray-400 hover:bg-gray-300 transition-all delay-75 cursor-pointer"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        <div className="my-4">
          <form onSubmit={handleSubmit}>
            <div className="text-center space-y-3">
              <input
                name="cityName"
                type="text"
                placeholder="Enter city name"
                className="w-full border py-2 px-4 rounded"
              />
              <button
                type="submit"
                className="text-lg font-medium bg-blue-500 px-5 py-1 hover:scale-105 transition delay-75 rounded text-amber-100 w-full"
              >
                Get Forecast
              </button>
            </div>
          </form>
          <div className="text-center mt-3 space-y-3">
            <p className="font-medium text-xl">Or</p>
            <button
              type="submit"
              onClick={handleGeoLocation}
              className="text-lg font-medium bg-blue-400 px-5 py-1 hover:scale-105 hover:bg-blue-500 transition delay-75 rounded text-gray-200 w-full flex justify-center items-center gap-2"
            >
              <MapPinned /> Use My Location
            </button>
          </div>
        </div>
        {error && <p className="italic text-red-500 text-base text-center">{error}</p>}
      </div>
    </div>
  );
};

export default LocationModal;
