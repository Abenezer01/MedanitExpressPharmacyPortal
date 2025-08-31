import { Card, CardContent, Grid, Typography } from "@mui/material";

const ChildrenStastics = () => {
  return (
    <Grid container spacing={3} marginY={3}>
    <Grid item xs={12} sm={6} md={4}>
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    Total Children
                </Typography>
                <Typography variant="body2">
                    100
                </Typography>
            </CardContent>
        </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    Average Age
                </Typography>
                <Typography variant="body2">
                    8 years
                </Typography>
            </CardContent>
        </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
    <Card>
    <CardContent>
        <Typography variant="h5" component="div">
        Gender Distribution
        </Typography>
        <Typography variant="body2">
        50% Boys, 50% Girls
        </Typography>
    </CardContent>
    </Card>
    </Grid>
</Grid>
  );
};
export default ChildrenStastics;