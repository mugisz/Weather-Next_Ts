/** @format */

import React from "react";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";
import { Box, Typography } from "@mui/material";
import SingleWeatherDetail from "../SingleWeatherDetail/SingleWeatherDetail";

export interface WeatherDetailProps {
  visability: string | number;
  humidity: string;
  windSpeed: string | number;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDetails(props: WeatherDetailProps) {
  const { visability, humidity, windSpeed, airPressure, sunrise, sunset } =
    props;

  return (
    <>
      <SingleWeatherDetail
        icon={<LuEye />}
        information="Visability"
        value={visability}
      />
      <SingleWeatherDetail
        icon={<FiDroplet />}
        information="Humidity"
        value={humidity}
      />
      <SingleWeatherDetail
        icon={<MdAir />}
        information="Wind speed"
        value={windSpeed}
      />
      <SingleWeatherDetail
        icon={<ImMeter />}
        information="Air Pressure"
        value={airPressure}
      />
      <SingleWeatherDetail
        icon={<LuSunrise />}
        information="Sunrise"
        value={sunrise}
      />
      <SingleWeatherDetail
        icon={<LuSunset />}
        information="Sunset"
        value={sunset}
      />
    </>
  );
}
