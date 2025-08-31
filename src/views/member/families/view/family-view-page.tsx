// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Types

// ** Demo Components Imports
import FamilyViewRight from "./family-view-right";
import FamilyViewLeft from "./family-view-left";
import Family from "src/types/member/family";

type Props = {
  tab: string;
  family: Family;
  isLoading: boolean;
};

const FamilyViewPage = ({ tab, family, isLoading }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <FamilyViewLeft family={family} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <FamilyViewRight isLoading={isLoading} tab={tab} family={family} />
      </Grid>
    </Grid>
  );
};

export default FamilyViewPage;
