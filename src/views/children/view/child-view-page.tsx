// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Types

// ** Demo Components Imports
import ChildViewRight from "./child-view-right";
import ChildViewLeft from "./child-view-left";
import Child from "src/types/child/child";

type Props = {
  tab: string;
  child: Child;
  isLoading: boolean;
};

const ChildViewPage = ({ tab, child, isLoading }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <ChildViewLeft child={child} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <ChildViewRight isLoading={isLoading} tab={tab} child={child as Child} />
      </Grid>
    </Grid>
  );
};

export default ChildViewPage;
