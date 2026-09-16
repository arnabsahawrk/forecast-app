import { useLocation } from "react-router";

export default function Forecast() {
  const location = useLocation();

  console.log(location);
  return <>This Forecast Page</>;
}
