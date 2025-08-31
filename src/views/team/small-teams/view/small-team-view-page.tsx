// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Types

// ** Demo Components Imports
import SmallTeamViewLeft from "./small-team-view-left";
import SmallTeamViewRight from "./small-team-view-right";
import SmallTeam from "src/types/team/small-team";
import Page from "src/views/components/page/page";

type Props = {
  tab: string;
  smallTeam: SmallTeam;
  isLoading: boolean;
};

const SmallTeamViewPage = ({ tab, smallTeam, isLoading }: Props) => {
  return (
    <Page title={`${smallTeam?.name} | smallTeam`}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12} lg={12}>
          <SmallTeamViewLeft smallTeam={smallTeam} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <SmallTeamViewRight
            isLoading={isLoading}
            tab={tab}
            smallTeam={smallTeam}
          />
        </Grid>
      </Grid>
    </Page>
  );
};

export default SmallTeamViewPage;
