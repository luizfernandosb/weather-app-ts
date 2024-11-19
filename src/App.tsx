import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchWeather } from "./api/weather";

export default function WeatherSearch() {
  const [location, setLocation] = useState<string>("");

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["weather", location],
    queryFn: () => fetchWeather(location),
    enabled: false,
  });

  const handleSearch = () => {
    if (location.trim()) {
      refetch();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-blue-400 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-800 mb-4 text-center">
          Consulta Clima
        </h1>
        <div className="flex items-center mb-4">
          <input
            className="flex-grow p-2 border border-gray-500 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
            type="text"
            placeholder="Digite o local"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
        {isLoading && (
          <p className="bg-gray-100 p-4 rounded-lg mt-4 shadow-sm">
            Carregando...🗺️
          </p>
        )}
        {error && (
          <p className="text-lg font-semibold text-red-800">
            ⚠️ Erro ao buscar dados.
          </p>
        )}
        {data && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Clima em {data.name}, {data.sys.country}
            </h2>
            <p className="text-gray-600">
              Temperatura: <span className="font-bold">{data.main.temp}°C</span>
            </p>
            <p className="text-gray-600">
              Sensação térmica:{" "}
              <span className="font-bold">{data.main.feels_like}°C</span>°C
            </p>
            <p className="text-gray-600 capitalize">
              Condição:{" "}
              <span className="font-bold">{data.weather[0].description}</span>
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
              alt={data.weather[0].description}
              className="w-12 h-12 mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}
