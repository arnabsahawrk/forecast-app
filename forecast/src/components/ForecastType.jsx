export default function ForecastType({ forecastLocation, forecast }) {
  return (
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
  );
}
