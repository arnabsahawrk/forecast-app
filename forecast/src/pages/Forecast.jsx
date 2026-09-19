import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ForecastCard from "../components/ForecastCard";
import ForecastType from "../components/ForecastType";
import RecommendationCard from "../components/RecommendationCard";
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
  console.log(error);
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <div className="shadow-2xl rounded-2xl p-5">
            {/* Forecast Card  */}
            <ForecastCard forecastLocation={forecastLocation} forecast={forecast} />
          </div>

          {/* Forecast Recommendation  */}
          <RecommendationCard forecast={forecast} />
        </div>

        {/* Forecast Type  */}
        <ForecastType forecastLocation={forecastLocation} forecast={forecast} />
      </div>
    </div>
  );
}
