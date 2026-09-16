export const getForecast = async (location) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m`,
  );

  const data = await response.json();

  if (!data?.current) throw new Error("Forecast details get failed");

  return {
    location: location.name,
    temperature: Math.round(data?.current?.temperature_2m),
    humidity: data?.current?.relative_humidity_2m,
    wind: data?.current?.wind_speed_10m,
  };
};
