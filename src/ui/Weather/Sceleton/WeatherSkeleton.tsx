import { Box, Grid, Skeleton } from "@mui/material";

function WeatherSkeleton() {
  return (
    <Box mb={8}>
      <Box mb={4}>
        <Skeleton variant="text" width={100} height={30} />
        <Skeleton variant="text" width={150} height={30} />
        <Grid container spacing={4} mt={2}>
          {Array.from(new Array(4)).map((_, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Skeleton variant="text" width={60} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" width={60} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box>
        <Skeleton variant="text" width={200} height={30} />
        {Array.from(new Array(7)).map((_, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={6} sm={3}>
              <Skeleton variant="text" width={100} />
            </Grid>
            <Grid item xs={6} sm={1}>
              <Skeleton variant="circular" width={40} height={40} />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Skeleton variant="text" width={100} />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Skeleton variant="text" width={100} />
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
export default WeatherSkeleton;
