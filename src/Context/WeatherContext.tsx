"use client"; // Додаємо цю директиву на початку файлу
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { WeatherData } from "@/interface/weather.interface";
import { fetchWeatherData } from "@/service/weather.service";

interface WeatherContextType {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  place: string;
  setPlace: (place: string) => void;
  refetch: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [place, setPlace] = useState<string>("Kyiv");

  const refetch = async () => {
    setIsLoading(true);
    try {
      const weatherData = await fetchWeatherData(place);
      setData(weatherData);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Failed to fetch weather data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [place]);

  return (
    <WeatherContext.Provider
      value={{ data, isLoading, error, place, setPlace, refetch }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
