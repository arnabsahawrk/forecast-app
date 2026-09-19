import { getRecommendations } from "../utils/getRecommendations";

export default function RecommendationCard({ forecast }) {
  return (
    <div className="shadow-2xl rounded-2xl p-5">
      <h2 className="text-blue-950 font-bold text-2xl">Smart Recommendations</h2>

      <div>{getRecommendations(forecast)?.text}</div>
    </div>
  );
}
