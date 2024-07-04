"use client"; // Додаємо цю директиву на початку файлу

import React from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Grid,
  Stack,
} from "@mui/material";
import { useWeather } from "@/Context/WeatherContext";
import WeatherIcon from "@/components/Weather/WeatherIcon/WeatherIcon";
import ForecastWeatherDetail from "@/components/Weather/ForecastWeatherDetail/ForecastWeatherDetail";
import WeatherDetails from "@/components/Weather/WeatherDetail/WeatherDetails";
import Navbar from "@/components/Weather/Navbar/Navbar";
import WeatherSkeleton from "@/ui/Weather/Sceleton/WeatherSkeleton";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { format, parseISO } from "date-fns";
import { convertWindSpeed } from "@/utils/convertWindSpeed";

export default function Home() {
  const { data, isLoading, error, place, refetch } = useWeather();

  const firstData = data?.list[0];

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  if (isLoading)
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={4}
      bgcolor="grey.100"
      minHeight="100vh"
    >
      <Navbar location={data?.city.name} />
      <Container maxWidth="lg" sx={{ pt: 4, pb: 10, flex: 1 }}>
        {isLoading ? (
          <WeatherSkeleton />
        ) : (
          <>
            <Box mb={4} className="max-[591px]:text-center">
              <Typography variant="h4" gutterBottom>
                {format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}
                <Typography variant="subtitle1" component="span" ml={1}>
                  ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})
                </Typography>
              </Typography>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <Typography variant="h1" component="div">
                    {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
                  </Typography>
                  <Typography variant="body2">
                    Feels like{" "}
                    {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                  </Typography>
                  <Typography variant="body2">
                    {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓{" "}
                    {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Stack
                    direction="row"
                    spacing={2}
                    overflow="auto"
                    bgcolor={"white"}
                    borderRadius={8}
                  >
                    {data?.list.map((d, i) => (
                      <Box key={i} textAlign="center" p={1}>
                        <Typography variant="body2">
                          {format(parseISO(d.dt_txt), "h:mm a")}
                        </Typography>
                        <WeatherIcon
                          iconName={getDayOrNightIcon(
                            d.weather[0].icon,
                            d.dt_txt
                          )}
                        />
                        <Typography variant="body2">
                          {convertKelvinToCelsius(d?.main.temp ?? 0)}°
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box
              display="flex"
              gap={4}
              flexDirection="row"
              bgcolor={"white"}
              padding={2}
              borderRadius={8}
            >
              <Box
                flex={1}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
                maxWidth={150}
              >
                <Typography variant="body1" textTransform="capitalize">
                  {firstData?.weather[0].description}
                </Typography>
                <WeatherIcon
                  iconName={getDayOrNightIcon(
                    firstData?.weather[0].icon ?? "",
                    firstData?.dt_txt ?? ""
                  )}
                />
              </Box>
              <Box
                flex={2}
                p={2}
                gap={2}
                display={"flex"}
                justifyContent={"space-between"}
                overflow="auto"
              >
                <WeatherDetails
                  visability={metersToKilometers(
                    firstData?.visibility ?? 10000
                  )}
                  humidity={`${firstData?.main.humidity}%`}
                  windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
                  airPressure={`${firstData?.main.pressure} hPa`}
                  sunrise={format(data?.city.sunrise ?? 1702949452, "H:mm")}
                  sunset={format(data?.city.sunset ?? 1702517657, "H:mm")}
                />
              </Box>
            </Box>
            <Box mt={4}>
              <Typography variant="h4">Forecast (7 days)</Typography>
              {firstDataForEachDate.map((d, i) => (
                <ForecastWeatherDetail key={i} date={d?.dt_txt} />
              ))}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
