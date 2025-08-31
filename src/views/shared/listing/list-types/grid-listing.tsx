import { Box, Grid } from "@mui/material";
import { gridSpacing } from "src/configs/app-constants";

const GridListing = <T extends {}>({
  items,
  ItemViewComponent,
}: {
  items: T[];
  ItemViewComponent: React.ComponentType<{ data: T }>;
}) => {
  return (
    <Box sx={{ m: 3 }}>
      <Grid container direction="row" spacing={gridSpacing}>
        {items?.map((item, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            lg={4}
            xl={3}
            alignItems="stretch"
          >
            <ItemViewComponent data={item}></ItemViewComponent>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GridListing;
