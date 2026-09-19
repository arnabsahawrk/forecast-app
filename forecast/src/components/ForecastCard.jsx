import { MapPin } from "lucide-react";

export default function ForecastCard({ forecastLocation, forecast }) {
  const stat = [
    {
      icon: "",
      label: "Feels Like",
      value: `${forecast?.feelsLike}`,
    },
    {
      icon: "",
      label: "Humidity",
      value: `${forecast?.humidity}`,
    },
    {
      icon: "",
      label: "Feels Like",
      value: `${forecast?.humidity}`,
    },
  ];
  return (
    <div className="space-y-3">
      <h1 className="text-2xl text-blue-500 font-semibold">Today's Forecast Details</h1>
      <div className="flex items-center gap-3">
        <MapPin size={30} className="text-purple-950" />
        <h2 className="text-4xl text-purple-500 font-semibold">{forecastLocation?.name}</h2>
      </div>
      <div className="flex items-center gap-16">
        <h3 className="text-6xl text-purple-900 font-extrabold">{forecast?.temperature} C</h3>
        <p className="text-4xl text-purple-800 font-extrabold">{forecast?.description}</p>
      </div>
      <div className="flex items-center justify-between">
        {stat.map((data) => (
          <div className="shadow-2xl p-4 rounded-2xl text-center">
            <h3 className="text-lg text-purple-900 font-bold">{data?.label}</h3>
            <p className="text-4xl text-purple-800 font-extrabold">{data?.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
