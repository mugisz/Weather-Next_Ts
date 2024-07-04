// src/services/weatherService.ts

import axios from "axios";

const API_KEY = process.env.API_KEY;

export async function fetchWeatherData(place: string) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${API_KEY}&cnt=56`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message ?? "Failed to fetch weather data");
  }
}
export async function fetchWeatherDataByCity(city: string) {
  try {
    const response = await axios.get(
     `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${API_KEY}`
    );
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ?? "Failed to fetch weather data"
    );
  }
}

export async function fetchWeatherDataByCoordinates(
  latitude: any,
  longitude: any
) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ?? "Failed to fetch weather data"
    );
  }
}