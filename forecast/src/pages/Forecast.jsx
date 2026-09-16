import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getForecast } from "../services/get-forecast";

export default function Forecast() {
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();
  const forecastLocation = location.state?.location;

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const result = await getForecast(forecastLocation);
        setForecast(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchForecast();
  }, [forecastLocation]);

  function getRecommendations(forecast) {
    if (!forecast) return null;

    // 1. Weather you need to prepare for.
    if (forecast.condition === "snow") {
      return {
        type: "snow",
        label: "Snow Alert",
        text: "It's snowing. Wear warm clothes and take it slow outside.",
      };
    }
    if (["drizzle", "rain", "freezing_rain"].includes(forecast.condition)) {
      return {
        type: "rain",
        label: "Rain Alert",
        text: "It's raining. Don't forget to take an umbrella with you.",
      };
    }
    if (forecast.condition === "fog") {
      return {
        type: "fog",
        label: "Fog Alert",
        text: "It's foggy. Drive carefully and keep some distance from other vehicles.",
      };
    }

    // 2. Temperatures worth warning about (in °C).
    if (forecast.temperature >= 32) {
      return {
        type: "hot",
        label: "Hot Day",
        text: "It's quite hot today. Take a water bottle with you.",
      };
    }
    if (forecast.temperature <= 15) {
      return {
        type: "cold",
        label: "Cold Day",
        text: "It's cold today. Wear warm clothes before heading out.",
      };
    }
    if (forecast.temperature >= 28) {
      return {
        type: "warm",
        label: "Warm Day",
        text: "It's warm today. Take some water with you.",
      };
    }

    // 3. Comfortable temperature, so just describe the sky.
    if (forecast.condition === "clear") {
      return {
        type: "sunny",
        label: "Sunny Day",
        text: "Sunny skies ahead. Take water and consider carrying sunglasses.",
      };
    }
    if (forecast.condition === "partly_cloudy" || forecast.condition === "cloudy") {
      return {
        type: "cloudy",
        label: "Cloudy Day",
        text: "Mostly cloudy today. A light jacket might come in handy.",
      };
    }

    // 4. Nothing special to report.
    return {
      type: "pleasant",
      label: "Perfect Day",
      text: "The weather looks comfortable today. Enjoy your day!",
    };
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <div className="shadow-2xl rounded-2xl p-5">
            <div className="space-y-3">
              <h1 className="text-2xl text-blue-500 font-semibold">Today's Forecast Details</h1>
              <div className="flex items-center gap-3">
                <MapPin size={30} className="text-purple-950" />
                <h2 className="text-4xl text-purple-500 font-semibold">{forecastLocation?.name}</h2>
              </div>
              <div className="flex items-center gap-16">
                <h3 className="text-6xl text-purple-900 font-extrabold">
                  {forecast?.temperature} C
                </h3>
                <p className="text-4xl text-purple-800 font-extrabold">{forecast?.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="shadow-2xl p-4 rounded-2xl text-center">
                  <h3 className="text-lg text-purple-900 font-bold">Feels Like</h3>
                  <p className="text-4xl text-purple-800 font-extrabold">{forecast?.feelsLike}</p>
                </div>
                <div className="shadow-2xl p-4 rounded-2xl text-center">
                  <h3 className="text-lg text-purple-900 font-bold">Humidity</h3>
                  <p className="text-4xl text-purple-800 font-extrabold">{forecast?.humidity}</p>
                </div>
                <div className="shadow-2xl p-4 rounded-2xl text-center">
                  <h3 className="text-lg text-purple-900 font-bold">Wind Speed</h3>
                  <p className="text-4xl text-purple-800 font-extrabold">{forecast?.windSpeed}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="shadow-2xl rounded-2xl p-5">
            <h2 className="text-blue-950 font-bold text-2xl">Smart Recommendations</h2>

            <div>{getRecommendations(forecast)?.text}</div>
          </div>
        </div>
        <div className="shadow-2xl rounded-2xl p-5 flex flex-col justify-between items-center">
          <div>
            <h2 className="text-blue-950 font-bold text-2xl">Live In {forecastLocation?.name}</h2>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-4xl text-blue-900 font-extrabold">{forecast?.description}</p>
          </div>
          <div className="flex items-center justify-center">
            <span className="rounded-full border-2 font-medium text-lg border-purple-400 py-1 px-2">
              Feels Like: {forecast?.feelsLike}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
