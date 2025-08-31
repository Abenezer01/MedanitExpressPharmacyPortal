// ** MUI Imports
import Grid from "@mui/material/Grid";
import Session from "src/types/school/session";

// ** Types

// ** Demo Components Imports
import SessionViewLeft from "src/views/school/sessions/view/session-view-left";
import SessionViewRight from "./session-view-right";

type Props = {
  tab: string;
  session: Session;
  isLoading: boolean;
  onEdit: (session: Session) => void,
  onDelete: (id: string) => void,
};

const SessionViewPage = ({ tab, session, isLoading,onEdit,onDelete }: Props) => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <SessionViewLeft onDelete={onDelete} onEdit={onEdit} session={session} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <SessionViewRight isLoading={isLoading} tab={tab} session={session} />
      </Grid>
    </Grid>
  );
};

export default SessionViewPage;
