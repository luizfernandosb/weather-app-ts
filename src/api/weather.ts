import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

export const fetchWeather = async (search: string) => {
  const response = await axios.get(BASE_URL, {
    params: {
      q: search,
      appid: API_KEY,
      units: "metric",
      lang: "pt_br",
    },
  });
  return response.data;
};
