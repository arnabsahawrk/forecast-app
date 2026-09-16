import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getForecast } from "../services/get-forecast";

export default function Forecast() {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const location = useLocation();
  const forecastLocation = location.state?.location;

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const result = await getForecast(forecastLocation);
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchForecast();
  }, [forecastLocation]);

  console.log(data, error);

  return <>This Forecast Page</>;
}
