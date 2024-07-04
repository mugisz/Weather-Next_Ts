import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import WeatherDetails from "../WeatherDetail/WeatherDetails";
import { useWeather } from "@/Context/WeatherContext";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { format, parseISO } from "date-fns";

interface ForecastWeatherDetailProps {
  date: string | undefined;
}

export default function ForecastWeatherDetail({
  date,
}: ForecastWeatherDetailProps) {
  const { data } = useWeather();
  const forecast = data?.list.find((entry) => entry.dt_txt === date);

  if (!forecast) return null;

  return (
    <Box
      className="gap-4"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      padding={2}
      borderRadius={8}
      gap={1}
      mb={3}
      mt={3}
      boxShadow={
        " rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;"
      }
    >
      {/* left */}
      <Grid
        container
        spacing={1}
        justifyContent={"center"}
        alignItems={"center"}
        maxWidth={800}
        gap={3}
        boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"}
        borderRadius={8}
      >
        <Grid item xs={12} sm={6} md={2}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent={"space-between"}
            height={110}
          >
            <WeatherIcon iconName={forecast.weather[0].icon} />
            <Typography variant="body2">
              {format(parseISO(forecast.dt_txt), "dd.MM")}
            </Typography>
            <Typography variant="body1">
              {format(parseISO(forecast.dt_txt), "EEEE")}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"space-between"}
            height={110}
          >
            <Typography variant="h3">
              {convertKelvinToCelsius(forecast.main.temp)}°
            </Typography>
            <Typography variant="body2" gutterBottom>
              Feels like {convertKelvinToCelsius(forecast.main.feels_like)}°
            </Typography>
            <Typography variant="body1" className="capitalize">
              {forecast.weather[0].description}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* right */}
      <Box
        overflow="auto"
        width={"90%"}
        gap={3}
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"row"}
        boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"}
        borderRadius={8}
        padding={2}
      >
        <WeatherDetails
          visability={forecast.visibility}
          airPressure={`${forecast.main.pressure} hPa`}
          humidity={`${forecast.main.humidity}%`}
          sunrise={format(data?.city.sunrise ?? 1702949452, "H:mm")}
          sunset={format(data?.city.sunset ?? 1702517657, "H:mm")}
          windSpeed={forecast.wind.speed}
        />
      </Box>
    </Box>
  );
}
