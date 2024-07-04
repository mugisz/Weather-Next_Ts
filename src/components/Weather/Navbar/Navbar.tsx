"use client";

import React, { useState } from "react";
import { MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import SearchBox from "../../../ui/Weather/SearchBox/SearchBox";
import axios from "axios";
import { useAtom } from "jotai";
import { Box } from "@mui/material";
import { placeAtom, loadingCityAtom } from "@/app/atom";
import { useWeather } from "@/Context/WeatherContext";
import {
  fetchWeatherDataByCity,
  fetchWeatherDataByCoordinates,
} from "@/service/weather.service";

type Props = {
  location?: string;
};

const API_KEY = process.env.API_KEY;

export default function Navbar({ location }: Props) {
  const { setPlace } = useWeather();
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [, setLoadingCity] = useAtom(loadingCityAtom);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await fetchWeatherDataByCity(value);

        const suggestions = response.data.list.map((item: any) => item.name);

        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
        setError("Location not found");
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
  }

  async function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingCity(true);
    try {
      await setPlace(city);
      setLoadingCity(false);
      setError("");
    } catch (error) {
      setLoadingCity(false);
      setError("Failed to set location");
    }
  }

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoadingCity(true);
          const response = await fetchWeatherDataByCoordinates(
            latitude,
            longitude
          );
          await setPlace(response.data.name);
          setLoadingCity(false);
          setError("");
        } catch (error) {
          setLoadingCity(false);
          setError("Failed to fetch current location weather");
        }
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }

  return (
    <>
      <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
          <p className="flex items-center justify-center gap-2">
            <h2 className="text-gray-500 text-3xl">Weather</h2>
            <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
          </p>
          <section className="flex gap-2 items-center">
            <MdMyLocation
              title="Your Current Location"
              onClick={handleCurrentLocation}
              className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"
            />
            <MdOutlineLocationOn className="text-3xl" />
            <p className="text-slate-900/80 text-sm"> {location} </p>
            <Box position="relative" display="none" className="md:flex ml-6">
              <SearchBox
                value={city}
                onSubmit={handleSubmitSearch}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <SuggestionBox
                showSuggestions={showSuggestions}
                suggestions={suggestions}
                handleSuggestionClick={handleSuggestionClick}
                error={error}
              />
            </Box>
          </section>
        </div>
      </nav>
      <Box display="flex" maxWidth={1280} className="md:hidden">
        <Box position="relative" margin="0 auto">
          <SearchBox
            value={city}
            onSubmit={handleSubmitSearch}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <SuggestionBox
            showSuggestions={showSuggestions}
            suggestions={suggestions}
            handleSuggestionClick={handleSuggestionClick}
            error={error}
          />
        </Box>
      </Box>
    </>
  );
}

function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1">{error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
