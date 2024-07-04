import { Box, Typography } from "@mui/material";

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string | number;
}

function SingleWeatherDetail({
  information,
  icon,
  value,
}: SingleWeatherDetailProps) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      gap={"8"}
      fontWeight={600}
      fontSize={12}
      alignItems={"center"}
      color={"rgb(0 0 0 / 0.8);"}
    >
      <Typography className="whitespace-nowrap">{information}</Typography>
      <Box className="text-3xl">{icon}</Box>
      <Typography>{value}</Typography>
    </Box>
  );
}
export default SingleWeatherDetail;
